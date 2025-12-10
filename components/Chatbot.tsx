'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from 'react-icons/fa';
import { BsLightningChargeFill } from 'react-icons/bs';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi! I'm your AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [browserId, setBrowserId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate or retrieve browser ID
  useEffect(() => {
    let id = localStorage.getItem('chatbot_browser_id');
    if (!id) {
      id = `browser_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('chatbot_browser_id', id);
    }
    setBrowserId(id);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    { text: "Tell me about your services", icon: "💼" },
    { text: "What's your experience?", icon: "🎯" },
    { text: "How can I contact you?", icon: "📧" },
    { text: "Show me your projects", icon: "🚀" },
  ];

  const streamBotResponse = async (fullText: string, messageId: string) => {
    const words = fullText.split(' ');
    let currentText = '';
    
    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? '' : ' ') + words[i];
      
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? { ...msg, text: currentText }
            : msg
        )
      );
      
      // Delay between words to simulate typing (30-80ms per word)
      await new Promise((resolve) => setTimeout(resolve, 30 + Math.random() * 50));
    }
  };

  const sendToN8N = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('https://n8n.srv1125285.hstgr.cloud/webhook/22001a42-b2e8-42a3-bbf7-e0ea75b192a0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          browserId: browserId,
          timestamp: new Date().toISOString(),
          source: 'Portfolio Chatbot',
          conversationHistory: messages.slice(-5).map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text,
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Expecting the webhook to return { response: "AI generated response" }
        return data.response || data.message || "I've received your message! How can I help you further?";
      } else {
        throw new Error('Webhook failed');
      }
    } catch (error) {
      console.error('Error sending to n8n:', error);
      // Fallback to local response if webhook fails
      return getBotResponseFallback(userMessage);
    }
  };

  const getBotResponseFallback = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
      return "I specialize in AI automation, n8n workflows, web development, and creative design. I help businesses automate their processes and build powerful digital solutions! 🚀";
    } else if (lowerMessage.includes('experience') || lowerMessage.includes('skill')) {
      return "I have expertise in:\n✨ AI & Automation (n8n, Make)\n💻 Web Development (React, Next.js)\n🎨 UI/UX Design\n🤖 Chatbot Development\n\nCheck out the Skills section to see more!";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
      return "You can reach me at:\n📧 Email: redoanuzzaman707@gmail.com\n📱 WhatsApp: +86 132 5824 8276\n\nOr scroll down to the Contact section to send me a message! 💬";
    } else if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
      return "I've worked on various exciting projects! Check out the Projects section below to see my recent work. From automation solutions to web applications, I love bringing ideas to life! 🎨";
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate')) {
      return "Pricing depends on the project scope and requirements. Let's discuss your specific needs! You can use the contact form below or reach out directly. I offer competitive rates and flexible packages! 💰";
    } else if (lowerMessage.includes('hire') || lowerMessage.includes('available')) {
      return "Yes, I'm available for new projects! I'd love to hear about your ideas. Scroll down to the Contact section or reach out directly. Let's create something amazing together! 🌟";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! 👋 Great to meet you! I'm here to help you learn more about my services and how we can work together. What would you like to know?";
    } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're very welcome! 😊 If you have any other questions, feel free to ask. I'm here to help!";
    } else {
      return "That's a great question! 🤔 I'd love to discuss this further. Feel free to:\n\n• Check out the different sections below\n• Use the contact form to send a detailed message\n• Reach out directly via email or WhatsApp\n\nWhat else would you like to know?";
    }
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText || !browserId) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Send to n8n webhook and get AI response
      const aiResponse = await sendToN8N(messageText);
      
      setIsTyping(false);
      
      // Create empty bot message
      const botMessageId = (Date.now() + 1).toString();
      const botResponse: Message = {
        id: botMessageId,
        text: '',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      
      // Stream the response word by word
      await streamBotResponse(aiResponse, botMessageId);
      
    } catch (error) {
      console.error('Error getting bot response:', error);
      setIsTyping(false);
      
      // Fallback message
      const botMessageId = (Date.now() + 1).toString();
      const botResponse: Message = {
        id: botMessageId,
        text: '',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      
      await streamBotResponse("I'm here to help! Let me connect you with the right information. 😊", botMessageId);
    }
  };

  const handleQuickReply = (text: string) => {
    handleSendMessage(text);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 group overflow-hidden"
          >
            {/* Animated background pulse */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full animate-ping opacity-20"></div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            <FaRobot className="text-2xl relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed bottom-24 right-8 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200/50 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 bg-size-200 animate-gradient p-5 flex items-center justify-between relative overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              </div>
              
              <div className="flex items-center gap-3 relative z-10">
                <motion.div 
                  className="relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ring-2 ring-white/30">
                    <FaRobot className="text-white text-xl" />
                  </div>
                  <motion.span 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-lg"
                  ></motion.span>
                </motion.div>
                <div>
                  <h3 className="text-white font-bold text-base">Virtual Assistant</h3>
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-white/90 text-xs flex items-center gap-1.5"
                  >
                    <motion.span 
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="w-2 h-2 bg-green-300 rounded-full shadow-sm"
                    ></motion.span>
                    Online now
                  </motion.p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="text-white/90 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-sm relative z-10"
              >
                <FaTimes className="text-lg" />
              </motion.button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white relative">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary-100 rounded-full blur-3xl opacity-30 -z-0"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent-100 rounded-full blur-3xl opacity-30 -z-0"></div>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}
                >
                  <div
                    className={`flex gap-2 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Avatar */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-br from-gray-600 to-gray-800 ring-gray-300'
                          : 'bg-gradient-to-br from-primary-500 to-accent-500 ring-orange-200'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <FaUser className="text-white text-xs" />
                      ) : (
                        <FaRobot className="text-white text-sm" />
                      )}
                    </motion.div>

                    {/* Message Bubble */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <div
                        className={`px-4 py-3 rounded-2xl relative overflow-hidden ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white rounded-br-sm shadow-lg'
                            : 'bg-white text-gray-800 border border-gray-200/80 rounded-bl-sm shadow-md hover:shadow-lg transition-shadow'
                        }`}
                      >
                        {message.sender === 'user' && (
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0"></div>
                        )}
                        <p className="text-sm leading-relaxed whitespace-pre-line relative z-10">{message.text}</p>
                      </div>
                      <p
                        className={`text-xs text-gray-400 mt-1.5 px-2 flex items-center gap-1 ${
                          message.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <span>{message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}</span>
                        {message.sender === 'user' && <span>✓✓</span>}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-accent-500">
                      <FaRobot className="text-white text-sm" />
                    </div>
                    <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg rounded-bl-none shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-accent-400 rounded-full animate-bounce delay-200"></span>
                        <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce delay-400"></span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-4 bg-gradient-to-b from-white to-gray-50 border-t border-gray-200/80"
              >
                <p className="text-xs text-gray-600 mb-3 font-semibold flex items-center gap-2">
                  <BsLightningChargeFill className="text-primary-500" />
                  Quick suggestions
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickReply(reply.text)}
                      className="px-3 py-2 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 border border-orange-200 rounded-xl text-xs text-orange-700 transition-all flex items-center gap-1.5 font-medium shadow-sm hover:shadow-md"
                    >
                      <span className="text-base">{reply.icon}</span>
                      <span>{reply.text}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-gradient-to-b from-white to-gray-50 border-t border-gray-200/80">
              <div className="flex gap-2 items-end">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all text-sm text-gray-800 placeholder-gray-400 shadow-sm"
                  />
                  {inputValue && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-500"
                    >
                      <BsLightningChargeFill className="text-xs" />
                    </motion.div>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 rounded-xl flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:shadow-primary-300/50 relative overflow-hidden group"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                  
                  <FaPaperPlane className="text-sm relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.button>
              </div>
              
              {/* Powered by text */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-2"
              >
                <BsLightningChargeFill className="text-yellow-500 animate-pulse" />
                <span>Powered by AI • Instant responses</span>
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
