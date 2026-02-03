import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

interface TTSSettings {
  enabled: boolean;
  rate: number; // 0.5 - 2
  pitch: number; // 0 - 2
  volume: number; // 0 - 1
  voice: SpeechSynthesisVoice | null;
}

interface TTSContextType {
  settings: TTSSettings;
  isSupported: boolean;
  isSpeaking: boolean;
  availableVoices: SpeechSynthesisVoice[];
  speak: (text: string) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  updateSettings: (settings: Partial<TTSSettings>) => void;
}

const defaultSettings: TTSSettings = {
  enabled: true,
  rate: 0.9,
  pitch: 1,
  volume: 1,
  voice: null,
};

const TTSContext = createContext<TTSContextType | undefined>(undefined);

export const TTSProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<TTSSettings>(() => {
    const saved = localStorage.getItem('tts-settings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Load available voices
  useEffect(() => {
    if (!isSupported) return;

    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      // Prefer Turkish voices
      const turkishVoices = voices.filter(v => v.lang.startsWith('tr'));
      const otherVoices = voices.filter(v => !v.lang.startsWith('tr'));
      setAvailableVoices([...turkishVoices, ...otherVoices]);

      // Set default Turkish voice if available
      if (!settings.voice && turkishVoices.length > 0) {
        setSettings(prev => ({ ...prev, voice: turkishVoices[0] }));
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, [isSupported]);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('tts-settings', JSON.stringify({
      ...settings,
      voice: null, // Don't save voice object, it's not serializable
    }));
  }, [settings]);

  const speak = useCallback((text: string) => {
    if (!isSupported || !settings.enabled || !text) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;

    // Set voice (prefer Turkish)
    if (settings.voice) {
      utterance.voice = settings.voice;
    } else {
      const turkishVoice = availableVoices.find(v => v.lang.startsWith('tr'));
      if (turkishVoice) {
        utterance.voice = turkishVoice;
      }
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  }, [isSupported, settings, availableVoices]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  const pause = useCallback(() => {
    if (!isSupported) return;
    speechSynthesis.pause();
  }, [isSupported]);

  const resume = useCallback(() => {
    if (!isSupported) return;
    speechSynthesis.resume();
  }, [isSupported]);

  const updateSettings = useCallback((newSettings: Partial<TTSSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  return (
    <TTSContext.Provider
      value={{
        settings,
        isSupported,
        isSpeaking,
        availableVoices,
        speak,
        stop,
        pause,
        resume,
        updateSettings,
      }}
    >
      {children}
    </TTSContext.Provider>
  );
};

export const useTTS = () => {
  const context = useContext(TTSContext);
  if (context === undefined) {
    throw new Error('useTTS must be used within a TTSProvider');
  }
  return context;
};
