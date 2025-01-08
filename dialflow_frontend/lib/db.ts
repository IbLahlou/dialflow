import { ref, set, get, push, update, remove } from 'firebase/database';
import { database } from './firebase';

export interface VoiceAgent {
  id: string;
  name: string;
  status: string;
  language: string;
  additionalLanguages: string[];
  firstMessage: string;
  systemPrompt: string;
  voiceProvider: 'elevenlabs' | 'openai';
  elevenLabsVoiceId: string;
  openAIVoiceId: string;
  useOpenAIForSTT: boolean;
  enableTranscripts: boolean;
  maxCallDuration: number;
  endCallKeyword: string;
}

export const saveVoiceAgent = async (userId: string, agentData: Omit<VoiceAgent, 'id'>) => {
  const newAgentRef = push(ref(database, `users/${userId}/voiceAgents`));
  await set(newAgentRef, {
    ...agentData,
    id: newAgentRef.key,
  });
  return newAgentRef.key;
};

export const getVoiceAgent = async (userId: string, agentId: string) => {
  const snapshot = await get(ref(database, `users/${userId}/voiceAgents/${agentId}`));
  return snapshot.val();
};

export const getVoiceAgents = async (userId: string) => {
  const snapshot = await get(ref(database, `users/${userId}/voiceAgents`));
  const agents = snapshot.val();
  if (!agents) return [];
  return Object.entries(agents).map(([id, data]) => ({
    id,
    ...(data as object),
  }));
};

export const updateVoiceAgent = async (userId: string, agentId: string, agentData: Partial<VoiceAgent>) => {
  await update(ref(database, `users/${userId}/voiceAgents/${agentId}`), agentData);
};

export const deleteVoiceAgent = async (userId: string, agentId: string) => {
  await remove(ref(database, `users/${userId}/voiceAgents/${agentId}`));
};

export interface PhoneNumber {
  id: string;
  number: string;
  twilioSid: string;
  elevenLabsVoiceId: string;
  language: string;
  assignedAgent: string;
}

export const addPhoneNumber = async (userId: string, phoneNumberData: Omit<PhoneNumber, 'id'>) => {
  const newPhoneNumberRef = push(ref(database, `users/${userId}/phoneNumbers`));
  await set(newPhoneNumberRef, {
    ...phoneNumberData,
    id: newPhoneNumberRef.key,
  });
  return newPhoneNumberRef.key;
};

export const getPhoneNumbers = async (userId: string) => {
  const snapshot = await get(ref(database, `users/${userId}/phoneNumbers`));
  const phoneNumbers = snapshot.val();
  if (!phoneNumbers) return [];
  return Object.entries(phoneNumbers).map(([id, data]) => ({
    id,
    ...(data as object),
  }));
};

export const updatePhoneNumber = async (userId: string, phoneNumberId: string, phoneNumberData: Partial<PhoneNumber>) => {
  await update(ref(database, `users/${userId}/phoneNumbers/${phoneNumberId}`), phoneNumberData);
};

export const deletePhoneNumber = async (userId: string, phoneNumberId: string) => {
  await remove(ref(database, `users/${userId}/phoneNumbers/${phoneNumberId}`));
};

export interface Campaign {
  id: string;
  name: string;
  agentId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  successRate: number;
  created: string;
  contacts: {
    total: number;
    completed: number;
    successful: number;
  };
}

export const createCampaign = async (userId: string, campaignData: Omit<Campaign, 'id'>) => {
  const newCampaignRef = push(ref(database, `users/${userId}/campaigns`));
  await set(newCampaignRef, {
    ...campaignData,
    id: newCampaignRef.key,
  });
  return newCampaignRef.key;
};

export const getCampaigns = async (userId: string) => {
  const snapshot = await get(ref(database, `users/${userId}/campaigns`));
  const campaigns = snapshot.val();
  if (!campaigns) return [];
  return Object.entries(campaigns).map(([id, data]) => ({
    id,
    ...(data as object),
  }));
};

export const updateCampaign = async (userId: string, campaignId: string, campaignData: Partial<Campaign>) => {
  await update(ref(database, `users/${userId}/campaigns/${campaignId}`), campaignData);
};

export const deleteCampaign = async (userId: string, campaignId: string) => {
  await remove(ref(database, `users/${userId}/campaigns/${campaignId}`));
};

export const saveUserData = async (userId: string, userData: any) => {
  await set(ref(database, `users/${userId}/profile`), userData);
};

export const getCallLogs = async (userId: string) => {
  const snapshot = await get(ref(database, `users/${userId}/callLogs`));
  const logs = snapshot.val();
  if (!logs) return [];
  return Object.entries(logs).map(([id, data]) => ({
    id,
    ...(data as object),
  }));
};

