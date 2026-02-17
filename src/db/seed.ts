import db from '.';
import { CareerTable } from './schema';

const careers = [
  {
    position: 'Senior Fashion Designer',
    body: 'We are looking for a visionary Senior Fashion Designer to lead our seasonal collections. You will be responsible for conceptualizing designs, selecting high-quality fabrics, and overseeing the prototyping process. The ideal candidate has 7+ years of experience in luxury apparel and a deep understanding of garment construction and trend forecasting.',
  },
  {
    position: 'E-commerce Operations Manager',
    body: 'Join our digital team to streamline the customer journey. You will manage inventory levels, coordinate with logistics partners, and optimize the Shopify backend. Experience with high-volume luxury retail and a data-driven mindset for improving conversion rates are essential.',
  },
  {
    position: 'Boutique Manager',
    body: 'We are seeking a high-energy Boutique Manager to oversee our flagship location. You will lead a team of style consultants, manage daily store operations, and ensure every client receives a "white-glove" experience. Strong leadership skills and a proven track record in luxury sales targets are required.',
  },

  {
    position: 'Sustainability Lead',
    body: 'As a brand committed to the planet, we need a lead to audit our supply chain. You will work with global suppliers to ensure fair labor practices and source eco-friendly textiles. You must have experience with environmental certifications and sustainable manufacturing processes.',
  },
  {
    position: 'Personal Stylist',
    body: 'Our VIP clients demand a curated experience. You will provide personalized wardrobe consultations, host private styling sessions, and build long-term relationships with our top-tier customers. Deep knowledge of current fashion house archives and contemporary styling is required.',
  },
  {
    position: 'Logistics Coordinator',
    body: 'Efficiency is the backbone of our brand. You will manage incoming shipments, oversee quality control for outgoing orders, and handle international customs documentation. We are looking for someone with exceptional organizational skills and experience in premium product handling.',
  },
  {
    position: 'Customer Experience Specialist',
    body: 'Be the voice of H-Collections. You will handle inquiries via email, chat, and phone, ensuring that every customer feels heard and valued. This role requires excellent communication skills and the ability to resolve complex shipping or product issues with grace.',
  },
  {
    position: 'Marketing Director',
    body: 'We are looking for a strategic leader to scale our brand globally. You will oversee multi-channel marketing campaigns, manage the annual budget, and define our brand positioning in new markets. 10+ years in the luxury sector and a strong network in the fashion industry are preferred.',
  },
  {
    position: 'Content Strategist',
    body: 'Help us tell the story of H-Collections. You will create visual content for Instagram and TikTok, manage community engagement, and collaborate with influencers. A background in photography, video editing, and a sharp eye for minimalist aesthetics is a must.',
  },
  {
    position: 'Senior Full-Stack Developer',
    body: 'We are building the future of digital retail. You will be responsible for maintaining our Next.js frontend, integrating Stripe for global payments, and optimizing our PostgreSQL database. Mastery of TypeScript, React, and Drizzle ORM is expected.',
  },
];

export async function seed() {
  await db.insert(CareerTable).values(careers);
}

seed();
