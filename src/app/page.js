'use client';
import { supabase } from '../lib/supabaseClient';
import { useState, useMemo, useEffect } from 'react';
import StaticStar from '../components/StaticStar';

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
          <h1 className="text-[50px] text-white font-bold text-center sm:text-[70px]">Hi, I'm Jeremiah!</h1>
          <h2 className="text-[25px] mt-6 mb-6 text-center">
            Turning Ideas into Websites, Systems, and Solutions
          </h2>
          <div className="flex gap-4 mt-4 w-full max-w-md">
            <button
              className="flex-1 px-4 py-2 bg-white text-black rounded-md hover:bg-gray-300 transition font-bold text-sm"
              onClick={() =>
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Contact Me
            </button>
            <button
              onClick={() => window.open('https://www.linkedin.com/in/jeremiah-franco/', '_blank')}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-bold text-sm"
            >
              LinkedIn
            </button>
            <button
              onClick={() => window.open('https://github.com/jerfranco', '_blank')}
              className="flex-1 px-4 py-2 bg-[#6E5494] text-white rounded-md hover:bg-[#6E5494]/80 transition font-bold text-sm"
            >
              Github
            </button>
          </div>

        </div>

        {/*ABOUT ME SECTION */}
        <div className="min-h-screen flex flex-col justify-center">
          <h1 className="text-[50px] font-bold border-b border-b-white">About Me</h1>
          
        </div>

        {/* PROJECTS SECTION */}
        <div id="project" className="min-h-screen flex flex-col justify-center">
          <h1 className="text-[50px] font-bold border-b border-b-white">Projects</h1>
            <h2 className="mt-6 text-xl font-bold">REC Services</h2>
              <p className="italic mb-4">
                Brigham Young University - Idaho / Apr 2025 - August 2025
              </p>
              <ul className="list-disc pl-6">
                <li>
                  Developed a comprehensive web application for managing service requests,
                  technician assignments, and customer communications for REC Services department at Brigham
                  Young University - Idaho
                </li>
                <li>
                  Implemented real-time notifications and reporting features to enhance user experience
                  and operational efficiency
                </li>
              </ul>
            <h2 className="mt-6 text-xl font-bold">Movie Web Finder</h2>
              <p className="italic mb-4">Brigham Young University - Idaho / Jan 2025 - Apr 2025</p>
              <ul className="list-disc pl-6">
                <li>
                  Built a full-stack movie discovery app using Svelte and Supabase, tested by over 100 users
                </li>
                <li>
                  Fetched movie data from an external API to enable search and display for 500,000+ movie titles
                </li>
                <li>
                  Developed a user authentication system with Supabase, supporting secure login and session tracking for 100+
                  registered users
                </li>
              </ul>
            <h2 className="mt-6 text-xl font-bold">Scholar Manager</h2>
              <p className="italic mb-4">Brigham Young University - Idaho / Sept 2024 - Dec 2024</p>
              <ul className="list-disc pl-6">
                <li>
                  Designed and developed a full-stack web application using Node.js and MongoDB to help college students track and
                  manage personal finances
                </li>
                <li>
                  Implemented user authentication, data validation, and error handling to assure secure and accurate data
                  management
                </li>
                <li>
                  Integrated MongoDB to store and organize user data, facilitating real-time tracking of income and expenses for
                  more than 500 college students
                </li>
              </ul>
            <h2 className="mt-6 text-xl font-bold">Network Design II</h2>
              <p className="italic mb-4">Brigham Young University - Idaho / Jan 2024 - Apr 2024</p>
              <ul className="list-disc pl-6">
                <li>
                  Configured Cisco routers and switches with VLANs, DHCP, and OSPF areas to support branch network
                  connectivity and segment traffic efficiently
                </li>
                <li>
                  Installed and secured LAN and WAN infrastructure following best practices, including port security and
                  basic network hardening techniques
                </li>
                <li>
                  Maintained accurate documentation of device configurations using show run outputs for
                  troubleshooting, audits, and backup purposes
                </li>
                <li>
                  Applied networking concepts such as IPv4 addressing, NAT/PAT, and subnetting in real-world lab
                  scenarios under supervision of a Senior Network Engineer
                </li>
              </ul>
            <h2 className="mt-6 text-xl font-bold">Class Roulette</h2>
            <p className="italic mb-4">Brigham Young University - Idaho / Sept 2023 - Dec 2023</p>
            <ul className="list-disc pl-6">
              <li>
                Collaborated with a team of 6 to develop a web application helps teachers store class information and randomly
                select students with a single click
              </li>
              <li>
                Influenced development of front-end interface, enhancing user experience and making student selection process
                quick and intuitive
              </li>
              <li>
                Cooperated closely with team to ensure proper integration between front-end and data handling logic, resulting in
                smooth and reliable application performance
              </li>
            </ul>
        </div>

        {/* CONTACT FORM SECTION */}
        <section id="contact-form" className="z-20 min-h-screen flex flex-col items-center justify-center px-4">
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
