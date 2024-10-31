import React from 'react';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import { Container } from '@/components/ui/container';

interface BreadcrumbsProps {
  link1?: string;
  title1?: string;
  link2?: string;
  title2?: string;
  link3?: string;
  title3?: string;
  link4?: string;
  title4?: string;
}

const Breadcrumbs = ({
  link1,
  link2,
  link3,
  link4,
  title1,
  title2,
  title3,
  title4,
}: BreadcrumbsProps) => {
  return (
    <Container>
      <div className='mb-6 flex max-w-fit items-center space-x-2 rounded-md bg-zinc-500/30 px-4 py-1.5 font-sans text-xs'>
        <Link href='/'>
          <FaHome className='text-lg' />
        </Link>
        {link1 && title1 && (
          <>
            <span> / </span>
            <Link href={link1}>{title1}</Link>
          </>
        )}
        {link2 && title2 && (
          <>
            <span> / </span>
            <Link href={link2}>{title2}</Link>
          </>
        )}
        {link3 && title3 && (
          <>
            <span> / </span>
            <Link href={link3}>{title3}</Link>
          </>
        )}
        {link4 && title4 && (
          <>
            <span> / </span>
            <Link href={link4}>{title4}</Link>
          </>
        )}
      </div>
    </Container>
  );
};

export default Breadcrumbs;
