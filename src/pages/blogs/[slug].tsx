import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { gql } from '@apollo/client';
import Markdown from 'react-markdown';
import { useRouter } from 'next/router';
import { hygraph } from '@/lib/hygraph';
import { Container } from '@/components/ui/container';
import { convertToTitleCase } from '@/lib/convertToTitleCase';

interface BlogProps {
  blog: {
    id: string;
    slug: string;
    title: string;
    content: string;
    metaTitle: string;
    description: string;
    blogCategory: string;
    metaKeywords: string;
    publishedDate: string;
    image: { url: string };
    metaDescription: string;
    author: { name: string; image: { url: string } };
  };
}

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { data } = await hygraph.query({
    query: gql`
      query ($slug: String!) {
        blog(where: { slug: $slug }) {
          id
          title
          publishedDate
          description
          slug
          content
          author {
            name
            image {
              url
            }
          }
          metaTitle
          metaDescription
          metaDescription
          metaKeywords
          image {
            url
          }
          blogCategory
        }
      }
    `,
    variables: {
      slug: params.slug,
    },
  });

  return {
    props: {
      blog: data.blog,
    },
    revalidate: 180,
  };
};

export const getStaticPaths = async () => {
  const { data } = await hygraph.query({
    query: gql`
      query {
        blogs {
          slug
        }
      }
    `,
  });
  return {
    paths: data.blogs.map((blog: { slug: string }) => ({
      params: {
        slug: blog.slug,
      },
    })),
    fallback: true,
  };
};

const IndexPage = ({ blog }: BlogProps) => {
  const title = `${blog?.title} | Prameya Health`;
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={blog?.description} />
        <meta name='keywords' content={blog?.metaKeywords} />
        <meta name='author' content={blog?.author?.name} />
        <meta name='robots' content='index, follow' />
        <meta property='og:title' content={blog?.metaTitle} />
        <meta property='og:description' content={blog?.metaDescription} />
        <meta property='og:image' content={blog?.image.url} />
        <meta
          property='og:url'
          content={`https://prameyahealth.com/blogs/${blog?.slug}`}
        />
        <meta property='og:type' content='article' />
        <meta property='og:site_name' content='Prameya health' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@prameyahealth' />
        <meta name='twitter:creator' content='@prameyahealth' />
        <meta name='twitter:title' content={blog?.metaTitle} />
        <meta name='twitter:description' content={blog?.metaDescription} />
        <meta name='twitter:image' content={blog?.image.url} />
        <meta name='twitter:image:alt' content={blog?.title} />
        <meta name='twitter:label1' content='Written by' />
        <meta name='twitter:data1' content={blog?.author?.name} />
        <meta name='twitter:label2' content='Filed under' />
        <meta name='twitter:data2' content={blog?.blogCategory} />
      </Head>
      <Container>
        <div className='relative isolate overflow-hidden py-24 sm:py-32'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto lg:mx-0'>
              <p className='text-center font-sans text-lg font-semibold leading-8 tracking-tight text-maroon-600'>
                {convertToTitleCase(blog?.blogCategory)}
              </p>
              <h1 className='font-heading mx-auto mt-2 max-w-4xl text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl'>
                {blog?.title}
              </h1>
              <div className='mx-auto max-w-4xl py-10'>
                <Image
                  src={blog?.image?.url}
                  alt={blog?.title}
                  width={1920}
                  height={1080}
                  className='rounded-lg'
                />
              </div>
              <div className='prose mx-auto font-sans text-zinc-800 dark:text-zinc-200'>
                <Markdown>{blog?.content}</Markdown>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default IndexPage;
