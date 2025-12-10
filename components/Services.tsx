'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaCheck, FaRocket, FaStar, FaCrown } from 'react-icons/fa';

interface Service {
  id: string;
  name: string;
  type: 'starter' | 'professional' | 'premium';
  price: string;
  description: string;
  features: string[];
  order?: number;
}

interface ServicesProps {
  services: Service[];
}

const typeIcons = {
  starter: FaRocket,
  professional: FaStar,
  premium: FaCrown,
};

const Services = ({ services }: ServicesProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="services" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-semibold uppercase tracking-wider text-sm">
            What I Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mt-2">
            Service <span className="gradient-text">Packages</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.sort((a, b) => (a.order || 0) - (b.order || 0)).map((service, index) => {
            const Icon = typeIcons[service.type];
            const isPremium = service.type === 'premium';

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`glass rounded-3xl p-8 relative ${
                  isPremium ? 'border-2 border-primary-500' : ''
                }`}
              >
                {/* Popular Badge */}
                {isPremium && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-primary-600 to-accent-600 text-white text-sm font-semibold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <Icon className="text-white text-2xl" />
                </div>

                {/* Name */}
                <h3 className="text-2xl font-bold mb-2">{service.name}</h3>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-4xl font-bold gradient-text">{service.price}</span>
                </div>

                {/* Description */}
                <p className="text-gray-400 mb-6">{service.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <FaCheck className="text-primary-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href="#contact"
                  className={`block w-full py-3 text-center rounded-full font-semibold transition-all duration-300 ${
                    isPremium
                      ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:shadow-lg hover:shadow-primary-500/50'
                      : 'glass hover:bg-white/10'
                  }`}
                >
                  Start Project
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
