import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Sprout,
  Cloud,
  Sun,
  Droplet,
  Zap,
  Menu,
  X,
  Globe,
  Camera,
  BarChart2,
  Cpu,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { Button, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-lg"
    whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(34 197 94)" }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="h-12 w-12 text-green-600 mb-4" />
    <h3 className="text-xl font-bold text-green-800 mb-2">{title}</h3>
    <p className="text-green-700">{description}</p>
  </motion.div>
);

const AnimatedText = ({ texts }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="h-8 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-green-300 text-lg"
        >
          {texts[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const MarketProjection = () => {
  const [currentYear, setCurrentYear] = useState(2024);
  const [currentValue, setCurrentValue] = useState(2.1);

  const projections = [
    { year: 2024, value: 2.1 },
    { year: 2025, value: 2.6 },
    { year: 2026, value: 3.2 },
    { year: 2027, value: 3.9 },
    { year: 2028, value: 4.7 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear((prevYear) => {
        const nextIndex = projections.findIndex((p) => p.year === prevYear) + 1;
        return nextIndex < projections.length
          ? projections[nextIndex].year
          : projections[0].year;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const targetValue = projections.find((p) => p.year === currentYear).value;
    const duration = 2000;
    const startTime = Date.now();
    const startValue = currentValue;

    const updateValue = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        const progress = elapsed / duration;
        setCurrentValue(startValue + (targetValue - startValue) * progress);
        requestAnimationFrame(updateValue);
      } else {
        setCurrentValue(targetValue);
      }
    };

    requestAnimationFrame(updateValue);
  }, [currentYear]);

  return (
    <div className="bg-green-800 p-8 rounded-lg text-white text-center">
      <h3 className="text-2xl font-bold mb-4">AI in Agriculture Market Size</h3>
      <div className="text-6xl font-bold mb-2">${currentValue.toFixed(1)}B</div>
      <div className="text-3xl">{currentYear}</div>
      <motion.div
        className="h-2 bg-green-500 mt-4 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${(currentValue / 4.7) * 100}%` }}
        transition={{ duration: 0.5 }}
      />
      <p className="mt-4 text-sm italic">
        Source: MarketsandMarkets Analysis, 2023
      </p>
    </div>
  );
};

const AICapabilityCard = ({ icon: Icon, title, description, color }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
    whileHover={{ scale: 1.05, boxShadow: `0px 0px 15px ${color}` }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="h-16 w-16 mb-4" style={{ color }} />
    <h3 className="text-xl font-bold mb-2" style={{ color }}>
      {title}
    </h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const ComingSoon = () => (
  <div className="bg-green-700 text-white p-8 rounded-lg shadow-lg text-center">
    <h3 className="text-2xl font-bold mb-4">Coming Soon: Dheera Mobile App</h3>
    <p className="mb-6">
      Get real-time insights and control your farm from anywhere. Join the
      waitlist now!
    </p>
    <form className="flex flex-col sm:flex-row gap-4 justify-center">
      <Input
        className="bg-white text-green-800"
        placeholder="Enter your email"
        type="email"
      />
      <Button className="bg-green-500 hover:bg-green-600 text-white">
        Join Waitlist
      </Button>
    </form>
  </div>
);

export default function DheeraLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-green-100 text-green-900 font-sans">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between fixed w-full bg-green-600 text-white z-50">
        <Link
          className="flex items-center justify-center"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Leaf className="h-6 w-6 mr-2" />
          <span className="text-2xl font-bold">Dheera</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <button
            className="text-sm hover:text-green-200 transition-colors"
            onClick={() => scrollToSection("features")}
          >
            Features
          </button>
          <button
            className="text-sm hover:text-green-200 transition-colors"
            onClick={() => scrollToSection("capabilities")}
          >
            Capabilities
          </button>
          <button
            className="text-sm hover:text-green-200 transition-colors"
            onClick={() => scrollToSection("future")}
          >
            Future
          </button>
          <button
            className="text-sm hover:text-green-200 transition-colors"
            onClick={() => scrollToSection("join")}
          >
            Join Us
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
        <div className="md:hidden bg-green-500 p-4 fixed top-16 left-0 right-0 z-40">
          <nav className="flex flex-col gap-4">
            <button
              className="text-sm text-white hover:text-green-200 transition-colors"
              onClick={() => scrollToSection("features")}
            >
              Features
            </button>
            <button
              className="text-sm text-white hover:text-green-200 transition-colors"
              onClick={() => scrollToSection("capabilities")}
            >
              Capabilities
            </button>
            <button
              className="text-sm text-white hover:text-green-200 transition-colors"
              onClick={() => scrollToSection("future")}
            >
              Future
            </button>
            <button
              className="text-sm text-white hover:text-green-200 transition-colors"
              onClick={() => scrollToSection("join")}
            >
              Join Us
            </button>
          </nav>
        </div>
      )}
      <main className="flex-1 pt-16">
        <section
          id="hero"
          className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-green-600 text-white"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Cultivating Tomorrow, Today
              </motion.h1>
              <motion.p
                className="max-w-[700px] text-green-100 text-sm sm:text-base md:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Dheera: AI-Powered Agricultural Innovation
              </motion.p>
              <AnimatedText
                texts={[
                  "Optimizing yields",
                  "Enhancing sustainability",
                  "Empowering farmers",
                  "Securing our future",
                ]}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button
                  className="bg-white text-green-600 hover:bg-green-100"
                  onClick={() => scrollToSection("features")}
                  style={{
                    padding: "20px 30px",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Explore Dheera
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-green-100"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-8">
              AI-Powered Agricultural Solutions
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={Sprout}
                title="Precision Farming"
                description="Optimize planting, irrigation, and fertilization with AI-driven insights."
              />
              <FeatureCard
                icon={Cloud}
                title="Weather Forecasting"
                description="Make informed decisions with advanced agricultural weather predictions."
              />
              <FeatureCard
                icon={Sun}
                title="Crop Monitoring"
                description="Detect diseases early with AI-powered image analysis."
              />
              <FeatureCard
                icon={Droplet}
                title="Water Management"
                description="Conserve water and improve crop health with smart irrigation strategies."
              />
              <FeatureCard
                icon={BarChart2}
                title="Yield Prediction"
                description="Forecast crop yields and optimize harvesting schedules."
              />
              <FeatureCard
                icon={Leaf}
                title="Soil Health"
                description="Maintain optimal soil conditions with AI-generated recommendations."
              />
            </div>
          </div>
        </section>

        <section
          id="capabilities"
          className="w-full py-12 md:py-24 lg:py-32 bg-green-800 text-white"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-center mb-12">
              Advanced AI Capabilities
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <AICapabilityCard
                icon={Cpu}
                title="Deep Learning"
                description="Uncover hidden patterns in agricultural data for enhanced decision-making."
                color="#0088FE"
              />
              <AICapabilityCard
                icon={MessageSquare}
                title="Natural Language Processing"
                description="Communicate with farmers in their native languages, breaking down barriers."
                color="#00C49F"
              />
              <AICapabilityCard
                icon={BarChart2}
                title="Predictive Modeling"
                description="Forecast crop yields, weather patterns, and market trends with high accuracy."
                color="#FFBB28"
              />
              <AICapabilityCard
                icon={Zap}
                title="Reinforcement Learning"
                description="Optimize farming strategies through continuous learning and adaptation."
                color="#FF8042"
              />
            </div>
          </div>
        </section>

        <section
          id="future"
          className="w-full py-12 md:py-24 lg:py-32 bg-green-600 text-white"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-center mb-8">
                The Future is Green
              </h2>
              <div className="max-w-3xl mx-auto text-center mb-12">
                <p className="text-xl">
                  Watch the AI revolution transform agriculture before your eyes
                </p>
              </div>
            </motion.div>
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <MarketProjection />
            </motion.div>
            <div className="mt-16">
              <ComingSoon />
            </div>
          </div>
        </section>

        <section id="join" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-8">
              Grow with Dheera
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
                  <select className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">I am a...</option>
                    <option value="farmer">Farmer</option>
                    <option value="researcher">Researcher</option>
                    <option value="business">Agribusiness Professional</option>
                    <option value="investor">Investor</option>
                    <option value="other">Other</option>
                  </select>
                  <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                    Join the Green Revolution
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-green-800 text-white">
        <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm">
              &copy; 2024 Dheera AI. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-4">
            <Link className="text-sm hover:underline" href="#">
              Privacy Policy
            </Link>
            <Link className="text-sm hover:underline" href="#">
              Terms of Service
            </Link>
            <Link className="text-sm hover:underline" href="#">
              Contact Us
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
