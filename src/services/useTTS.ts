import { useCallback, useEffect, useState } from "react";

export const useTTS = () => {
  const [text, setText] = useState<string>("Hi, how are you?");
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isResumed, setIsResumed] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback((text: string) => {
    try {
      const msg = new SpeechSynthesisUtterance(text);
      // Change voice
      msg.voice = window.speechSynthesis.getVoices()[160];

      window.speechSynthesis.speak(msg);

      setIsSpeaking(true);
      setIsPaused(false);

      msg.onend = () => {
        setIsSpeaking(false);
      };

      msg.onerror = (event) => {
        console.error("TTS Error:", event);
        setIsSpeaking(false);
      };
    } catch (error) {
      console.error("Failed to initialize TTS:", error);
    }
  }, []);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsSpeaking(false);
  }, []);

  const resume = useCallback(() => {
    window.speechSynthesis.resume();
    setIsPaused(false);
    setIsSpeaking(true);
  }, []);

  const cancel = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPaused(false);
    setIsSpeaking(false);
  }, []);

  return {
    text,
    setText,
    isSpeaking,
    isPaused,
    isResumed,
    isEnded,
    speak,
    pause,
    resume,
    cancel,
  };
};
