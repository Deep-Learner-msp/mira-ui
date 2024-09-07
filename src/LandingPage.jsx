import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MessageSquare,
  Video,
  Globe,
  Brain,
  Heart,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import diversePeople from "./assets/diversePeople1.png";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: Mic,
    title: "Voice Interaction",
    description:
      "Natural voice-to-voice conversations for a lifelike experience.",
  },
  {
    icon: MessageSquare,
    title: "Text Chat",
    description:
      "Comfortable text-based interactions for those who prefer typing.",
  },
  {
    icon: Video,
    title: "Video Support",
    description:
      "Future capability for sign language interpretation and visual cues.",
  },
  {
    icon: Globe,
    title: "Multilingual",
    description:
      "Communicate in your preferred language, breaking down barriers.",
  },
  {
    icon: Brain,
    title: "Adaptive AI",
    description:
      "Learns and adapts to your unique needs and communication style.",
  },
  {
    icon: Heart,
    title: "Empathetic Companion",
    description: "A friend who understands and supports you, judgment-free.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const featuresRef = useRef(null);
  const howitWorks = useRef(null);
  const forEveryone = useRef(null);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50 text-gray-800 flex flex-col">
      <header className="bg-white bg-opacity-10 backdrop-blur-md sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mira-4fVuwKouTN1Z8FnOPT54BgDu1Et4YH.jpg"
              alt="MIRA"
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="text-2xl font-bold text-pink-500">MIRA</span>
          </motion.div>
          <div className="hidden md:flex space-x-6">
            <motion.a
              onClick={() => scrollToSection(featuresRef)}
              style={{ cursor: "pointer" }}
              className="text-gray-600 hover:text-pink-500 transition-colors"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              Features
            </motion.a>

            <motion.a
              onClick={() => scrollToSection(howitWorks)}
              style={{ cursor: "pointer" }}
              className="text-gray-600 hover:text-pink-500 transition-colors"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              How It Works
            </motion.a>

            <motion.a
              onClick={() => scrollToSection(forEveryone)}
              style={{ cursor: "pointer" }}
              className="text-gray-600 hover:text-pink-500 transition-colors"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              For Everyone
            </motion.a>

            <motion.a
              onClick={() => navigate("/mira")}
              style={{ cursor: "pointer" }}
              className="text-gray-600 hover:text-pink-500 transition-colors"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Try MIRA
            </motion.a>
          </div>
          <motion.button
            className="md:hidden text-gray-600 hover:text-pink-500 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </motion.button>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-lg absolute top-16 left-0 right-0 z-40"
          >
            <div className="flex flex-col p-4 space-y-4">
              {["Features", "How It Works", "For Everyone", "Try MIRA"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-600 hover:text-pink-500 transition-colors"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        <section className="container mx-auto px-6 py-20 text-center relative overflow-hidden">
          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-500"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Meet MIRA
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-12 text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Your AI companion for mental well-being, designed to support
            everyone through voice, text, and beyond.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <a
              onClick={() => navigate("/mira")}
              className="px-8 py-3 bg-gradient-to-r from-pink-400 to-blue-500 text-white rounded-full text-lg font-semibold hover:from-pink-500 hover:to-blue-600 transition-all duration-300 shadow-lg"
              style={{ cursor: "pointer" }}
            >
              Try MIRA
            </a>
            <a
              onClick={() => scrollToSection(howitWorks)}
              style={{ cursor: "pointer" }}
              className="px-8 py-3 bg-white text-pink-500 rounded-full text-lg font-semibold hover:bg-pink-50 transition-colors duration-300 shadow-lg"
            >
              Learn More
            </a>
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="w-96 h-96 bg-gradient-to-r from-pink-200 to-blue-200 rounded-full filter blur-3xl opacity-30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </motion.div>
        </section>

        <section
          id="features"
          className="container mx-auto px-6 py-20 relative"
          ref={featuresRef}
        >
          <h2 className="text-4xl font-bold mb-12 text-center text-pink-500">
            MIRA's Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <feature.icon className="w-12 h-12 text-pink-500 mb-4 group-hover:animate-bounce" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-blue-200 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </section>

        <section
          id="how-it-works"
          className="py-20 relative overflow-hidden"
          ref={howitWorks}
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-center text-pink-500">
              How MIRA Works
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-blue-500">
                  Voice-to-Voice Interaction
                </h3>
                <p className="text-lg mb-6 text-gray-600">
                  MIRA uses advanced speech recognition and natural language
                  processing to understand and respond to your voice in
                  real-time. The AI adapts to your speech patterns and
                  preferences, creating a seamless and natural conversation
                  experience.
                </p>
                <h3 className="text-2xl font-semibold mb-4 text-blue-500">
                  Multimodal Communication
                </h3>
                <p className="text-lg text-gray-600">
                  Whether you prefer speaking, typing, or in the future, using
                  sign language, MIRA is designed to accommodate your needs. Our
                  goal is to make mental health support accessible to everyone,
                  regardless of their communication style or abilities.
                </p>
              </motion.div>
              <motion.div
                className="bg-white bg-opacity-50 backdrop-blur-md p-8 rounded-lg shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-pink-500">
                  MIRA's AI Core
                </h3>
                <ul className="space-y-4">
                  {[
                    "Emotional Intelligence: Recognizes and responds to emotional cues",
                    "Personalized Learning: Adapts to your unique needs over time",
                    "Context Awareness: Understands and maintains conversation context",
                    "Multilingual Support: Communicates in various languages",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <ChevronRight className="w-6 h-6 mr-2 text-blue-400 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
            <div className="w-96 h-96 bg-gradient-to-r from-pink-100 to-blue-100 rounded-full filter blur-3xl opacity-30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </section>

        <section
          id="for-everyone"
          className="container mx-auto px-6 py-20"
          ref={forEveryone}
        >
          <h2 className="text-4xl font-bold mb-12 text-center text-pink-500">
            MIRA is for Everyone
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={diversePeople}
                alt="Diverse group of people using MIRA"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-blue-500">
                Inclusive Design
              </h3>
              <p className="text-lg mb-6 text-gray-600">
                MIRA is designed to be a companion for everyone, regardless of
                their background, abilities, or preferred communication method.
                We believe that mental health support should be accessible to
                all.
              </p>
              <ul className="space-y-4">
                {[
                  "Speech recognition for those who prefer talking",
                  "Text-based interaction for written communication",
                  "Future support for sign language interpretation",
                  "Multilingual capabilities to break language barriers",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <ChevronRight className="w-6 h-6 mr-2 text-pink-400 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        <section id="try-mira" className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-8 text-center text-pink-500">
              Experience MIRA Today
            </h2>
            <p className="text-xl text-center mb-12 text-gray-600">
              Start your journey towards better mental well-being with MIRA. Try
              a demo or join our waitlist for early access.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <button className="px-8 py-3 bg-gradient-to-r from-pink-400 to-blue-500 text-white rounded-full text-lg font-semibold hover:from-pink-500 hover:to-blue-600 transition-all duration-300 shadow-lg flex items-center">
                Try Demo <ChevronRight className="ml-2" />
              </button>
              <button className="px-8 py-3 bg-white text-pink-500 rounded-full text-lg font-semibold hover:bg-pink-50 transition-colors duration-300 shadow-lg flex items-center">
                Join Waitlist <ChevronRight className="ml-2" />
              </button>
            </motion.div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
            <div className="w-96 h-96 bg-gradient-to-r from-pink-100 to-blue-100 rounded-full filter blur-3xl opacity-30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-pink-100 to-blue-100 text-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mira-4fVuwKouTN1Z8FnOPT54BgDu1Et4YH.jpg"
                alt="MIRA"
                className="w-12 h-12 rounded-full mb-4"
              />
              <h3 className="text-xl font-bold mb-2 text-pink-500">MIRA</h3>
              <p className="text-gray-600">
                Your AI companion for mental well-being
              </p>
            </div>
            {[
              {
                title: "Quick Links",
                items: ["Features", "How It Works", "For Everyone", "Try MIRA"],
              },
              {
                title: "Legal",
                items: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
              },
              { title: "Connect", items: ["Contact Us", "Support", "FAQ"] },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold mb-4 text-blue-500">
                  {column.title}
                </h4>
                <ul className="space-y-2">
                  {column.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-pink-500 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
            © {new Date().getFullYear()} MIRA AI. All rights reserved.
          </div>
        </div>
      </footer>

      <motion.div
        className="fixed bottom-8 right-8 bg-white rounded-full p-4 shadow-lg cursor-pointer"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: scrollY > 200 ? 1 : 0, y: scrollY > 200 ? 0 : 100 }}
        transition={{ duration: 0.3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ChevronDown className="w-6 h-6 text-pink-500 transform rotate-180" />
      </motion.div>
    </div>
  );
}
