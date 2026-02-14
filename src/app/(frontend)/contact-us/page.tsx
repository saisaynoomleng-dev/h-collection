import ContactForm from '@/components/features/ContactForm';
import Mapbox from '@/components/features/Mapbox';
import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
  BsYoutube,
} from 'react-icons/bs';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Need assistance? Contact the H-Collections team at 513-474-2282 or visit us in Cincinnati. We’re here to help with orders, styling, and inquiries.',
};

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

const ContactUsPage = () => {
  return (
    <Bounded isPadded className="grid md:grid-cols-2 md:gap-x-3">
      <PageTitle className="col-span-full">Get In touch</PageTitle>
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-col">
          <p>We&apos;re willing to work with you!</p>
          <p className="text-fs-300 italic text-brand-black/70">
            Your email address will not be published. Required fields are marked
            as <span className="text-red-500">*</span>
          </p>
        </div>

        <ContactForm />
      </div>

      <div className="space-y-5 md:space-y-10 bg-brand-rose p-3">
        <div className="flex flex-col gap-y-2">
          <h3 className="font-medium text-fs-500">Address</h3>
          <address>
            <p>7860 Beechmont Ave, Cincinnati,</p>
            <p>OH, 45255.</p>
          </address>
        </div>

        <div className="flex flex-col gap-y-2">
          <h3 className="font-medium text-fs-500">Contact</h3>
          <address>
            <p>(513) 474 2282</p>
            <p>support@hcollection.com</p>
          </address>
        </div>

        <div className="flex flex-col gap-y-2">
          <h3 className="font-medium text-fs-500">Opening Time</h3>
          <address>
            <p>Monday - Friday: 10:00am - 7:00pm</p>
            <p>Saturday - Sunday: 10:00am - 10:00pm</p>
          </address>
        </div>

        <div className="flex flex-col gap-y-4">
          <h3 className="font-medium text-fs-500">Stay Connected</h3>
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
      </div>

      <div className="col-span-full overflow-hidden pb-10">
        <Mapbox />
      </div>
    </Bounded>
  );
};

export default ContactUsPage;
