export interface Note {
  id: string;
  filename: string;
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  preview: string;
  content: string[];
}

export const notes: Note[] = [
  {
    id: 'rag-systems',
    filename: 'building_rag_systems.md',
    title: 'Building a RAG System from Scratch',
    date: '2025-03-12',
    readTime: '4 min',
    tags: ['AI', 'Python', 'LLM', 'VectorDB'],
    preview: 'What I learned building retrieval-augmented generation pipelines for production use cases.',
    content: [
      'RAG (Retrieval-Augmented Generation) sounds simple on paper — chunk your docs, embed them, retrieve relevant chunks, inject into a prompt. In practice, the devil is in every step of that pipeline.',
      'The biggest lesson: chunking strategy matters more than most people admit. Splitting by character count breaks context boundaries and tanks retrieval quality. Semantic chunking with overlap preserves meaning across boundaries.',
      'For embeddings, I experimented with text-embedding-ada-002 vs open-source models like bge-small-en. For domain-specific content, fine-tuned open-source models beat OpenAI on both cost and accuracy.',
      'One underrated trick: hybrid search. Pure vector search misses exact keyword matches (model names, version numbers, IDs). Combining BM25 with vector similarity using reciprocal rank fusion gets you the best of both worlds.',
      'The hardest part is eval. Without a ground-truth dataset, you are flying blind. I ended up building a small synthetic QA set from the source docs to measure retrieval recall and answer faithfulness separately.',
    ],
  },
  {
    id: 'aws-saa-notes',
    filename: 'aws_solutions_architect_notes.md',
    title: 'AWS Solutions Architect: What Actually Sticks',
    date: '2025-02-20',
    readTime: '3 min',
    tags: ['AWS', 'Cloud', 'Architecture', 'Certification'],
    preview: 'The mental models and patterns that helped me pass the SAA-C03 exam and actually understand cloud architecture.',
    content: [
      'Passing the AWS SAA-C03 is less about memorising services and more about recognising architectural patterns. Every question is essentially: "given these constraints, which AWS-native solution fits?"',
      'The three mental models that helped most: (1) Decouple everything — if two services communicate directly, there is an SQS queue waiting to be added. (2) Stateless compute, stateful storage — put state in S3/RDS/DynamoDB, not in EC2. (3) Security is layered — IAM roles, security groups, NACLs, and KMS are each a different layer.',
      'VPC networking tripped me up the most. The key insight: security groups are stateful (return traffic is automatic), NACLs are stateless (you need inbound AND outbound rules). That single distinction resolves most networking questions.',
      'For cost optimisation questions: Reserved Instances for predictable workloads, Spot for fault-tolerant batch jobs, Savings Plans for flexible compute. If the question mentions "lowest cost", the answer usually involves S3 Intelligent-Tiering or Spot.',
      'Study tip: do 20 practice questions per day for two weeks, but review every wrong answer in depth rather than just checking the answer key. The explanations teach you more than the questions.',
    ],
  },
  {
    id: 'typescript-patterns',
    filename: 'typescript_patterns_i_keep_using.md',
    title: 'TypeScript Patterns I Keep Reaching For',
    date: '2025-01-08',
    readTime: '3 min',
    tags: ['TypeScript', 'React', 'Patterns', 'DX'],
    preview: 'A few TypeScript idioms that have made my codebases cleaner and my PRs quieter.',
    content: [
      'After a few years of writing TypeScript, certain patterns have become muscle memory because they genuinely reduce bugs and make code easier to change.',
      'Discriminated unions over boolean flags. Instead of `{ isLoading: boolean; isError: boolean; data?: T }`, use `{ status: "loading" } | { status: "error"; error: Error } | { status: "success"; data: T }`. The exhaustive switch check alone saves hours of debugging impossible states.',
      'Branded types for IDs. `type UserId = string & { _brand: "UserId" }` prevents accidentally passing a `ProjectId` where a `UserId` is expected. A tiny helper function creates them. Zero runtime cost, huge correctness gain.',
      'Satisfies over `as` for config objects. `const config = { ... } satisfies Config` validates the shape at declaration site without widening the type, so you keep literal types for autocomplete. I replaced most `as` casts in my codebase with this.',
      'Template literal types for string APIs. Defining `type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"` and `type ApiRoute = \`/api/\${string}\`` means typos in route handlers become compile errors rather than 404s in prod.',
    ],
  },
];
