// SpeechToText.tsx (Child Component)
import React, { useEffect, useState } from "react";
import { BsFillStopFill } from "react-icons/bs";
import { FaMicrophoneAlt } from "react-icons/fa";
import Styles from "../../styles/Landingpagemodules/Hero.module.css";

interface SpeechToTextProps {
  setInputValue: (value: string) => void;
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
}

const SpeechToText: React.FC<SpeechToTextProps> = ({
  setInputValue,
  isRecording,
  setIsRecording,
}) => {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    let recognitionInstance: SpeechRecognition | null = null;

    if ("SpeechRecognition" in window) {
      recognitionInstance = new SpeechRecognition();
    } else if ("webkitSpeechRecognition" in window) {
      recognitionInstance = new webkitSpeechRecognition();
    }

    if (recognitionInstance) {
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;

      recognitionInstance.onstart = () => {
        setIsRecording(true);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      recognitionInstance.onresult = (event) => {
        const result = event.results[event.results.length - 1];
        if (result.isFinal) {
          const transcript = result[0].transcript;
          setInputValue(transcript);
        }
      };

      setRecognition(recognitionInstance);
    }

    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
  }, [setInputValue, setIsRecording]);

  const toggleRecording = () => {
    if (recognition) {
      if (!isRecording) {
        recognition.start();
      } else {
        recognition.stop();
      }
    }
  };

  return (
    <div>
      <button className={Styles.VoiceSearchIconBg} onClick={toggleRecording}>
        {isRecording ? (
          <span className="button-glow">
            <BsFillStopFill id="newcolor_icon" size={16.48} />{" "}
          </span>
        ) : (
          <>
          <div className={Styles.Iconhide}>
          <img className="img-fluid" src="/imagess/mic4.png" />
          </div>
          <div className="navigation_mobile">
          <img className="img-fluid" src="/imagess/wmic.png" />
          </div>
          </>
        )}
      </button>
    </div>
  );
};

export default SpeechToText;
