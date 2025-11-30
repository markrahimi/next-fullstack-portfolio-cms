export interface Certificate {
  _id: string;
  name: { en: string; fr: string };
  issuer: { en: string; fr: string };
  issueDate: string;
  expiryDate?: string;
  credentialID?: string;
  credentialURL?: string;
  description: { en: string; fr: string };
  order: number;
  isActive: boolean;
}
