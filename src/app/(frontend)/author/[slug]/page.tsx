import BlogCard from '@/components/features/BlogCard';
import { BlogCardSkeleton } from '@/components/shared/Skeletons';
import BackToPage from '@/components/shared/BackToPage';
import Bounded from '@/components/shared/Bounded';
import SanityImage from '@/components/shared/SanityImage';
import SectionSubtitle from '@/components/shared/SectionSubtitle';
import { Button } from '@/components/ui/button';
import { formatDash, formatTitle } from '@/lib/formatter';
import { sanityFetch } from '@/sanity/lib/live';
import { AUTHOR_QUERY } from '@/sanity/lib/sanityQueries';
import { myPortableText } from '@/sanity/schemaTypes/components/myPortableText';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { BiLogoInstagram } from 'react-icons/bi';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const formatSlug = formatTitle(formatDash(slug));

  return {
    title: formatSlug,
  };
}

const AuthorDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { data: author } = await sanityFetch({
    query: AUTHOR_QUERY,
    params: await params,
  });

  if (!author) notFound();

  return (
    <Bounded isPadded>
      <BackToPage href="/author">All Authors</BackToPage>
      <div className="grid md:grid-cols-[auto_1fr] gap-y-4 gap-x-5">
        <div className="overflow-hidden">
          {author.imageAlt && author.imageUrl ? (
            <SanityImage
              imageAlt={author.imageAlt || ''}
              imageUrl={author.imageUrl}
              width={300}
              height={300}
              className="rounded-full! md:w-50 md:h-50 max-md:w-75! max-md:h-75! max-md:mx-auto"
            />
          ) : null}
        </div>

        {author.body && (
          <div className="prose md:prose-lg min-w-full">
            <PortableText value={author.body} components={myPortableText} />
            {author.socialLink && (
              <Button variant="faq" asChild>
                <Link href={author.socialLink}>
                  <BiLogoInstagram />
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="space-y-5 md:space-y-10">
        <SectionSubtitle>Author&apos;s Journals</SectionSubtitle>
        <div className="flex gap-x-5 overflow-x-scroll py-3">
          {author.journals.map((j) => (
            <Suspense key={j.slug} fallback={<BlogCardSkeleton />}>
              <BlogCard {...j} />
            </Suspense>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default AuthorDetailPage;
