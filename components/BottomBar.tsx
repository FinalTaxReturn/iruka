'use client';

import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { Button } from './ui/button';
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVolumeUp,
  FaVolumeMute,
} from 'react-icons/fa';
import { useState, useEffect } from 'react';

const BottomMenuBar = () => {
  const [mic, setMic] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext>();
  const [oscillator, setOscillator] = useState<OscillatorNode>();

  const [capture, setCapture] = useState(false);

  // マイクの音声データを処理する関数
  const analyzeAudio = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 2048;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const checkFrequencies = () => {
          analyser.getByteFrequencyData(dataArray);

          // 分析する周波数範囲を定義
          const frequencies = [19000, 19500, 19999];
          const nyquist = audioContext.sampleRate / 2;
          const threshold = 30; // 適切な閾値に設定

          frequencies.forEach((frequency) => {
            const index = Math.round((frequency / nyquist) * bufferLength);
            if (dataArray[index] > threshold) {
              setCapture(true);
              console.log(`周波数: ${frequency}Hz, 強度: ${dataArray[index]}`);
            } else {
              setCapture(false);
            }
          });

          requestAnimationFrame(checkFrequencies);
        };

        checkFrequencies();
      })
      .catch((error) => {
        console.error('マイクのアクセスに失敗しました。', error);
      });
  };

  // マイクの状態が変わった時に呼び出されるuseEffect
  useEffect(() => {
    if (mic) {
      analyzeAudio();
    }
  }, [mic]);

  const initializeAudio = () => {
    const newAudioCtx = new window.AudioContext();
    const newOscillator = newAudioCtx.createOscillator();
    newOscillator.type = 'sine';
    newOscillator.frequency.setValueAtTime(20000, newAudioCtx.currentTime);
    newOscillator.connect(newAudioCtx.destination);

    const gainNode = newAudioCtx.createGain();
    gainNode.gain.setValueAtTime(
      gainNode.gain.maxValue,
      newAudioCtx.currentTime,
    );
    newOscillator.connect(gainNode);
    newOscillator.start();

    setAudioCtx(newAudioCtx);
    setOscillator(newOscillator);
  };

  useEffect(() => {
    return () => {
      oscillator?.stop();
      audioCtx?.close();
    };
  }, [audioCtx, oscillator]);

  const toggleSpeaker = () => {
    if (!speaker) {
      console.log('Creating and starting a new oscillator');
      initializeAudio();
    } else {
      console.log('Stopping oscillator');
      oscillator?.stop();
      oscillator?.disconnect();
      audioCtx?.close();
    }
    setSpeaker(!speaker);
  };

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-white shadow-top p-3'>
      <div className='flex justify-between items-center px-4 py-2'>
        <ToggleGroup variant='outline' type='multiple'>
          <ToggleGroupItem
            value='bold'
            aria-label='Toggle Mic'
            onClick={() => {
              setMic(!mic);
            }}
          >
            {mic ? <FaMicrophone /> : <FaMicrophoneSlash />}
          </ToggleGroupItem>
          <ToggleGroupItem
            value='italic'
            aria-label='Toggle Speaker'
            onClick={toggleSpeaker}
          >
            {speaker ? <FaVolumeUp /> : <FaVolumeMute />}
          </ToggleGroupItem>
        </ToggleGroup>
        {capture && (
          <div className='flex items-center'>
            <div className='w-2 h-2 bg-red-500 rounded-full mr-2'></div>
            <span className='text-xs'>Capturing</span>
          </div>
        )}
        <Button variant='destructive'>
          <span className='text-xs'>Leave Room</span>
        </Button>
      </div>
    </div>
  );
};
export default BottomMenuBar;
