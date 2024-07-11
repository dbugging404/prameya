import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

import { Container } from '@/components/ui/Container';

interface ReviewType {
  length?: number;
  title: string;
  body: string;
  author: string;
  rating: number;
}

interface StarRatingProps {
  rating: number;
}

interface ReviewProps {
  title: string;
  body: string;
  author: string;
  rating: number;
  className?: string | boolean;
}

interface ReviewColumnProps {
  className?: string;
  reviews: ReviewType[];
  reviewClassName?: (index: number) => string | boolean;
  msPerPixel?: number;
}

interface ReviewGridProps {
  reviews: ReviewType[];
}

interface ReviewsProps {
  reviews: ReviewType[];
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 20 20' aria-hidden='true' {...props}>
      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
    </svg>
  );
}

function StarRating({ rating }: StarRatingProps) {
  return (
    <div className='flex'>
      {[...Array(5).keys()].map((index) => (
        <StarIcon
          key={index}
          className={clsx(
            'h-5 w-5',
            rating > index ? 'fill-yellow-800' : 'fill-zinc-300',
          )}
        />
      ))}
    </div>
  );
}

function Review({
  title,
  body,
  author,
  rating,
  className,
  ...props
}: ReviewProps) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = [
      '0s',
      '0.1s',
      '0.2s',
      '0.3s',
      '0.4s',
      '0.5s',
    ];
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ];
  }, []);

  return (
    <figure
      className={clsx(
        'animate-fade-in rounded-3xl bg-zinc-200 p-6 opacity-20 shadow-md shadow-zinc-900/5 dark:bg-zinc-800',
        className,
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className='text-zinc-700 dark:text-zinc-300'>
        <StarRating rating={rating} />
        <p className="mt-4 text-lg font-semibold leading-6 before:content-['“'] after:content-['”']">
          {title}
        </p>
        <p className='mt-3 text-base leading-7'>{body}</p>
      </blockquote>
      <figcaption className="mt-3 text-sm text-zinc-900 before:content-['–_'] dark:text-zinc-200">
        {author}
      </figcaption>
    </figure>
  );
}

function splitArray<T>(array: T[], numParts: number): T[][] {
  let result: T[][] = [];
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }
  return result;
}

function ReviewColumn({
  className,
  reviews,
  reviewClassName = () => '',
  msPerPixel = 0,
}: ReviewColumnProps) {
  let columnRef = useRef<HTMLDivElement>(null);
  let [columnHeight, setColumnHeight] = useState(0);
  let duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    let resizeObserver = new window.ResizeObserver(() => {
      if (columnRef.current) {
        setColumnHeight(columnRef.current.offsetHeight);
      }
    });

    if (columnRef.current) {
      resizeObserver.observe(columnRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={clsx('animate-marquee space-y-8 py-4', className)}
      style={{ '--marquee-duration': duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((review, reviewIndex) => (
        <Review
          key={reviewIndex}
          aria-hidden={reviewIndex >= reviews.length}
          className={reviewClassName(reviewIndex % reviews.length)}
          {...review}
        />
      ))}
    </div>
  );
}

function ReviewGrid({ reviews }: ReviewGridProps) {
  let containerRef = useRef<HTMLDivElement>(null);
  let isInView = useInView(containerRef, { once: true, amount: 0.4 });
  let columns = splitArray(reviews, 3);
  columns = [columns[0], columns[1], ...splitArray(columns[2], 2)];

  return (
    <div
      ref={containerRef}
      className='relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3'
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...columns[0], ...columns[2].flat(), ...columns[1]]}
            reviewClassName={(reviewIndex) =>
              clsx(
                reviewIndex >=
                  columns[0].length + (columns[2][0]?.length ?? 0) &&
                  'md:hidden',
                reviewIndex >= columns[0].length && 'lg:hidden',
              )
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...columns[1], columns[2][1]]} // Remove the square brackets
            className='hidden md:block'
            reviewClassName={(reviewIndex) =>
              reviewIndex >= columns[1].length && 'lg:hidden'
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={columns[2].flat()}
            className='hidden lg:block'
            msPerPixel={10}
          />
        </>
      )}
      <div className='pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white dark:from-zinc-900' />
      <div className='pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-zinc-900' />
    </div>
  );
}

export function Reviews({ reviews }: ReviewsProps) {
  return (
    <section
      id='reviews'
      aria-labelledby='reviews-title'
      className='pb-16 pt-20 sm:pb-24 sm:pt-32'
    >
      <Container>
        <h2
          id='reviews-title'
          className='text-3xl font-medium tracking-tight text-zinc-800 dark:text-zinc-200 sm:text-center'
        >
          Everyone is changing their life with Pocket.
        </h2>
        <p className='mt-2 text-lg text-zinc-600 dark:text-zinc-400 sm:text-center'>
          Thousands of people have doubled their net-worth in the last 30 days.
        </p>
        <ReviewGrid reviews={reviews} />
      </Container>
    </section>
  );
}
