import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';

const socialLinks = [
  {
    icon: <Github className="w-5 h-5" />,
    href: 'https://github.com/amoditjha',
    label: 'GitHub'
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: 'www.linkedin.com/in/amoditjha',
    label: 'LinkedIn'
  },
  {
    icon: <Instagram className="w-5 h-5" />,
    href: 'https://instagram.com/amoditjha',
    label: 'Instagram'
  }
];

export const Footer: React.FC = () => {
  return (
    <footer className="bottom-0 left-0 right-0 p-4 max-w-2xl rounded-xl mt-6 glass">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-80">
        <div className="text-text-primary text-sm">
          © {new Date().getFullYear()} Weather Dashboard. Created by Amodit.
        </div>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary hover:text-primary-light transition-colors duration-300"
              aria-label={label}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};