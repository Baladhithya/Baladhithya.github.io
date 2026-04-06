import { users, type User, type InsertUser } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  uploadResume(filename: string, data: Buffer): Promise<void>;
  getLatestResume(): Promise<{filename: string, data: Buffer} | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private resume: { filename: string; data: Buffer } | undefined;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async uploadResume(filename: string, data: Buffer): Promise<void> {
    this.resume = { filename, data };
  }

  async getLatestResume(): Promise<{ filename: string; data: Buffer } | undefined> {
    return this.resume;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
