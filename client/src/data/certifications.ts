export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  faIcon: string;
  color: string;
  skills: string[];
}

export const certifications: Certification[] = [
  {
    id: 'aws-saa',
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    date: 'Feb 2025',
    faIcon: 'fab fa-aws',
    color: '#FF9900',
    skills: ['EC2', 'S3', 'VPC', 'Lambda', 'RDS', 'CloudFormation', 'IAM', 'CloudFront', 'Route 53', 'ELB'],
  },
];
