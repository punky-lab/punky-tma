import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import HandIcon from "@/assets/icons/v2/hand.svg";
import MicroIcon from "@/assets/icons/v2/micro.svg";
import GameIcon from "@/assets/icons/v2/game.svg";
import { authApis } from "@/app/normalApi";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import router from "next/router";

interface ActionProps {
  fetchUserData: () => void;
  setIsPetting: (isPetting: boolean) => void;
  petPet: () => void;
  onVoiceMessage?: (text: string) => void;
  handleSend: (text: string) => void;
  setMessage: (message: string) => void;
}

export default function Action({
  fetchUserData,
  setIsPetting,
  petPet,
  onVoiceMessage,
  handleSend,
  setMessage,
}: ActionProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dots, setDots] = useState(".");
  const recognition = useRef<any>(null);
  const lastTranscript = useRef<string>("");

  const initializeRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    recognition.current = new SpeechRecognition();
    recognition.current.continuous = true;
    recognition.current.interimResults = true;
    recognition.current.lang = "en-US";

    recognition.current.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join("");

      console.log("Transcript:", transcript);
      setMessage(transcript);
      lastTranscript.current = transcript;
    };

    recognition.current.onend = () => {
      if (!isRecording) {
        setIsProcessing(true);
        setMessage("");
        if (lastTranscript.current && onVoiceMessage) {
          onVoiceMessage(lastTranscript.current);
        }
        setTimeout(() => {
          setIsProcessing(false);
        }, 50);
      }
    };
  };

  const startRecording = async () => {
    try {
      initializeRecognition();
      lastTranscript.current = "";
      recognition.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recognition:", error);
      setIsProcessing(false);
    }
  };

  const stopRecording = () => {
    if (recognition.current && isRecording) {
      setIsRecording(false);
      if (lastTranscript.current) handleSend(lastTranscript.current);
      recognition.current.stop();
      recognition.current = null;
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // 处理点的动画
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setDots((prev) => {
          if (prev === ".") return "..";
          if (prev === "..") return "...";
          return ".";
        });
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const handlePetTouch = async () => {
    try {
      setIsPetting(true);
      // const response = await authApis.touchPet();
      const response = await petPet();
      console.log("touch pet success", response);
      fetchUserData();
      setIsPetting(false);
      // console.log("touch pet success", response.data);
    } catch (error) {
      console.error("touch pet error", error);
    }
  };

  return (
    <div className="relative h-32 w-full mb-6">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          onClick={handleToggleRecording}
          className={`
            w-12 h-12 
            flex items-center justify-center 
            bg-[url(../assets/icons/button-round.svg)] 
            bg-contain bg-center 
            z-50
            cursor-pointer
          `}
        >
          {isProcessing ? (
            <Loader className="w-8 h-8 text-white animate-spin" />
          ) : isRecording ? (
            <span className="text-white text-xs font-bold">{dots}</span>
          ) : (
            <Image src={MicroIcon} alt="Micro" className="w-10 h-10" />
          )}
        </div>
      </div>

      <div className="absolute left-1/3 top-[60%] -translate-x-1/2">
        <div
          className="w-12 h-12 flex items-center justify-center bg-[url(../assets/icons/button-round.svg)] bg-contain bg-center z-50 cursor-pointer"
          onClick={handlePetTouch}
        >
          <Image src={HandIcon} alt="Hand" className="w-10 h-10" />
        </div>
      </div>

      <div className="absolute left-2/3 top-[60%] -translate-x-1/2">
        <div
          className="w-12 h-12 flex items-center justify-center bg-[url(../assets/icons/button-round.svg)] bg-contain bg-center z-50"
          onClick={() => {
            router.push("https://runner-game.punky.app");
          }}
        >
          <Image src={GameIcon} alt="Game" className="w-10 h-10" />
        </div>
      </div>
    </div>
  );
}
