import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { gql } from '@apollo/client';
import { hygraph } from '@/lib/hygraph';
import { formatDate } from '@/lib/formatDate';
import { Container } from '@/components/ui/container';
import { convertToTitleCase } from '@/lib/convertToTitleCase';

const limit = 6;

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface BlogProps {
  blogs: {
    node: {
      title: string;
      description: string;
      image: {
        url: string;
      };
      author: {
        name: string;
        image: {
          url: string;
        };
      };
      readTime: string;
      slug: string;
      id: string;
      blogCategory: string;
      publishedDate: string;
    };
  }[];
}

const IndexPage = ({ blogs }: BlogProps) => {
  return (
    <>
      <Head>
        {/* Primary Tags */}

        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>Blogs | Prameya Health</title>
        <meta name='title' content='Blogs | Prameya Health' />
        <meta
          name='description'
          content='Cancer support specialists in India'
        />

        {/* Open Graph / Facebook */}

        <meta property='og:title' content='Blogs | Prameya Health' />
        <meta property='og:site_name' content='Prameya Health' />
        <meta property='og:url' content='https://prameyahealth.com' />
        <meta
          property='og:description'
          content='Cancer support specialists in India'
        />
        <meta property='og:type' content='website' />
        {/* <meta property='og:image' content={SeoImage} /> */}

        {/* Twitter*/}

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@linkedinforher' />
        <meta name='twitter:title' content='Blogs | Prameya Health' />
        <meta
          name='twitter:description'
          content='Empowering women to achieve their financial goals through education and community.'
        />
        {/* <meta name='twitter:image' content={SeoImage} /> */}
      </Head>
      <Container>
        <div className='font-lexend mx-auto max-w-7xl py-24'>
          <div className='text-center'>
            <div>
              <h2 className='font-heading text-3xl font-extrabold tracking-tight sm:text-4xl'>
                Recent Blogs
              </h2>
              <p className='mt-3 font-sans text-xl text-gray-500 sm:mt-4'>
                Our latest articles on personal finance, investing, and career
              </p>
            </div>
          </div>
          <div className='mx-auto grid max-w-xl gap-8 p-3 py-12 lg:max-w-none lg:grid-cols-3'>
            {blogs?.map((post) => (
              <Link
                href={`/blogs/${post?.node?.slug}`}
                key={post?.node?.title}
                className='flex flex-col items-start justify-between rounded-md border border-zinc-200 p-4 shadow-md transition duration-300 ease-in-out hover:shadow-xl dark:border-zinc-700 dark:shadow-zinc-900/20 dark:hover:dark:shadow-zinc-900/20'
              >
                <div className='font-sans'>
                  <span className='rounded-full bg-maroon-100 px-3 py-1 text-sm font-semibold text-maroon-900 dark:bg-maroon-200 dark:text-maroon-900'>
                    {convertToTitleCase(post?.node?.blogCategory)}
                  </span>
                  <Image
                    src={post?.node?.image?.url}
                    alt={post?.node?.title}
                    width={500}
                    height={500}
                    className='mt-4 rounded-lg'
                  />
                  <div className='mt-4 block'>
                    <p className='text-lg font-semibold text-zinc-800 dark:text-zinc-200'>
                      {post?.node?.title}
                    </p>
                    <p className='mt-3 text-sm text-zinc-600 dark:text-zinc-400'>
                      {post?.node?.description?.slice(0, 100)}
                    </p>
                  </div>
                </div>
                <div className='mt-6'>
                  <div className='flex-shrink-0'>
                    <span className='sr-only'>{post?.node?.author?.name}</span>
                  </div>
                  <div className='flex items-center justify-start space-x-3'>
                    <div className=''>
                      <Image
                        src={post?.node?.author?.image?.url}
                        alt={post?.node?.author?.name}
                        width={56}
                        height={56}
                        className='h-14 w-14 rounded-full'
                      />
                    </div>
                    <div className='flex flex-col space-x-1 text-sm'>
                      <p className='ml-1 text-sm font-medium'>
                        {post?.node?.author?.name}
                      </p>
                      <div className='space-x-2'>
                        <time dateTime={post?.node?.publishedDate}>
                          {formatDate(post?.node?.publishedDate)}
                        </time>
                        <span aria-hidden='true'>&middot;</span>
                        <span>{post?.node?.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default IndexPage;

export const getStaticProps = async ({
  params,
}: {
  params: { page: number };
}) => {
  const { data } = await hygraph.query({
    query: gql`
      query BlogsPageQuery($limit: Int!, $offset: Int!) {
        blogsConnection(
          first: $limit
          skip: $offset
          orderBy: publishedDate_DESC
        ) {
          blogs: edges {
            node {
              title
              description
              image {
                url
              }
              author {
                name
                image {
                  url
                }
              }
              readTime
              slug
              id
              blogCategory
              publishedDate
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            pageSize
          }
          aggregate {
            count
          }
        }
      }
    `,
    variables: {
      limit,
      offset: (params.page - 1) * limit,
    },
  });

  return {
    props: {
      blogs: data.blogsConnection.blogs,
    },
    revalidate: 180,
  };
};

export const getStaticPaths = async () => {
  const { data } = await hygraph.query({
    query: gql`
      query {
        blogsConnection {
          aggregate {
            count
          }
        }
      }
    `,
  });
  function* numberOfPages({ total, limit }: { total: number; limit: number }) {
    let page = 1;
    let offset = 0;
    while (offset < total) {
      yield page;
      page++;
      offset += limit;
    }
  }

  const paths = [
    ...numberOfPages({
      total: data.blogsConnection.aggregate.count,
      limit,
    }),
  ].map((page) => ({
    params: { page: String(page) },
  }));

  return {
    paths,
    fallback: true,
  };
};
