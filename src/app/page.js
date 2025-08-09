'use client';
import { supabase } from '../lib/supabaseClient';
import { useState, useMemo, useEffect } from 'react';
import StaticStar from '../components/StaticStar';

export default function Home() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [opacity, setOpacity] = useState(1); // 👈 for fade effect

  // ✅ Generate stars only once
  const generateStars = (count) =>
    Array.from({ length: count }).map((_, i) => ({
      key: i,
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      },
    }));

  const stars = useMemo(() => generateStars(150), []);

  // Fade effect on scroll
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
      {/* Fixed starfield background */}
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
        </div>
      </div>

      {/* Scrollable content */}
      <main className="relative z-10 mx-4 sm:mx-8 lg:mx-32 xl:mx-128">

        {/* INTRO SECTION with fade */}
        <div
          className="h-screen flex flex-col items-center justify-center sticky top-0"
          style={{
            opacity,
            transform: `scale(${0.9 + opacity * 0.1})`,
            transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
          }}
        >
          <h1 className="text-[70px] text-white font-bold text-center">Hi, I'm Jeremiah!</h1>
          <h2 className="text-[30px] mt-6 mb-6 text-center">
            Turning Ideas into Websites, Systems, and Solutions
          </h2>
          <div className="flex gap-4 mt-4 w-full max-w-md">
            <button
              className="flex-1 px-4 py-2 bg-white text-black rounded-md hover:bg-gray-300 transition font-bold"
              onClick={() =>
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Contact Me
            </button>
            <button
              onClick={() => window.open('https://www.linkedin.com/in/jeremiah-franco/', '_blank')}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-bold"
            >
              LinkedIn
            </button>
            <button
              onClick={() => window.open('https://github.com/jerfranco', '_blank')}
              className="flex-1 px-4 py-2 bg-[#6E5494] text-white rounded-md hover:bg-[#6E5494]/80 transition font-bold"
            >
              Github
            </button>
          </div>

        </div>

        {/* PROJECTS SECTION */}
        <section id="project" className="h-screen flex flex-col justify-center">
          <h1 className="text-[50px] font-bold border-b border-b-white">Projects</h1>
          <h2 className="mt-6 text-xl font-bold">REC Services</h2>
          <p className="italic mb-4">
            Brigham Young University - Idaho / Apr 2025 - August 2025
          </p>
          <ul className="list-disc pl-6">
            <li>
              Developed a comprehensive web application for managing service requests,
              technician assignments, and customer communications.
            </li>
            <li>
              Implemented real-time notifications and reporting features to enhance user experience
              and operational efficiency.
            </li>
          </ul>
          <h2 className="mt-6 text-xl font-bold">Movie Web Finder</h2>
          <p className="italic mb-4">Brigham Young University - Idaho / Apr 2025 - August 2025</p>
          <h2 className="mt-6 text-xl font-bold">Scholar Manager</h2>
          <p className="italic mb-4">Brigham Young University - Idaho / Apr 2025 - August 2025</p>
          <h2 className="mt-6 text-xl font-bold">Class Roulette</h2>
          <p className="italic mb-4">Brigham Young University - Idaho / Apr 2025 - August 2025</p>
          <h2 className="mt-6 text-xl font-bold">Network Design II</h2>
          <p className="italic mb-4">Brigham Young University - Idaho / Apr 2025 - August 2025</p>
        </section>

        {/* CONTACT FORM SECTION */}
        <section id="contact-form" className="min-h-screen flex flex-col items-center justify-center px-4">
          <h1 className="text-[50px] font-bold">Contact Me</h1>
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
