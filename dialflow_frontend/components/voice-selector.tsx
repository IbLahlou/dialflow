'use client'

import { useState, useEffect } from 'react'
import { Play, Square } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import type { ElevenLabsVoice } from '@/lib/eleven-labs'
import type { OpenAIVoice } from '@/lib/openai'
import { openAIVoices } from '@/lib/openai'

interface VoiceSelectorProps {
  selectedVoice: string;
  onVoiceSelect: (voiceId: string, provider: 'elevenlabs' | 'openai') => void;
  provider: 'elevenlabs' | 'openai';
  language: string;
}

export function VoiceSelector({ selectedVoice, onVoiceSelect, provider, language }: VoiceSelectorProps) {
  const [voices, setVoices] = useState<ElevenLabsVoice[] | OpenAIVoice[]>([])
  const [filteredVoices, setFilteredVoices] = useState<ElevenLabsVoice[] | OpenAIVoice[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (provider === 'elevenlabs') {
      fetchElevenLabsVoices()
    } else {
      setVoices(openAIVoices)
    }
  }, [provider])

  useEffect(() => {
    if (provider === 'elevenlabs') {
      setFilteredVoices(voices.filter((voice: ElevenLabsVoice) => voice.labels?.language === language))
    } else {
      // OpenAI voices are not language-specific, so we show all
      setFilteredVoices(voices)
    }
  }, [voices, language, provider])

  const fetchElevenLabsVoices = async () => {
    try {
      const response = await fetch('/api/voices');
      const data = await response.json();
      setVoices(data);
    } catch (error) {
      console.error('Error fetching voices:', error);
    }
  }

  const handlePlayPreview = async (voiceId: string) => {
    if (isPlaying && audio) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    let previewUrl: string;
    if (provider === 'elevenlabs') {
      const voice = voices.find(v => v.voice_id === voiceId) as ElevenLabsVoice;
      previewUrl = voice.preview_url;
    } else {
      // For OpenAI, we need to generate the preview on-the-fly
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'synthesize',
          data: {
            text: 'Hello, this is a preview of the selected voice.',
            voice: voiceId
          }
        }),
      });
      const blob = await response.blob();
      previewUrl = URL.createObjectURL(blob);
    }

    const newAudio = new Audio(previewUrl);
    setAudio(newAudio);
    newAudio.play();
    setIsPlaying(true);

    newAudio.onended = () => {
      setIsPlaying(false);
    };
  }

  return (
    <div className="space-y-4">
      <Select value={selectedVoice} onValueChange={(value) => onVoiceSelect(value, provider)}>
        <SelectTrigger>
          <SelectValue placeholder="Select a voice" />
        </SelectTrigger>
        <SelectContent>
          {filteredVoices.map((voice) => (
            <SelectItem key={voice.voice_id} value={voice.voice_id}>
              {voice.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedVoice && (
        <Card>
          <CardContent className="pt-6">
            <Button 
              className="w-full"
              onClick={() => handlePlayPreview(selectedVoice)}
            >
              {isPlaying ? (
                <Square className="mr-2 h-4 w-4" />
              ) : (
                <Play className="mr-2 h-4 w-4" />
              )}
              {isPlaying ? 'Stop Preview' : 'Play Preview'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

