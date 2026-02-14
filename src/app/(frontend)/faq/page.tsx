import NewsletterForm from '@/components/features/NewsletterForm';
import Bounded from '@/components/shared/Bounded';
import FAQCard from '@/components/shared/FAQCard';
import PageBanner from '@/components/shared/PageBanner';
import PageTitle from '@/components/shared/PageTitle';
import { sanityFetch } from '@/sanity/lib/live';
import { ALL_FAQS_QUERY } from '@/sanity/lib/sanityQueries';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs',
  description: `Got questions? Find quick answers about shipping, sizing, and designer collaborations in the H-Collections Help Center.`,
};

const FAQsPage = async () => {
  const { data: faqs } = await sanityFetch({ query: ALL_FAQS_QUERY });

  if (!faqs) null;

  return (
    <Bounded isPadded>
      <PageTitle>Frequently Asked Questions</PageTitle>
      <FAQCard faqs={faqs} />
      <PageBanner />
      <div className="flex flex-col gap-y-5">
        <h3 className="font-semibold text-fs-500 md:text-fs-600 md:text-center">
          Subscribe to our Newsletter
        </h3>
        <NewsletterForm />
      </div>
    </Bounded>
  );
};

export default FAQsPage;
