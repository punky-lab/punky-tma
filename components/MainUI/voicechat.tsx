import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Loader } from 'lucide-react';  // 添加 Loader 图标

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  onStop?: () => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript, onStop }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);  // 添加处理状态
  const recognition = useRef<any>(null);
  const lastTranscript = useRef<string>('');

  const startRecording = async () => {
    try {
      if (!recognition.current) {
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
          
          if (event.results[0].isFinal) {
            lastTranscript.current = transcript;
            onTranscript(transcript);
          }
        };

        recognition.current.onend = () => {
          if (!isRecording) {
            setIsProcessing(true);  // 开始处理
            if (lastTranscript.current) {
              onTranscript(lastTranscript.current);
              onStop?.();
            }
            setTimeout(() => {
              setIsProcessing(false);  // 结束处理
            }, 1000);  // 给用户一个视觉反馈的时间
          }
        };
      }

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
      setIsProcessing(true);  // 立即设置处理状态
      recognition.current.stop();
    }
  };

  useEffect(() => {
    if (!isRecording && lastTranscript.current && isProcessing) {
      // 确保在文本设置后再触发发送
      onTranscript(lastTranscript.current);
      setTimeout(() => {
        onStop?.();  // 调用发送函数
        setIsProcessing(false);
      }, 100);  // 给一个小延迟确保文本已经设置
    }
  }, [isRecording, isProcessing, onTranscript, onStop]);

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
