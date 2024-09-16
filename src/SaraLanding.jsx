import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";

import {
  Book,
  GraduationCap,
  Search,
  Zap,
  Lightbulb,
  Headphones,
  PenTool,
  Activity,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const LearningStylesAnimation = () => {
  const [activeStyle, setActiveStyle] = useState(0);
  const learningStyles = [
    { icon: Lightbulb, color: "#3B82F6", name: "Visual" },
    { icon: Headphones, color: "#60A5FA", name: "Auditory" },
    { icon: PenTool, color: "#93C5FD", name: "Read/Write" },
    { icon: Activity, color: "#BFDBFE", name: "Kinesthetic" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStyle((prev) => (prev + 1) % learningStyles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-64 h-64 mx-auto">
      {learningStyles.map((style, index) => {
        const Icon = style.icon;
        return (
          <motion.div
            key={index}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: activeStyle === index ? 1 : 0,
              scale: activeStyle === index ? 1 : 0.8,
              rotateY: activeStyle === index ? 0 : 180,
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <Icon size={64} color={style.color} />
              <p className="mt-2 text-lg font-semibold">{style.name}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const FloatingIcons = () => {
  return (
    <div className="relative w-full h-64">
      {[Zap, Book, Search, GraduationCap].map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{
            x: Math.random() * 300 - 150,
            y: Math.random() * 300 - 150,
            scale: 0,
          }}
          animate={{
            x: Math.random() * 300 - 150,
            y: Math.random() * 300 - 150,
            scale: 1,
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Icon className="text-blue-500" size={32} />
        </motion.div>
      ))}
    </div>
  );
};

const Section = ({ children, id }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={mainControls}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      {children}
    </motion.section>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg"
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(59 130 246)" }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="h-12 w-12 text-blue-600 mb-4" />
      <h3 className="text-xl font-bold text-blue-800 mb-2">{title}</h3>
      <p className="text-blue-700">{description}</p>
    </motion.div>
  );
};

export default function SaraLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 text-blue-900 font-sans">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between fixed w-full bg-blue-600 text-white z-50">
        <Link
          className="flex items-center justify-center"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <GraduationCap className="h-6 w-6 mr-2" />
          <span className="text-2xl font-bold">Sara</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <button
            className="text-sm hover:text-blue-200 transition-colors"
            onClick={() => scrollToSection("features")}
          >
            Features
          </button>
          <button
            className="text-sm hover:text-blue-200 transition-colors"
            onClick={() => scrollToSection("for-students")}
          >
            For Students
          </button>
          <button
            className="text-sm hover:text-blue-200 transition-colors"
            onClick={() => scrollToSection("for-teachers")}
          >
            For Teachers
          </button>
          <button
            className="text-sm hover:text-blue-200 transition-colors"
            onClick={() => scrollToSection("research-agent")}
          >
            Research Agent
          </button>
          <button
            className="text-sm hover:text-blue-200 transition-colors"
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </button>
        </nav>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </header>
      {isMenuOpen && (
        <div className="md:hidden bg-blue-500 p-4 fixed top-16 left-0 right-0 z-40">
          <nav className="flex flex-col gap-4">
            <button
              className="text-sm text-white hover:text-blue-200 transition-colors"
              onClick={() => scrollToSection("features")}
            >
              Features
            </button>
            <button
              className="text-sm text-white hover:text-blue-200 transition-colors"
              onClick={() => scrollToSection("for-students")}
            >
              For Students
            </button>
            <button
              className="text-sm text-white hover:text-blue-200 transition-colors"
              onClick={() => scrollToSection("for-teachers")}
            >
              For Teachers
            </button>
            <button
              className="text-sm text-white hover:text-blue-200 transition-colors"
              onClick={() => scrollToSection("research-agent")}
            >
              Research Agent
            </button>
            <button
              className="text-sm text-white hover:text-blue-200 transition-colors"
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </button>
          </nav>
        </div>
      )}
      <main className="flex-1 pt-16">
        <Section id="hero">
          <div className="w-full py-12 md:py-24 lg:py-32 xl:py-50 bg-blue-600 text-white overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto relative">
              <div className="flex flex-col items-center space-y-4 text-center">
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Meet Sara, Your AI Tutor
                </motion.h1>
                <motion.p
                  className="max-w-[700px] text-blue-100 text-sm sm:text-base md:text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Personalized learning powered by AI
                </motion.p>
                <motion.div
                  className="w-full max-w-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <LearningStylesAnimation />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Button
                    className="bg-white text-blue-600 hover:bg-blue-100"
                    onClick={() => scrollToSection("features")}
                    style={{
                      padding: "20px 30px",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Explore Sara's Features
                  </Button>
                </motion.div>
              </div>
              <div style={{ height: "10px" }}>
                <FloatingIcons />
              </div>
            </div>
          </div>
        </Section>

        <Section id="features">
          <div className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6 mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-8">
                Sara's Key Features
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <FeatureCard
                  icon={Zap}
                  title="Dynamic Learning"
                  description="Adaptive paths that evolve with you"
                />
                <FeatureCard
                  icon={Book}
                  title="Interactive Discovery"
                  description="Engaging dialogues to expand knowledge"
                />
                <FeatureCard
                  icon={Search}
                  title="Research Companion"
                  description="Access cutting-edge information"
                />
              </div>
            </div>
          </div>
        </Section>

        <Section id="for-students">
          <div className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
            <div className="container px-4 md:px-6 mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-8">
                Empower Your Learning
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                <motion.div
                  className="bg-blue-700 p-6 rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3 className="text-xl font-bold mb-4">
                    Personalized Experience
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Adaptive content for your style</li>
                    <li>Interactive exercises</li>
                    <li>Real-time progress tracking</li>
                    <li>AI-powered recommendations</li>
                  </ul>
                </motion.div>
                <motion.div
                  className="bg-blue-700 p-6 rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3 className="text-xl font-bold mb-4">Engaging Dialogues</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Thought-provoking discussions</li>
                    <li>Critical thinking exercises</li>
                    <li>Guided concept discovery</li>
                    <li>Confidence-building challenges</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="for-teachers">
          <div className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6 mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-8">
                Revolutionize Your Teaching
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3 className="text-xl font-bold text-blue-800 mb-4">
                    AI-Powered Planning
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-blue-700">
                    <li>Generate engaging lesson plans</li>
                    <li>Access multimedia resources</li>
                    <li>Create interactive assignments</li>
                    <li>Develop personalized materials</li>
                  </ul>
                </motion.div>
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3 className="text-xl font-bold text-blue-800 mb-4">
                    Student Analytics
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-blue-700">
                    <li>Real-time performance insights</li>
                    <li>Predictive analytics</li>
                    <li>Customized progress reports</li>
                    <li>Data-driven strategy suggestions</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="research-agent">
          <div className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div className="container px-4 md:px-6 mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-8">
                Sara: Your Research Companion
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                <motion.div
                  className="bg-blue-900 p-6 rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3 className="text-xl font-bold mb-4">
                    Intelligent Information
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Advanced web crawling</li>
                    <li>Real-time data synthesis</li>
                    <li>Access to academic databases</li>
                    <li>Trend analysis and insights</li>
                  </ul>
                </motion.div>
                <motion.div
                  className="bg-blue-900 p-6 rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3 className="text-xl font-bold mb-4">Smart Curation</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Personalized recommendations</li>
                    <li>Multi-source synthesis</li>
                    <li>Automated citations</li>
                    <li>Interactive mind-mapping</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="contact">
          <div className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6 mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-8">
                Start Your Journey with Sara
              </h2>
              <div className="max-w-md mx-auto">
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <form className="space-y-4">
                    <Input
                      className="w-full"
                      placeholder="Your Name"
                      type="text"
                    />
                    <Input
                      className="w-full"
                      placeholder="Your Email"
                      type="email"
                    />
                    <select className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">I am a...</option>
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="parent">Parent</option>
                      <option value="other">Other</option>
                    </select>
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                      Get Started
                    </Button>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <footer className="w-full py-6 bg-blue-800 text-white">
        <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm">&copy; 2024 Sara. All rights reserved.</p>
          </div>
          <nav className="flex gap-4">
            <Link
              className="text-sm hover:underline"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Privacy Policy
            </Link>
            <Link
              className="text-sm hover:underline"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Terms of Service
            </Link>
            <Link
              className="text-sm hover:underline"
              href="#"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              FAQ
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
