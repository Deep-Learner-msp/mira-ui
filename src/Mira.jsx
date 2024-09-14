import { Button } from 'antd'; // Assuming you're using Ant Design for buttons
import { ArrowLeftIcon } from 'lucide-react'; // Example icon, replace with your icon or use any other
import { useNavigate } from 'react-router-dom';
import { VapiButton, vapi } from "./features/Assistant";
import { useVapi } from "./features/Assistant";
import { useEffect, useRef } from "react";
import { motion } from 'framer-motion'

import {  } from "./features/Assistant";
import { useState } from 'react';

const IntroPage = ({ onContinue }) => ( // Removed type annotation
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 text-white p-4"
  >
    <motion.h1
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="text-5xl font-bold mb-4 text-center"
    >
      I'm MIRA
    </motion.h1>
    <motion.p
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="text-xl mb-8 text-center"
    >
      Your AI companion, ready to listen
    </motion.p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      onClick={onContinue}
      className="px-8 py-3 bg-pink-500 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-pink-400 transition-colors"
    >
      Begin Experience
    </motion.button>
  </motion.div>
)

const VoiceInterface = () => {
  const [isListening, setIsListening] = useState(false)
  const [energy, setEnergy] = useState(0)
  const canvasRef = useRef(null); // Ensure this is using useRef
  const viewportRef = useRef(null); // Ensure this is using useRef;

  const scrollToBottom = () => {
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  };
  const { toggleCall, messages, callStatus, activeTranscript, audioLevel } =
    useVapi();

  useEffect(() => {
    vapi.on("message", scrollToBottom);
    return () => {
      vapi.off("message", scrollToBottom);
    };
  });
  useEffect(() => {
    let audioContext = null;
    let analyser = null;
    let dataArray = null;
    let animationFrameId = null

    const initAudio = async () => {
      audioContext = new (window.AudioContext || window.webkitAudioContext)()
      analyser = audioContext.createAnalyser()
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const source = audioContext.createMediaStreamSource(stream)
      source.connect(analyser)
      analyser.fftSize = 256
      const bufferLength = analyser.frequencyBinCount
      dataArray = new Uint8Array(bufferLength)
    }

    const drawEnergySphere = () => {
      if (!canvasRef.current || !analyser || !dataArray) return
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const width = canvas.width
      const height = canvas.height
      const centerX = width / 2
      const centerY = height / 2

      ctx.clearRect(0, 0, width, height)

      analyser.getByteFrequencyData(dataArray)
      let sum = dataArray.reduce((a, b) => a + b, 0)
      let avg = sum / dataArray.length
      setEnergy(avg)

      // Draw energy sphere
      const radius = 100 + avg / 2
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      gradient.addColorStop(0, `rgba(236, 72, 153, ${avg / 255})`) // pink-500
      gradient.addColorStop(1, 'rgba(88, 28, 135, 0)') // purple-900
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fill()

      // Draw energy waves
      ctx.strokeStyle = 'rgba(219, 39, 119, 0.5)' // pink-600
      ctx.lineWidth = 2
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        for (let j = 0; j < width; j++) {
          const y = centerY + Math.sin(j * 0.03 + i * 2) * (20 + avg / 5) * Math.sin(Date.now() * 0.001 + i)
          ctx.lineTo(j, y)
        }
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(drawEnergySphere)
    }

    if (isListening) {
      initAudio().then(drawEnergySphere)
    } else {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      if (audioContext) audioContext.close()
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      if (audioContext) audioContext.close()
    }
  }, [isListening])

  const toggleListening = () => setIsListening(!isListening)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 text-white p-4"
    >
      <div className="relative w-80 h-80 mb-8">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          width={320}
          height={320}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleListening}
        >
          <motion.div
            className="w-40 h-40 bg-purple-500 bg-opacity-20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer"
            animate={{
              scale: isListening ? [1, 1.1, 1] : 1,
              boxShadow: isListening
                ? [
                    '0 0 0 0 rgba(236, 72, 153, 0)',
                    '0 0 0 20px rgba(236, 72, 153, 0.3)',
                    '0 0 0 0 rgba(236, 72, 153, 0)'
                  ]
                : '0 0 0 0 rgba(236, 72, 153, 0)',
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
             <VapiButton
              audioLevel={audioLevel}
              callStatus={callStatus}
              toggleCall={toggleCall}
            />
          </motion.div>
        </motion.div>
      </div>
      <motion.h2
        className="text-2xl font-bold mb-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {isListening ? "I'm listening..." : "Tap to speak"}
      </motion.h2>
      <motion.div
        className="text-lg font-semibold"
        animate={{ opacity: energy > 10 ? 1 : 0 }}
      >
      </motion.div>
    </motion.div>
  )
}

const Mira = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/"); // Navigate to the previous page in the history stack
  };


  const [showIntro, setShowIntro] = useState(true)
  const scrollAreaRef = useRef(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  };
  const { toggleCall, messages, callStatus, activeTranscript, audioLevel } =
    useVapi();

  useEffect(() => {
    vapi.on("message", scrollToBottom);
    return () => {
      vapi.off("message", scrollToBottom);
    };
  });

  return (
    <div>

          <VoiceInterface/>

      <Button
        onClick={handleBack}
        className="absolute top-4 left-3 z-10"
        type="primary"
        icon={<ArrowLeftIcon className="w-5 h-5" />}
        shape="circle"
      >
        <span className="sr-only">Back</span>
      </Button>
    </div>
  );
};

export default Mira;
