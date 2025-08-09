'use client';
import { supabase } from '../lib/supabaseClient';
import { useState, useMemo, useEffect } from 'react';
import StaticStar from '../components/StaticStar';

export default function Home() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !username) {
      console.warn('Missing email/name');
      return;
    }
  
    const { data, error } = await supabase
      .from('contact')
      .insert([{ email, username, message }]);
  
    if (error) {
      console.error('Error saving email:', error);
      return;
    }
  
    console.log('Email saved:', data);
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
      <main className="relative z-10">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-[70px] text-white font-bold">Hi, I'm Jeremiah!</h1>
          <h2 className="text-[30px] mt-6 mb-6">
            Turning Ideas into Websites, Systems, and Solutions
          </h2>
          <button
            className="mt-4 px-6 py-2 bg-white text-black rounded hover:bg-gray-200 transition font-bold"
            onClick={() =>
              document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Contact Me
          </button>
        </div>

        {/* Contact Form Section */}
        <div id="contact-form" className="min-h-screen flex flex-col items-center justify-center px-4">
          <h1 className="text-[40px]">Contact Me</h1>
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
                className="w-2/4 mx-auto bg-white text-black py-2 rounded hover:bg-gray-800 transition"
              >
                Submit
              </button>
            </div>
            {submitted && (
              <p className="mt-4 text-green-600 font-medium">Thanks! I'll be in touch soon.</p>
            )}
          </form>
        </div>

        <div className="h-screen flex items-center justify-center">
          <h2 className="text-[40px]">Projects</h2>
        </div>
      </main>
    </>
  );
}
