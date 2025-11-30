export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  href: string;
  color: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "archived";
  createdAt: Date;
  updatedAt: Date;
}
