import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Loader } from 'lucide-react';  // 添加 Loader 图标

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  onStop?: (text: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript, onStop }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognition = useRef<any>(null);
  const lastTranscript = useRef<string>('');

  const initializeRecognition = () => {
    // 重新初始化语音识别实例
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognition.current = new SpeechRecognition();
    recognition.current.continuous = true;
    recognition.current.interimResults = true;
    recognition.current.lang = 'en-US';
    
    recognition.current.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      
      console.log('Transcript:', transcript);
      onTranscript(transcript);
      lastTranscript.current = transcript;
    };
  
    recognition.current.onend = () => {
      if (!isRecording) {
        setIsProcessing(true);
        onStop?.(lastTranscript.current);
        setTimeout(() => {
          
          setIsProcessing(false);
        }, 50);
      }
    };
  };

  const startRecording = async () => {
    try {
      initializeRecognition(); // 每次开始录音时重新初始化
      lastTranscript.current = '';
      recognition.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recognition:', error);
      setIsProcessing(false);
    }
  };

  const stopRecording = () => {
    if (recognition.current && isRecording) {
      setIsRecording(false);
      recognition.current.stop();
      recognition.current = null; // 清除当前实例
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
      <button 
        type="button"
        onClick={handleToggleRecording}
        className={`nes-btn ${isProcessing ? 'is-warning' : 'is-success'}`}
        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
        disabled={isProcessing}  // 处理时禁用按钮
      >
        {isProcessing ? (
          <Loader className="w-4 h-4 inline-block animate-spin" />
        ) : isRecording ? (
          <Square className="w-4 h-4 inline-block" />
        ) : (
          <Mic className="w-4 h-4 inline-block" />
        )}
      </button>
    );
};

export default VoiceInput;
