'use client';
import { supabase } from '../lib/supabaseClient';
import { useState, useMemo, useEffect } from 'react';
import StaticStar from '../components/StaticStar';
import { projects } from '@/data/project';
import Projects from '../components/Projects';

export default function Home() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const generateStars = (count) =>
    Array.from({ length: count }).map((_, i) => ({
      key: i,
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      },
    }));

  const stars = useMemo(() => generateStars(150), []);

  useEffect(() => {
    const handleScroll = () => {
      const fadeDistance = window.innerHeight * 0.8;
      const newOpacity = Math.max(0, 1 - window.scrollY / fadeDistance);
      setOpacity(newOpacity);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !username) return;

    const { data, error } = await supabase
      .from('contact')
      .insert([{ email, username, message }]);

    if (error) {
      console.error('Error saving email:', error);
      return;
    }
    setSubmitted(true);
    setEmail('');
    setUsername('');
    setMessage('');
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black overflow-hidden -z-10 pointer-events-none">
        <div className="w-[200%] h-full flex animate-drift">
          <div className="relative w-1/2 h-full">
            {stars.map(({ key, style }) => (
              <StaticStar key={`a-${key}`} style={style} />
            ))}
          </div>
          <div className="relative w-1/2 h-full">
            {stars.map(({ key, style }) => (
              <StaticStar key={`b-${key}`} style={style} />
            ))}
          </div>
        </div>00
      </div>

      <main className="relative z-10 mx-4 sm:mx-8 lg:mx-32 xl:mx-64">

        {/* INTRO SECTION with fade */}
        <div
          className="h-screen flex flex-col items-center justify-center sticky top-0"
          style={{
            opacity,
            transform: `scale(${0.9 + opacity * 0.1})`,
            transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
            pointerEvents: opacity === 0 ? 'none' : 'auto',
            visibility: opacity === 0 ? 'hidden' : 'visible',
          }}
        >
          <h1 className="text-[44px] text-white font-bold text-center sm:text-[70px]">Hi, I'm Jeremiah!</h1>
          <h2 className="text-[25px] mt-6 mb-6 text-center sm:text-[30px]">
            <span className="block sm:inline">Turning Ideas into </span>
            <span className="block sm:inline">Websites, Systems, and Solutions</span>
          </h2>
          <div className="flex gap-4 mt-4 w-full max-w-md">
            <button
              className="flex-1 px-4 py-2 bg-white text-black rounded-md hover:bg-gray-300 transition font-bold text-[12px] sm:text-[16px]"
              onClick={() =>
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Contact Me
            </button>
            <button
              onClick={() => window.open('https://www.linkedin.com/in/jeremiah-franco/', '_blank')}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-bold text-[12px] sm:text-[16px]"
            >
              LinkedIn
            </button>
            <button
              onClick={() => window.open('https://github.com/jerfranco', '_blank')}
              className="flex-1 px-4 py-2 bg-[#6E5494] text-white rounded-md hover:bg-[#6E5494]/80 transition font-bold text-[12px] sm:text-[16px]"
            >
              Github
            </button>
          </div>

        </div>

        {/*ABOUT ME SECTION */}
        {/* <div className="min-h-screen flex flex-col justify-center">
          <h1 className="text-[30px] sm:text-[50px] font-bold border-b border-b-white">About Me</h1>
          
        </div> */}

        {/* PROJECTS SECTION */}
        <div id="project" className="min-h-screen flex flex-col justify-center">
          <h1 className="text-[30px] sm:text-[50px] font-bold border-b border-b-white mb-4">
          Projects
        </h1>
        <Projects projects={projects} />
        </div>

        {/* CONTACT FORM SECTION */}
        <section id="contact-form" className="z-20 min-h-screen flex flex-col items-center justify-center px-4">
          <h1 className="text-[30px] sm:text-[50px] font-bold">Contact Me</h1>
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded shadow-md w-full max-w-md"
          >
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-white mb-4 text-white bg-transparent border-t-0 border-l-0 border-r-0"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-white mb-4 text-white bg-transparent border-t-0 border-l-0 border-r-0"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message..."
              className="w-full px-4 py-2 border border-white mb-4 text-white bg-transparent border-t-0 border-l-0 border-r-0"
              rows={4}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-2/4 mx-auto bg-white text-black py-2 rounded hover:bg-gray-200 transition"
              >
                Submit
              </button>
            </div>
            {submitted && (
              <p className="mt-4 text-green-600 font-medium">Thanks! I'll be in touch soon.</p>
            )}
          </form>
        </section>
      </main>
    </>
  );
}
