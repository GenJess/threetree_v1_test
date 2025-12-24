
export type AppView = 'INDEX' | 'WORKS' | 'AI_CHAT' | 'LAB' | 'ANALYTICS';

export interface Specimen {
  id: string;
  title: string;
  type: string;
  image: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ArchitecturalStats {
  sustainability: number;
  efficiency: number;
  aesthetics: number;
  innovation: number;
}
