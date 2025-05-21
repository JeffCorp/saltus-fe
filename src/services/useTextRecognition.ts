import { useEffect, useState } from "react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

type SpeechRecognition = any;

interface UseTextRecognitionProps {
  onTranscriptChange?: (transcript: string) => void;
  language?: string;
}

export const useTextRecognition = ({
  onTranscriptChange,
  language = "en-US",
}: UseTextRecognitionProps = {}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const createRecognition = () => {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = language;

          let transcript = "";

          recognition.onresult = (event: any) => {
            const result = event.results[event.results.length - 1];

            if (result.isFinal) {
              transcript = result[0].transcript;
              transcript = formatTranscript(transcript);
              onTranscriptChange?.(transcript);
            }
          };

          recognition.onerror = (event: any) => {
            console.error("Speech recognition error:", event.error);
            setIsRecording(false);
          };

          recognition.onend = () => {
            setIsRecording(false);
          };

          return recognition;
        };

        // setRecognition(() => createRecognition());
      }
    }
  }, [language, onTranscriptChange]);

  const formatTranscript = (text: string): string => {
    return text
      .replace(/\s+/g, " ")
      .replace(/\s+\./g, ".")
      .replace(/\s+,/g, ",")
      .replace(/,+/g, ",")
      .replace(/\.+/g, ".")
      .replace(/\s+([,.!?])/g, "$1")
      .trim()
      .replace(/(^\w|\.\s+\w)/g, (letter) => letter.toUpperCase());
  };

  const startRecording = () => {
    if (recognition) {
      recognition.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
  };
};
