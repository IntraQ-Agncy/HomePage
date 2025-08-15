import React from 'react';
import { Bot, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  // Newsletter and link lists removed

  return (
    <footer id="contact" className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold">IntraQ</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-400" />
              <span className="text-gray-300">intraqagncy@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-blue-400" />
              <span className="text-gray-300">Coming Soon</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-blue-400" />
              <span className="text-gray-300">Delhi, India</span>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-gray-400 text-sm">© 2025 IntraQ. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;