import { Link } from 'react-router-dom';
import { LogoMark } from './Navbar';
import { MessageSquare, Camera, Briefcase, Mail } from 'lucide-react';

const footerColumns = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'For Landlords', href: '/for-landlords' },
      { label: 'For Tenants', href: '/for-tenants' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'How It Works', href: '/how-it-works' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
    ],
  },
];

const socials = [
  { icon: MessageSquare, label: 'Twitter', href: '#' },
  { icon: Camera, label: 'Instagram', href: '#' },
  { icon: Briefcase, label: 'LinkedIn', href: '#' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@rentflow.ng' },
];

/**
 * Marketing footer with sitemap columns, social links and newsletter input.
 */
const Footer = () => (
  <footer className="bg-charcoal text-sidebar-text" role="contentinfo">
    <div className="max-w-marketing mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
        {/* Brand column */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2.5 mb-4" aria-label="RentFlow homepage">
            <LogoMark />
            <span className="font-display font-bold text-xl text-white">RentFlow</span>
          </Link>
          <p className="text-sm text-sidebar-text/70 leading-relaxed max-w-xs">
            Rent, finally organized. The rental management platform built for landlords and
            tenants across Africa.
          </p>

          {/* Newsletter */}
          <div className="mt-6">
            <p className="text-sm font-medium text-sidebar-text mb-2">Get rental tips in your inbox</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address"
                className="flex-1 h-10 px-3 text-sm bg-white/10 border border-white/20 rounded text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <button
                type="submit"
                className="h-10 px-4 bg-accent text-white text-sm font-medium rounded hover:bg-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Sitemap columns */}
        {footerColumns.map((col) => (
          <div key={col.heading}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-sidebar-text/50 mb-4">
              {col.heading}
            </h3>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-sidebar-text/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </div>
  </footer>
);

export default Footer;
