import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import { sanityFetch } from '@/sanity/lib/live';
import { UTILITY_PAGE_QUERY } from '@/sanity/lib/sanityQueries';
import { myPortableText } from '@/sanity/schemaTypes/components/myPortableText';
import { Metadata } from 'next';
import { PortableText } from 'next-sanity';

const params = {
  slug: 'privacy-policy-utility-page',
};

const { data: page } = await sanityFetch({ query: UTILITY_PAGE_QUERY, params });

export const metadata: Metadata = {
  title: page?.name,
  description: `Your data security is our priority. Read the H-Collections Privacy Policy to understand how we protect and manage your personal information.`,
};

const AccessibilityPage = async () => {
  return (
    <Bounded isPadded>
      <PageTitle>{page.name}</PageTitle>
      {page.body && (
        <div className="prose md:prose-lg">
          <PortableText value={page.body} components={myPortableText} />
        </div>
      )}
    </Bounded>
  );
};

export default AccessibilityPage;
