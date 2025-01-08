export interface ElevenLabsVoice {
  voice_id: string;
  name: string;
  preview_url: string;
  category: string;
}

export async function getElevenLabsVoices(): Promise<ElevenLabsVoice[]> {
  try {
    const response = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY!,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch voices');
    }

    const data = await response.json();
    return data.voices;
  } catch (error) {
    console.error('Error fetching Eleven Labs voices:', error);
    return [];
  }
}

