"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook for text-to-speech functionality
 * @returns {Object} TTS functions and state
 */
const useTTS = () => {
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentUtterance, setCurrentUtterance] =
    useState<SpeechSynthesisUtterance | null>(null);

  // Initialize the speech synthesis on component mount
  useEffect(() => {
    // Check if we're in the browser and if speech synthesis is available
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSynth(window.speechSynthesis);

      // Get available voices
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };

      // Chrome loads voices asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }

      // Initial attempt to load voices (for Firefox/Safari)
      loadVoices();
    }

    // Clean up
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  /**
   * Speak the provided text
   * @param {string} text - The text to speak
   * @param {Object} options - Optional settings
   * @param {string} options.voice - Name of the voice to use
   * @param {number} options.rate - Speech rate (0.1 to 10)
   * @param {number} options.pitch - Speech pitch (0 to 2)
   * @param {number} options.volume - Speech volume (0 to 1)
   */
  const speak = (
    text: string,
    options?: {
      voice?: string;
      rate?: number;
      pitch?: number;
      volume?: number;
    }
  ) => {
    if (!synth) return;

    // Cancel any ongoing speech
    stop();

    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text);

    // Set voice if specified and available
    if (options?.voice) {
      const selectedVoice = voices.find((v) => v.name === options.voice);
      if (selectedVoice) utterance.voice = selectedVoice;
    }

    // Set other options if provided
    if (options?.rate !== undefined) utterance.rate = options.rate;
    if (options?.pitch !== undefined) utterance.pitch = options.pitch;
    if (options?.volume !== undefined) utterance.volume = options.volume;

    // Set event handlers
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentUtterance(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentUtterance(null);
    };

    // Save the utterance to state
    setCurrentUtterance(utterance);

    // Speak
    synth.speak(utterance);
  };

  /**
   * Stop the current speech
   */
  const stop = () => {
    if (!synth) return;

    synth.cancel();
    setIsSpeaking(false);
    setCurrentUtterance(null);
  };

  /**
   * Pause the current speech
   */
  const pause = () => {
    if (!synth) return;

    synth.pause();
    setIsSpeaking(false);
  };

  /**
   * Resume paused speech
   */
  const resume = () => {
    if (!synth) return;

    synth.resume();
    setIsSpeaking(true);
  };

  return {
    speak,
    stop,
    pause,
    resume,
    voices,
    isSpeaking,
    isSupported: !!synth,
  };
};

export default useTTS;
