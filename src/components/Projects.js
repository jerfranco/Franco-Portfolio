'use client';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react'; // npm install lucide-react

export default function ProjectsAccordion({ projects }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleProject = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {projects.map((project, index) => (
        <div key={index} className=" py-3">
          {/* Header row */}
          <div
            className="flex justify-between items-center cursor-pointer sm:cursor-default"
            onClick={() => toggleProject(index)}
          >
            <h2 className="text-xl font-bold">{project.title}</h2>
            <span className="sm:hidden">
              {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
            </span>
          </div>

          {/* Content */}
          <div
            className={`
              overflow-hidden transition-all duration-300 
              ${openIndex === index ? 'max-h-screen' : 'max-h-0'} 
              sm:max-h-screen
            `}
          >
            <p className="italic mb-4">{project.date}</p>
            <ul className="list-disc pl-6">
              {project.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
