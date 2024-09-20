import { useState, useEffect, useRef } from "react";

import { Button, Input, Image } from "antd";
import { Link, useNavigate } from "react-router-dom";

import {
  BrainCircuit,
  GraduationCap,
  Sprout,
  ChevronDown,
  Menu,
  X,
  Briefcase,
  Heart,
  Book,
  Zap,
} from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";

import React from "react";

const AjoAIUniverse = () => {
  const centerX = 150;
  const centerY = 150;

  const orbits = [
    { radius: 80, duration: 20, shape: "circle" },
    { radius: 100, duration: 25, shape: "circle" },
    { radius: 120, duration: 30, shape: "circle" },
  ];

  const planets = [
    { name: "Mira", color: "#FFC0CB", orbitIndex: 0, icon: Heart },
    { name: "Sara", color: "#E6E6FA", orbitIndex: 1, icon: Book },
    { name: "Dheera", color: "#90EE90", orbitIndex: 2, icon: Sprout },
  ];

  const getOrbitPath = (orbit) => {
    return `M${centerX},${centerY - orbit.radius} a${orbit.radius},${
      orbit.radius
    } 0 1,0 0,${orbit.radius * 2} a${orbit.radius},${orbit.radius} 0 1,0 0,-${
      orbit.radius * 2
    }`;
  };

  return (
    <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
      <defs>
        <radialGradient
          id="center-glow"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Orbits */}
      {orbits.map((orbit, index) => (
        <path
          key={index}
          d={getOrbitPath(orbit)}
          fill="none"
          stroke="#333"
          strokeWidth="1"
          strokeDasharray="5,5"
        />
      ))}

      {/* Center (AjoAI) */}
      <circle
        cx={centerX}
        cy={centerY}
        r="25"
        fill="url(#center-glow)"
        filter="url(#glow)"
      >
        <animate
          attributeName="r"
          values="25;27;25"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFF"
        fontSize="14"
        fontWeight="bold"
      >
        AjoAI
      </text>

      {/* Planets */}
      {planets.map((planet, index) => {
        const orbit = orbits[planet.orbitIndex];
        const Icon = planet.icon;
        return (
          <g key={planet.name}>
            <circle r="15" fill={planet.color} filter="url(#glow)">
              <animateMotion
                dur={`${orbit.duration}s`}
                repeatCount="indefinite"
                path={getOrbitPath(orbit)}
              />
            </circle>

            <text textAnchor="middle" fill="#FFF" fontSize="10" dy="-20">
              {planet.name}
              <animateMotion
                dur={`${orbit.duration}s`}
                repeatCount="indefinite"
                path={getOrbitPath(orbit)}
              />
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const Section = ({ children, id }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
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

export default function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", transition: "0.5s" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D0D] text-gray-300 font-sans">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between fixed w-full bg-[#0D0D0D] z-50">
        <Link
          className="flex items-center justify-center"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/replicate-prediction-40amy9z6csrm00chsnab9krak8-gCx2rqCHN358Kx61BOUMRvdexlpfRq.jpg"
            alt="AjoAI Logo"
            preview={false}
            width={40}
            height={40}
            className="mr-2"
            style={{ borderRadius: "50%" }}
          />
          <span
            className="text-2xl font-bold text-white"
            style={{ marginLeft: "10px", alignSelf: "normal" }}
          >
            AjoAI
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <button
            className="text-sm hover:text-white transition-colors"
            onClick={() => scrollToSection("universe")}
          >
            AjoAI Universe
          </button>
          <div className="relative group">
            <button
              className="text-sm hover:text-white transition-colors flex items-center"
              onClick={() => setIsProductsOpen(!isProductsOpen)}
            >
              AI Personalities
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isProductsOpen && (
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#1A1A1A] ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    onClick={() => navigate("/mira")}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2A2A2A] hover:text-white w-full text-left"
                  >
                    Mira
                  </button>
                  <button
                    onClick={() => navigate("/sara")}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2A2A2A] hover:text-white w-full text-left"
                  >
                    Sara
                  </button>
                  <button
                    onClick={() => navigate("/dheera")}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2A2A2A] hover:text-white w-full text-left"
                  >
                    Dheera
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            className="text-sm hover:text-white transition-colors"
            onClick={() => scrollToSection("principles")}
          >
            Our Principles
          </button>
          <button
            className="text-sm hover:text-white transition-colors"
            onClick={() => scrollToSection("roadmap")}
          >
            Roadmap
          </button>
          <button
            className="text-sm hover:text-white transition-colors"
            onClick={() => scrollToSection("careers")}
          >
            Careers
          </button>
          <button
            className="text-sm hover:text-white transition-colors"
            onClick={() => scrollToSection("contact")}
          >
            Contact Us
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
        <div className="md:hidden bg-[#1A1A1A] p-4 fixed top-16 left-0 right-0 z-40">
          <nav className="flex flex-col gap-4">
            <button
              className="text-sm hover:text-white transition-colors"
              onClick={() => {
                scrollToSection("universe");
                setIsMenuOpen(false);
              }}
            >
              AjoAI Universe
            </button>
            <button
              className="text-sm hover:text-white transition-colors flex items-center justify-between"
              onClick={() => {
                console.log(isProductsOpen);
                setIsProductsOpen(!isProductsOpen);
              }}
            >
              AI Personalities
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isProductsOpen && (
              <div className="pl-4">
                <button
                  onClick={() => {
                    navigate("/mira");
                    setIsMenuOpen(false);
                  }}
                  className="block py-2 text-sm text-gray-300 hover:text-white w-full text-left"
                >
                  Mira
                </button>
                <button
                  onClick={() => {
                    navigate("/sara");
                    setIsMenuOpen(false);
                  }}
                  className="block py-2 text-sm text-gray-300 hover:text-white w-full text-left"
                >
                  Sara
                </button>
                <button
                  onClick={() => {
                    navigate("/dheera");
                    setIsMenuOpen(false);
                  }}
                  className="block py-2 text-sm text-gray-300 hover:text-white w-full text-left"
                >
                  Dheera
                </button>
              </div>
            )}
            <button
              className="text-sm hover:text-white transition-colors"
              onClick={() => {
                scrollToSection("principles");
                setIsMenuOpen(false);
              }}
            >
              Our Principles
            </button>
            <button
              className="text-sm hover:text-white transition-colors"
              onClick={() => {
                scrollToSection("roadmap");
                setIsMenuOpen(false);
              }}
            >
              Roadmap
            </button>
            <button
              className="text-sm hover:text-white transition-colors"
              onClick={() => {
                scrollToSection("careers");
                setIsMenuOpen(false);
              }}
            >
              Careers
            </button>
            <button
              className="text-sm hover:text-white transition-colors"
              onClick={() => {
                scrollToSection("contact");
                setIsMenuOpen(false);
              }}
            >
              Contact Us
            </button>
          </nav>
        </div>
      )}
      <main className="flex-1 pt-16">
        <Section id="hero">
          <div className="w-full py-12 md:py-24 lg:py-32 xl:py-35">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="flex flex-col items-center space-y-4 text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#FFC0CB] to-[#E6E6FA]">
                  Welcome to the AjoAI Universe
                </h1>
                <p className="max-w-[700px] text-gray-400 text-sm sm:text-base md:text-lg">
                  Explore a new dimension of artificial intelligence where
                  human-centered AI personalities coexist to improve lives and
                  shape a smarter, healthier future.
                </p>
                <div className="w-full max-w-md">{<AjoAIUniverse />}</div>
                <Button
                  className="bg-white text-black hover:bg-gray-200"
                  onClick={() => scrollToSection("universe")}
                >
                  <div
                    style={{
                      padding: "10px 10px",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Explore the Universe
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </Section>

        <Section id="universe">
          <div className="w-full py-12 md:py-24 lg:py-32 bg-[#0F0F0F]">
            <div className="container px-4 md:px-6 mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#FFC0CB] to-[#E6E6FA]">
                The AjoAI Universe
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-[#1A1A1A] p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Interconnected AI Ecosystem
                  </h3>
                  <p className="text-gray-400">
                    Our AI personalities work in harmony, creating a synergistic
                    environment that adapts to your needs across various aspects
                    of life.
                  </p>
                </div>
                <div className="bg-[#1A1A1A] p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Ethical AI Development
                  </h3>
                  <p className="text-gray-400">
                    We prioritize responsible AI creation, ensuring our
                    personalities adhere to strict ethical guidelines and
                    promote positive societal impact.
                  </p>
                </div>
                <div className="bg-[#1A1A1A] p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Continuous Evolution
                  </h3>
                  <p className="text-gray-400">
                    The AjoAI Universe is ever-expanding, with new personalities
                    and capabilities being developed to address emerging
                    challenges and opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="personalities">
          <div className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6 mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#FFC0CB] to-[#E6E6FA]">
                Our AI Personalities
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div
                  id="mira"
                  className="flex flex-col items-center space-y-4 p-6 bg-[#1A1A1A] rounded-lg"
                >
                  <Heart className="h-12 w-12 text-[#FFC0CB]" />
                  <h3 className="text-2xl font-bold text-white">
                    Mira: Your Mental Health Companion
                  </h3>
                  <p className="text-gray-400 text-center text-sm">
                    A compassionate AI designed to provide emotional support,
                    offer coping strategies, and guide you through your mental
                    health journey with empathy and understanding.
                  </p>
                </div>
                <div
                  id="sara"
                  className="flex flex-col items-center space-y-4 p-6 bg-[#1A1A1A] rounded-lg"
                >
                  <Book className="h-12 w-12 text-[#E6E6FA]" />
                  <h3 className="text-2xl font-bold text-white">
                    Sara: Your Personal AI Tutor
                  </h3>
                  <p className="text-gray-400 text-center text-sm">
                    An adaptive learning companion that tailors educational
                    content to your unique learning style, making complex
                    subjects accessible and enjoyable for learners of all ages.
                  </p>
                </div>
                <div
                  id="dheera"
                  className="flex flex-col items-center space-y-4 p-6 bg-[#1A1A1A] rounded-lg"
                >
                  <Sprout className="h-12 w-12 text-green-400" />
                  <h3 className="text-2xl font-bold text-white">
                    Dheera: Your Agriculture Copilot
                  </h3>
                  <p className="text-gray-400 text-center text-sm">
                    An innovative AI focused on sustainable farming practices,
                    offering personalized advice on crop management, resource
                    optimization, and eco-friendly agricultural techniques.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="principles">
          <div className="w-full py-12 md:py-24 lg:py-32 bg-[#0F0F0F]">
            <div className="container px-4 md:px-6 mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#FFC0CB] to-[#E6E6FA]">
                Our Guiding Principles
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-[#1A1A1A] p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Human-Centered Design
                  </h3>
                  <p className="text-gray-400">
                    We prioritize user needs and experiences in every aspect of
                    our AI development, ensuring our solutions are intuitive,
                    accessible, and truly beneficial.
                  </p>
                </div>
                <div className="bg-[#1A1A1A] p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Ethical AI
                  </h3>
                  <p className="text-gray-400">
                    Our AI adheres to strict ethical guidelines, promoting
                    fairness, transparency, and privacy in all interactions and
                    decision-making processes.
                  </p>
                </div>
                <div className="bg-[#1A1A1A] p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Continuous Learning
                  </h3>
                  <p className="text-gray-400">
                    We're committed to ongoing research and development,
                    constantly improving our AI to better serve humanity's
                    evolving needs.
                  </p>
                </div>
                <div className="bg-[#1A1A1A] p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Empowering Independence
                  </h3>
                  <p className="text-gray-400">
                    Our AI is designed to enhance human capabilities, not
                    replace them, fostering personal growth and self-reliance.
                  </p>
                </div>
                <div className="bg-[#1A1A1A] p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Inclusive Design
                  </h3>
                  <p className="text-gray-400">
                    We strive to create AI solutions that are accessible and
                    beneficial to people of all backgrounds, abilities, and
                    circumstances.
                  </p>
                </div>
                <div className="bg-[#1A1A1A] p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Environmental Responsibility
                  </h3>
                  <p className="text-gray-400">
                    Our AI development processes and applications are designed
                    with sustainability in mind, minimizing environmental
                    impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="roadmap">
          <div className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6 mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#FFC0CB] to-[#E6E6FA]">
                AjoAI Universe Roadmap
              </h2>
              <div className="relative">
                <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-[#FFC0CB] to-[#E6E6FA]"></div>
                <div className="space-y-12">
                  <div className="relative flex flex-col md:flex-row md:items-center">
                    <div className="flex-1 md:text-right md:pr-8">
                      <h3 className="text-lg font-bold text-white">
                        2022: Mira's Conception
                      </h3>
                      <p className="text-gray-400 text-sm">
                        The idea for Mira, our mental health AI personality, is
                        born
                      </p>
                    </div>
                    <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 rounded-full bg-[#FFC0CB] transform -translate-x-1/2 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <div className="flex-1 md:pl-8 mt-4 md:mt-0"></div>
                  </div>
                  <div className="relative flex flex-col md:flex-row md:items-center">
                    <div className="flex-1 md:text-right md:pr-8"></div>
                    <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 rounded-full bg-[#E6E6FA] transform -translate-x-1/2 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <div className="flex-1 md:pl-8">
                      <h3 className="text-lg font-bold text-white">
                        August 2024: AjoAI's Official Launch
                      </h3>
                      <p className="text-gray-400 text-sm">
                        AjoAI Technologies Pvt Ltd is officially established
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col md:flex-row md:items-center">
                    <div className="flex-1 md:text-right md:pr-8">
                      <h3 className="text-lg font-bold text-white">
                        Q4 2024: Mira's Debut
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Launch of Mira, our mental health AI personality
                      </p>
                    </div>
                    <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 rounded-full bg-green-400 transform -translate-x-1/2 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <div className="flex-1 md:pl-8 mt-4 md:mt-0"></div>
                  </div>
                  <div className="relative flex flex-col md:flex-row md:items-center">
                    <div className="flex-1 md:text-right md:pr-8"></div>
                    <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 rounded-full bg-yellow-400 transform -translate-x-1/2 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <div className="flex-1 md:pl-8">
                      <h3 className="text-lg font-bold text-white">
                        2025: Expanding the AjoAI Universe
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Introduction of Sara and development of Dheera begins
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="careers">
          <div className="w-full py-12 md:py-24 lg:py-32 bg-[#0F0F0F]">
            <div className="container px-4 md:px-6 mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#FFC0CB] to-[#E6E6FA]">
                Join Our Team
              </h2>
              <p className="text-center text-gray-400 mb-8 max-w-[700px] mx-auto">
                We're always looking for passionate innovators to join our
                mission of creating AI personalities that improve lives. If
                you're excited about shaping the future of AI, check out our
                open positions.
              </p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  "AI Engineer",
                  "UX Designer",
                  "Data Scientist",
                  "Product Manager",
                  "Machine Learning Researcher",
                  "Full Stack Developer",
                ].map((position) => (
                  <div key={position} className="bg-[#1A1A1A] p-6 rounded-lg">
                    <Briefcase className="h-8 w-8 mb-4 text-[#FFC0CB]" />
                    <h3 className="text-lg font-bold text-white mb-2">
                      {position}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm">
                      Join us in creating the next generation of AI
                      personalities.
                    </p>
                    <Button className="bg-white text-black hover:bg-gray-200">
                      Apply Now
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="contact">
          <div className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6 mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#FFC0CB] to-[#E6E6FA]">
                Join the AjoAI Universe
              </h2>
              <div className="mx-auto max-w-[500px]">
                <form className="space-y-4">
                  <Input
                    className="bg-[#1A1A1A] text-white"
                    placeholder="Your Name"
                    type="text"
                  />
                  <Input
                    className="bg-[#1A1A1A] text-white"
                    placeholder="Your Email"
                    type="email"
                  />
                  <textarea
                    className="w-full h-32 px-3 py-2 text-white bg-[#1A1A1A] rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
                    placeholder="Your Message"
                  ></textarea>
                  <Button className="w-full bg-white text-black hover:bg-gray-200">
                    Connect with Us
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700">
        <p className="text-xs text-gray-400">
          © 2024 AjoAI Technologies Pvt Ltd. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-white"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-white"
            href="#"
          >
            Privacy Policy
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-white"
            href="#"
          >
            Ethics Statement
          </Link>
        </nav>
      </footer>
    </div>
  );
}
