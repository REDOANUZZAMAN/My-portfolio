'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface AboutProps {
  title: string;
  description: string;
  image_url: string;
  image_frame?: string;
}

const About = ({ title, description, image_url, image_frame }: AboutProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="about" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          {/* Image Side */}
          <motion.div variants={itemVariants} className="relative">
            <div className={`glass ${
              image_frame === 'circle' ? 'rounded-full' : 'rounded-3xl'
            } overflow-hidden aspect-square`}>
              <img src={image_url} alt="REDOANUZZAMAN" className="w-full h-full object-cover" />
            </div>
            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 glass px-6 py-4 rounded-2xl"
            >
              <div className="text-3xl font-bold gradient-text">5+</div>
              <div className="text-sm text-gray-300">Years Experience</div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-primary-400 font-semibold uppercase tracking-wider text-sm">
                Get To Know
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-poppins mt-2 mb-6">
                {title}
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300 text-lg leading-relaxed"
            >
              {description}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-6"
            >
              {[
                { number: '50+', label: 'Projects Completed' },
                { number: '30+', label: 'Happy Clients' },
                { number: '100%', label: 'Satisfaction' },
              ].map((stat, index) => (
                <div key={index} className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold gradient-text">
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.a
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8 }}
              href="#contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Let's Talk
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
