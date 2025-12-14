export interface Concept {
  name: string;
  description: string;
  codeSnippet?: string;
}

export interface Section {
  title: string;
  items: string[];
  concepts?: Concept[];
}

export interface Topic {
  id: string;
  title: string;
  icon: string;
  color: string;
  mustKnow: Section[];
  questions: string[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export enum AppMode {
  STUDY = 'STUDY',
  INTERVIEW = 'INTERVIEW'
}