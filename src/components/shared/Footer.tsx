import Link from 'next/link';
import BrandLogo from './BrandLogo';
import NewsletterForm from '../features/NewsletterForm';
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
  BsYoutube,
} from 'react-icons/bs';

const PAGE_LINKS = [
  { name: 'Shop', url: '/shop' },
  { name: 'Contact Us', url: '/contact-us' },
  { name: 'FAQs', url: '/faq' },
  { name: 'About Us', url: '/about-us' },
  { name: 'Journal', url: '/blog' },
];

const SOCIAL_LINKS = [
  { name: 'Facebook', url: 'https://www.facebook.com', icon: <BsFacebook /> },
  { name: 'LinkedIn', url: 'https://www.linkedin.com', icon: <BsLinkedin /> },
  { name: 'YouTube', url: 'https://www.youtube.com', icon: <BsYoutube /> },
  { name: 'X', url: 'https://www.x.com', icon: <BsTwitterX /> },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com',
    icon: <BsInstagram />,
  },
];

const SUPPORT_LINKS = [
  { name: 'Career', url: '/career' },
  { name: 'Gift Card', url: '/buy-gift-card' },
  { name: 'Author', url: '/author' },
];

const UTILITY_LINKS = [
  { name: 'Accessiblity Accessment', url: '/accessibility-accessment' },
  { name: 'Payment Policy', url: '/payment-policy' },
  { name: 'Privacy Policy', url: '/privacy-policy' },
  { name: 'Return Policy', url: '/return-policy' },
  { name: 'Terms & Conditions', url: '/terms-and-conditions' },
];

const Footer = () => {
  return (
    <footer className="px-3 md:px-5 py-5 font-jost bg-brand-rose">
      <div className="lg:max-w-300 lg:mx-auto space-y-5 md:space-y-8">
        <div className="grid md:grid-cols-2 md:gap-x-5 gap-y-5">
          <div className="flex flex-col gap-y-3 flex-1">
            <Link href="/">
              <BrandLogo />
            </Link>
            <p className="text-fs-300 text-brand-black/60">
              At H-Collections, we believe fashion is an evolving dialogue. From
              our 7860 Beechmont Ave studio, our designers collaborate with
              world-renowned brands to bring you a collection that is as unique
              as the city we call home.
            </p>
            <div className="flex gap-x-3 items-center">
              {SOCIAL_LINKS.map((link) => (
                <Link
                  href={link.url}
                  key={link.name}
                  className="hover:text-brand-black/80"
                >
                  <span>{link.icon}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-y-5">
            <h3 className="font-semibold text-fs-500 text-center">
              Subscribe to our Newsletter
            </h3>
            <NewsletterForm />
          </div>
        </div>

        <div className="divider"></div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-5 justify-center">
          {/* company links */}
          <div className="flex flex-col gap-y-3">
            <h2 className="font-semibold">Company Links</h2>
            <ul className="flex flex-col gap-y-1 text-fs-300">
              {PAGE_LINKS.map((link) => (
                <Link
                  href={link.url}
                  key={link.url}
                  className="hover:text-brand-black/80 hover:underline"
                >
                  {link.name}
                </Link>
              ))}
            </ul>
          </div>

          {/* useful links */}
          <div className="flex flex-col gap-y-3">
            <h2 className="font-semibold">Useful Links</h2>
            <ul className="flex flex-col gap-y-1 text-fs-300">
              {SUPPORT_LINKS.map((link) => (
                <Link
                  href={link.url}
                  key={link.url}
                  className="hover:text-brand-black/80 hover:underline"
                >
                  {link.name}
                </Link>
              ))}
            </ul>
          </div>

          {/* info links */}
          <div className="flex flex-col gap-y-3">
            <h2 className="font-semibold">Our Information</h2>
            <ul className="flex flex-col gap-y-1 text-fs-300">
              {UTILITY_LINKS.map((link) => (
                <Link
                  href={link.url}
                  key={link.url}
                  className="hover:text-brand-black/80 hover:underline"
                >
                  {link.name}
                </Link>
              ))}
            </ul>
          </div>

          {/* contact info */}
          <div className="flex flex-col gap-y-3">
            <h2 className="font-semibold">Our Information</h2>

            <address className="flex flex-col gap-y-1 text-fs-300">
              <a
                href="https://maps.google.com/?q=7860 Beechmont Ave, Cincinnati, OH 45255"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                7860 Beechmont Ave, Cincinnati, OH, 45255.
              </a>

              <Link href="tel:+15134742282" className="hover:underline">
                (513) 474 2282
              </Link>
              <Link
                href="mailto:support@hcollection.com"
                className="hover:underline"
              >
                support@hcollection.com
              </Link>
            </address>
          </div>
        </div>

        <div className="divider"></div>

        <div className="flex justify-between items-center text-fs-300">
          <p>
            copyright&copy;{new Date().getFullYear() - 1}-
            {new Date().getFullYear()} H Collection.{' '}
          </p>
          <p>Designed and Developed by Sai Say Noom Leng</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
