'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  SiZapier, 
  SiPython,
} from 'react-icons/si';
import { FaBrain, FaCode, FaRobot, FaNetworkWired } from 'react-icons/fa';

interface Skill {
  id: string;
  name: string;
  icon: string;
  level: number;
  order: number;
}

interface SkillsProps {
  skills: Skill[];
}

const iconMap: Record<string, any> = {
  SiZapier,
  SiPython,
  FaBrain,
  FaCode,
  FaRobot,
  FaNetworkWired,
};

const Skills = ({ skills }: SkillsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="skills" ref={ref} className="py-20 relative overflow-hidden bg-gradient-to-b from-transparent via-gray-900/30 to-transparent">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-500/5 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block text-primary-400 font-bold uppercase tracking-widest text-xs mb-4 px-6 py-2 rounded-full border-2 border-primary-500/30 bg-primary-500/5"
          >
            ⚡ Technical Expertise
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold font-poppins mt-4">
            Professional <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
            Specialized in automation, AI integration, and modern web development
          </p>
        </motion.div>

        {/* Skills Grid - Professional Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {skills.sort((a, b) => a.order - b.order).map((skill, index) => {
            const Icon = iconMap[skill.icon] || FaCode;
            const isImageUrl = skill.icon.startsWith('http');
            
            return (
              <motion.div
                key={skill.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                {/* Card with Border Gradient */}
                <div className="relative glass rounded-3xl p-8 h-full flex flex-col items-center text-center border border-white/5 group-hover:border-primary-500/30 transition-all duration-500 overflow-hidden">
                  {/* Gradient Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/10 group-hover:to-accent-500/10 transition-all duration-500 rounded-3xl"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center w-full">
                    {/* Logo Container */}
                    {isImageUrl ? (
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="w-24 h-24 mb-6 rounded-2xl bg-white/5 backdrop-blur-sm flex items-center justify-center p-4 group-hover:bg-white/10 transition-all duration-300"
                      >
                        <img 
                          src={skill.icon} 
                          alt={skill.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </motion.div>
                    ) : (
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center group-hover:shadow-xl group-hover:shadow-primary-500/50 transition-all duration-300"
                      >
                        <Icon className="text-white text-4xl" />
                      </motion.div>
                    )}

                    {/* Skill Name */}
                    <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">
                      {skill.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-500 text-xs mb-4">
                      {skill.level >= 90 ? 'Expert Level Mastery' : skill.level >= 85 ? 'Advanced Proficiency' : 'Professional Competency'}
                    </p>

                    {/* Professional Progress Bar */}
                    <div className="w-full space-y-3">
                      {/* Level Label */}
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-gray-500">Skill Level</span>
                        <span className="text-primary-400">{skill.level}%</span>
                      </div>
                      
                      {/* Progress Track */}
                      <div className="relative w-full h-3 bg-gray-800/80 rounded-full overflow-hidden backdrop-blur-sm">
                        {/* Animated Progress */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ 
                            duration: 1.5, 
                            delay: 0.3 + index * 0.1,
                            ease: "easeOut"
                          }}
                          className="relative h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                        >
                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                        </motion.div>
                      </div>

                      {/* Expertise Badge */}
                      <div className="text-center">
                        {skill.level >= 90 ? (
                          <span className="text-xs font-bold text-yellow-400">★ Expert</span>
                        ) : skill.level >= 85 ? (
                          <span className="text-xs font-bold text-blue-400">⚡ Advanced</span>
                        ) : (
                          <span className="text-xs font-bold text-green-400">✓ Proficient</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Professional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 pt-16 border-t border-white/5"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Technologies Mastered', value: `${skills.length}+`, icon: '🚀' },
              { label: 'Years of Experience', value: '5+', icon: '⏱️' },
              { label: 'Projects Completed', value: '100+', icon: '✅' },
              { label: 'Client Satisfaction', value: '98%', icon: '⭐' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-2xl p-6 text-center border border-white/5 hover:border-primary-500/30 transition-all"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <h4 className="text-4xl font-bold gradient-text mb-2">{stat.value}</h4>
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
