'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaHome, FaRocket, FaQuestion, FaGhost } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const funnyMessages = [
  "Oops! This page went on vacation... without telling us! 🏖️",
  "404: Page not found. Maybe it's hiding from bugs? 🐛",
  "This page is playing hide and seek. Spoiler: It's winning! 🙈",
  "Error 404: This page is in another castle! 🏰",
  "Well, this is awkward... The page you're looking for ghosted us! 👻",
  "Houston, we have a problem... This page doesn't exist! 🚀",
  "Plot twist: The page you're looking for is on vacation in the Bahamas! 🌴",
  "404: The page ran away with the spoon. The dish is still here though! 🥄",
  "Looks like you've discovered our secret 404 page! Too bad it's not a real page... 🕵️",
  "This page is like my motivation on Monday morning... nowhere to be found! ☕",
];

const funnySubtitles = [
  "Don't worry, happens to the best of us!",
  "Even developers get lost sometimes 🤷",
  "Let's get you back on track!",
  "No worries, we'll help you find your way!",
  "Time to head back to safety!",
  "Let's pretend this never happened 😅",
  "Your GPS seems confused!",
  "The Internet is a big place, easy to get lost!",
];

export default function NotFound() {
  const [message, setMessage] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [emoji, setEmoji] = useState('');
  const [visitorCount, setVisitorCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [floatingElements, setFloatingElements] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    setIsClient(true);
    
    // Pick random messages
    setMessage(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);
    setSubtitle(funnySubtitles[Math.floor(Math.random() * funnySubtitles.length)]);
    setEmoji(Math.random() > 0.5 ? '👻' : '🤖');
    setVisitorCount(Math.floor(Math.random() * 9999) + 1);

    // Generate random floating elements
    const elements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setFloatingElements(elements);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center overflow-hidden relative px-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((elem) => (
          <motion.div
            key={elem.id}
            className="absolute w-2 h-2 bg-primary-500/20 rounded-full"
            style={{ left: `${elem.x}%`, top: `${elem.y}%` }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/20 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl">
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 100 }}
          className="mb-8"
        >
          <motion.h1
            className="text-[12rem] md:text-[20rem] font-bold gradient-text leading-none"
            animate={{ 
              textShadow: [
                '0 0 20px rgba(245, 158, 11, 0.5)',
                '0 0 40px rgba(249, 115, 22, 0.8)',
                '0 0 20px rgba(245, 158, 11, 0.5)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            404
          </motion.h1>
        </motion.div>

        {/* Animated Ghost/Robot */}
        {isClient && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="inline-block text-8xl mb-4"
            >
              {emoji}
            </motion.div>
          </motion.div>
        )}

        {/* Funny Message */}
        {isClient && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {message}
            </h2>
            <p className="text-xl md:text-2xl text-gray-400">
              {subtitle}
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(245, 158, 11, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full font-semibold text-lg flex items-center gap-3 shadow-lg transition-all duration-300"
            >
              <FaHome />
              Take Me Home
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="px-8 py-4 glass border border-gray-700 text-white rounded-full font-semibold text-lg flex items-center gap-3 hover:bg-white/10 transition-all duration-300"
          >
            <FaRocket className="rotate-180" />
            Go Back
          </motion.button>
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 glass rounded-2xl p-6 max-w-2xl mx-auto"
        >
          <div className="flex items-start gap-3">
            <FaQuestion className="text-primary-500 text-2xl flex-shrink-0 mt-1" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-white mb-2">Did You Know?</h3>
              <p className="text-gray-400 text-sm">
                The HTTP 404 error was named after room 404 at CERN, where the World Wide Web was invented. 
                Just kidding! That's a myth. But the 404 error has been frustrating users since the early days of the web! 😄
              </p>
            </div>
          </div>
        </motion.div>

        {/* Easter Egg Counter */}
        {isClient && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-8 text-gray-500 text-sm"
          >
            🎉 Congrats! You've found our secret 404 page! You're visitor #{visitorCount} to get lost here today!
          </motion.p>
        )}
      </div>

      {/* Floating Emojis */}
      <motion.div
        className="absolute bottom-10 left-10 text-6xl"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🔍
      </motion.div>

      <motion.div
        className="absolute top-10 right-10 text-6xl"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -10, 10, 0]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🎯
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/4 text-4xl"
        animate={{ 
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        🚀
      </motion.div>
    </div>
  );
}
