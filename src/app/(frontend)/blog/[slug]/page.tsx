import BlogCard from '@/components/features/BlogCard';
import BackToPage from '@/components/shared/BackToPage';
import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import SanityImage from '@/components/shared/SanityImage';
import SectionSubtitle from '@/components/shared/SectionSubtitle';
import { formatDash, formatDate, formatTitle } from '@/lib/formatter';
import { sanityFetch } from '@/sanity/lib/live';
import { BLOG_QUERY } from '@/sanity/lib/sanityQueries';
import { myPortableText } from '@/sanity/schemaTypes/components/myPortableText';
import { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const formatSlug = formatTitle(formatDash(slug));

  return {
    title: formatSlug,
    description: `Dive deeper into the world of high fashion. Read our latest feature on ${formatSlug} and discover the stories behind the brands at H-Collections.`,
  };
}

const BlogDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { data: blog } = await sanityFetch({
    query: BLOG_QUERY,
    params: await params,
  });

  if (!blog) notFound();

  const {
    title,
    subtitle,
    author,
    category,
    imageUrl,
    imageAlt,
    publishedAt,
    body,
    minRead,
  } = blog;

  return (
    <Bounded isPadded>
      <BackToPage>All Journals</BackToPage>
      <div className="flex flex-col gap-y-3 text-center">
        {category && <p>{category.name}</p>}
        <PageTitle>{title}</PageTitle>
        <p>
          Written by{' '}
          <Link href={`/author/${author?.slug}`} className="underline">
            {author?.name}
          </Link>
        </p>
        {publishedAt && (
          <p>
            <span>Published On </span>
            <span className="font-semibold">{formatDate(publishedAt)} </span>
            <span>| {minRead} min Read</span>
          </p>
        )}
      </div>

      <div className="overflow-hidden">
        {imageAlt && imageUrl ? (
          <SanityImage
            imageAlt={imageAlt || ''}
            imageUrl={imageUrl}
            width={800}
            height={400}
            className="max-w-100 mx-auto"
          />
        ) : null}
      </div>

      <p className="italic font-medium text-center">"{subtitle}"</p>

      {body && (
        <div className="prose md:prose-lg min-w-full">
          <PortableText value={body} components={myPortableText} />
        </div>
      )}

      {blog.relatedBlogs.length > 1 && (
        <div className="space-y-3">
          <SectionSubtitle>Related Journals</SectionSubtitle>

          <div className="flex gap-x-3 overflow-x-scroll">
            {blog.relatedBlogs.map((blog) => (
              <BlogCard key={blog.slug} {...blog} />
            ))}
          </div>
        </div>
      )}
    </Bounded>
  );
};

export default BlogDetailPage;
