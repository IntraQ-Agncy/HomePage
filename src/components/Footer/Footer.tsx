import React from 'react';
import { Bot, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  // Newsletter removed

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Integrations', href: '#' },
      { label: 'API Documentation', href: '#' },
      { label: 'Changelog', href: '#' }
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Careers', href: '#' },
      { label: 'Press Kit', href: '#' },
      { label: 'Partners', href: '#' },
      { label: 'Contact', href: '#contact' }
    ],
    resources: [
      { label: 'Help Center', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Case Studies', href: '#' },
      { label: 'Webinars', href: '#' },
      { label: 'Community', href: '#' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'GDPR', href: '#' },
      { label: 'Security', href: '#' }
    ]
  };

  return (
    <footer id="contact" className="bg-gray-900 dark:bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Company Info & Newsletter */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Bot className="h-8 w-8 text-blue-400" />
                              <span className="text-2xl font-bold">intraQ</span>
            </div>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Transform your business with intelligent AI automation. Join multiple companies
              already saving time, reducing costs, and accelerating growth with our platform.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
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

            
          </div>

          {/* Right Column intentionally left minimal */}
          <div></div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => link.href.startsWith('#') ? scrollToSection(link.href) : window.open(link.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => link.href.startsWith('#') ? scrollToSection(link.href) : window.open(link.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => window.open(link.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => window.open(link.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="text-gray-400 text-sm">
            © 2025 intraQ. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <span>SOC 2 Compliant</span>
            <span>•</span>
            <span>GDPR Ready</span>
            <span>•</span>
            <span>99.9% Uptime SLA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;