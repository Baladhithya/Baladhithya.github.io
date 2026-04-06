import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from 'fs';
import path from 'path';

export async function registerRoutes(app: Express): Promise<Server> {
  // Upload resume on startup
  app.post('/api/resume/upload', async (req, res) => {
    try {
      const resumePath = path.join(process.cwd(), 'public', 'resume.pdf');
      const fileData = fs.readFileSync(resumePath);
      await storage.uploadResume('resume.pdf', fileData);
      res.json({ message: 'Resume uploaded successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload resume' });
    }
  });

  // Download resume endpoint
  app.get('/api/resume/download', async (req, res) => {
    try {
      const resume = await storage.getLatestResume();
      if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
      }
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${resume.filename}`);
      res.send(Buffer.from(resume.data));
    } catch (error) {
      res.status(500).json({ error: 'Failed to download resume' });
    }
  });
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
