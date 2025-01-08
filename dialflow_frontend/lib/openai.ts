import OpenAI from 'openai';

export interface OpenAIVoice {
  voice_id: string;
  name: string;
}

export const openAIVoices: OpenAIVoice[] = [
  { voice_id: 'alloy', name: 'Alloy' },
  { voice_id: 'echo', name: 'Echo' },
  { voice_id: 'fable', name: 'Fable' },
  { voice_id: 'onyx', name: 'Onyx' },
  { voice_id: 'nova', name: 'Nova' },
  { voice_id: 'shimmer', name: 'Shimmer' },
];

// Remove the OpenAI instance creation from here

