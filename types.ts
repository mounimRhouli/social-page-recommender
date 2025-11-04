export type Platform = 'Facebook' | 'Instagram' | 'X' | 'LinkedIn' | 'YouTube' | 'Reddit';

export interface Page {
  id: string;
  platform: Platform;
  name: string;
  description: string;
  followers: number;
  link: string;
  avatar: string;
}

export interface GeminiResponse {
  score: number;
  explanation: string;
}

export type Recommendation = Page & GeminiResponse;
