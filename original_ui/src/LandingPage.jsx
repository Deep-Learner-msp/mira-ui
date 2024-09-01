import { useState, useRef } from "react";
import { Button, Input, Image } from "antd";
import { motion } from "framer-motion";
import {
  LinkedinIcon,
  MailIcon,
  MicIcon,
  HeadphonesIcon,
  BarChartIcon,
  BrainIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { ConfigProvider, Space } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { css } from "@emotion/css";

const { TextArea } = Input;

function LandingPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const linearGradientButton = css`
    &.${rootPrefixCls}-btn-primary:not([disabled]):not(
        .${rootPrefixCls}-btn-dangerous
      ) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { name, email, message });
    setName("");
    setEmail("");
    setMessage("");
  };

  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center fixed w-full bg-white dark:bg-gray-800 z-50">
        <a className="flex items-center justify-center" href="#">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/replicate-prediction-zvcxybjqt1rm20chek8asmwxt8-K19ZQkql8f2cRM4idKyBtaH3JMoNPV.webp"
            alt="Mira Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="ml-2 text-lg font-semibold">Mira</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <button
            className="text-sm font-medium hover:underline underline-offset-4"
            onClick={() => scrollToSection(featuresRef)}
          >
            Features
          </button>
          <button
            className="text-sm font-medium hover:underline underline-offset-4"
            onClick={() => scrollToSection(aboutRef)}
          >
            About
          </button>
          <button
            className="text-sm font-medium hover:underline underline-offset-4"
            onClick={() => scrollToSection(contactRef)}
          >
            Contact
          </button>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="https://www.linkedin.com/in/phani-ajoai/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon className="h-4 w-4" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="mailto:phani@ajoai.com?subject=Inquiry%20from%20Landing%20Page&body=Hello%20Mira%20Team,%0A%0A"
          >
            <MailIcon className="h-4 w-4" />
            <span className="sr-only">Email</span>
          </a>
        </nav>
      </header>
      <main className="flex-1 mt-14">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-38 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/replicate-prediction-zvcxybjqt1rm20chek8asmwxt8-K19ZQkql8f2cRM4idKyBtaH3JMoNPV.webp"
                alt="Mira Logo"
                width={150}
                height={150}
                className="rounded-full"
              />
            </motion.div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Meet Mira: Your Mental Wellness Companion
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Discover peace of mind with Mira, your personal AI-powered
                meditation guide and mental health assistant.
              </p>
            </div>
            <div className="space-x-4 mt-4">
              <ConfigProvider
                button={{
                  className: linearGradientButton,
                }}
              >
                <Button variant="outline">
                  <Link to="/mira">Get Started</Link>
                </Button>
                <Button
                 type="primary" className="text-white"
                  variant="outline"
                  onClick={() => scrollToSection(featuresRef)}
                >
                  Learn More
                </Button>
              </ConfigProvider>
            </div>
          </div>
        </section>
        <section
          ref={featuresRef}
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-12">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <motion.div
                className="flex flex-col items-center space-y-3 text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MicIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">
                  Intelligent Speech Companion
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Engage in natural conversations with Mira for support and
                  guidance.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center space-y-3 text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <HeadphonesIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Guided Meditations</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Access a library of personalized meditation sessions led by
                  Mira.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center space-y-3 text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <BarChartIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Mood Tracking</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Monitor your emotional well-being with intuitive mood tracking
                  tools.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        <section
          ref={aboutRef}
          className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center"
        >
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Meet Your AI Companion
              </h2>
              <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Mira is more than just an app – it's your personal mental
                wellness companion. Using advanced AI, Mira understands your
                needs and provides tailored support through natural
                conversations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center justify-center lg:justify-start">
                  <BrainIcon className="h-5 w-5 mr-2 text-primary" />
                  <span>Personalized mental health insights</span>
                </li>
                <li className="flex items-center justify-center lg:justify-start">
                  <HeadphonesIcon className="h-5 w-5 mr-2 text-primary" />
                  <span>24/7 emotional support</span>
                </li>
                <li className="flex items-center justify-center lg:justify-start">
                  <BarChartIcon className="h-5 w-5 mr-2 text-primary" />
                  <span>Progress tracking and goal setting</span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/replicate-prediction-zvcxybjqt1rm20chek8asmwxt8-K19ZQkql8f2cRM4idKyBtaH3JMoNPV.webp"
                  alt="Mira AI Companion"
                  width={300}
                  height={300}
                  className="rounded-full shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Experience Mira in Action
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div
                className="bg-[#1a237e] rounded-lg shadow-lg p-4 max-w-sm mx-auto"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/replicate-prediction-zvcxybjqt1rm20chek8asmwxt8-K19ZQkql8f2cRM4idKyBtaH3JMoNPV.webp"
                      alt="Mira AI"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <span className="font-semibold text-white">Mira</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white"
                    type="link"
                  >
                    Add a therapist
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-[#3949ab] rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm text-white">
                        I'm feeling anxious about my upcoming presentation.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">
                        It's normal to feel anxious. Let's try a quick breathing
                        exercise to calm your nerves. Take a deep breath in for
                        4 counts, hold for 4, and exhale for 4. Repeat this 3
                        times.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-[#3949ab] rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm text-white">
                        That helped a bit. How can I improve my self-confidence
                        for the presentation?
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">
                        Great question! Here are a few tips: 1. Practice your
                        presentation multiple times 2. Visualize a successful
                        outcome 3. Use positive self-talk 4. Remember your
                        audience wants you to succeed Would you like to explore
                        any of these further?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <Input
                    className="flex-grow mr-2 bg-white"
                    placeholder="Type your message..."
                  />
                  <Button size="icon" variant="ghost" type="link">
                    <MicIcon className="h-4 w-4 text-white" />
                    <span className="sr-only">Voice input</span>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                className="bg-[#1a237e] rounded-lg shadow-lg p-4 max-w-sm mx-auto"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/replicate-prediction-zvcxybjqt1rm20chek8asmwxt8-K19ZQkql8f2cRM4idKyBtaH3JMoNPV.webp"
                      alt="Mira AI"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <span className="font-semibold text-white">Mira</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white"
                    type="link"
                  >
                    Add a therapist
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-[#3949ab] rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm text-white">
                        I'm having trouble sleeping lately.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">
                        I'm sorry to hear that. Sleep issues can be frustrating.
                        Let's start with some basics: 1. Establish a consistent
                        sleep schedule 2. Create a relaxing bedtime routine 3.
                        Avoid screens 1 hour before bed 4. Keep your bedroom
                        cool and dark Would you like a guided relaxation
                        exercise to help you fall asleep?
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-[#3949ab] rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm text-white">
                        Yes, I'd like to try the relaxation exercise.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">
                        Great! Let's begin with a simple body scan meditation.
                        Find a comfortable position and close your eyes. We'll
                        start from your toes and work our way up, relaxing each
                        part of your body...
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <Input
                    className="flex-grow mr-2 bg-white"
                    placeholder="Type your message..."
                  />
                  <Button size="icon" variant="ghost" type="link">
                    <MicIcon className="h-4 w-4 text-white" />
                    <span className="sr-only">Voice input</span>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900 flex items-center justify-center"
          ref={contactRef}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Join Our Waitlist
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Be among the first to experience Mira. Sign up for our
                  waitlist and get early access to our revolutionary mental
                  wellness companion.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="grid gap-4" onSubmit={handleSubmit}>
                  <div className="grid gap-2">
                    <div htmlFor="name">Name</div>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div htmlFor="email">Email</div>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div htmlFor="message">Message (Optional)</div>
                    <TextArea
                      id="message"
                      placeholder="Tell us why you're excited about Mira"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <Button type="submit">Join Waitlist</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-4 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <div className="container px-4 md:px-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Mira. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
