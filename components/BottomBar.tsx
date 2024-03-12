"use client";

import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Button } from "./ui/button";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { useState, useEffect } from "react";

const BottomMenuBar = () => {
  const [mic, setMic] = useState(true);
  const [speaker, setSpeaker] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext>();
  const [oscillator, setOscillator] = useState<OscillatorNode>();

  const initializeAudio = () => {
    const newAudioCtx = new (window.AudioContext)();
    const newOscillator = newAudioCtx.createOscillator();
    newOscillator.type = "sine";
    newOscillator.frequency.setValueAtTime(20000, newAudioCtx.currentTime);
    newOscillator.connect(newAudioCtx.destination);
    newOscillator.start();

    setAudioCtx(newAudioCtx);
    setOscillator(newOscillator);
  };

  useEffect(() => {
    initializeAudio();
    return () => {
      oscillator?.stop();
      audioCtx?.close();
    };
  }, []);

  const toggleSpeaker = () => {
    if (!speaker) {
      console.log("Creating and starting a new oscillator");
      initializeAudio();
    } else {
      console.log("Stopping oscillator");
      oscillator?.stop();
      oscillator?.disconnect();
      audioCtx?.close();
    }
    setSpeaker(!speaker);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-top p-3">
      <div className="flex justify-between items-center px-4 py-2">
        <ToggleGroup variant="outline" type="multiple">
          <ToggleGroupItem
            value="bold"
            aria-label="Toggle Mic"
            onClick={() => {
              setMic(!mic);
            }}
          >
            {mic ? <FaMicrophone /> : <FaMicrophoneSlash />}
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            aria-label="Toggle Speaker"
            onClick={toggleSpeaker}
          >
            {speaker ? <FaVolumeUp /> : <FaVolumeMute />}
          </ToggleGroupItem>
        </ToggleGroup>
        <Button variant="destructive">
          <span className="text-xs">Leave Room</span>
        </Button>
      </div>
    </div>
  );
};
export default BottomMenuBar;
