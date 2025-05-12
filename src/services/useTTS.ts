const useTTS = () => {
  const tts = new SpeechSynthesis();
  const utterance = new SpeechSynthesisUtterance();

  const speak = (text: string) => {
    utterance.text = text;
    tts.speak(utterance);
  };

  return { speak };
};

export default useTTS;
