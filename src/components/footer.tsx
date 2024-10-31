import React from 'react';
import { Container } from '@/components/ui/container';
import Link from 'next/link';
import {
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp,
} from 'react-icons/fa6';

const Footer: React.FC = () => {
  return (
    <Container>
      <footer className='flex flex-col items-center justify-between gap-6 px-8 sm:flex-row'>
        <p className='text-sm text-gray-500'>
          &copy; {new Date().getFullYear()} <Link href='/'>Prameya Health</Link>
          . All rights reserved.
        </p>
        <SocialIcons />
      </footer>
    </Container>
  );
};

export default Footer;

const SocialIcons = () => {
  return (
    <div className='my-6 flex items-center space-x-4'>
      <Link href='https://www.facebook.com' target='_blank' rel='noreferrer'>
        <FaFacebook className='text-xl text-blue-500 transition-all duration-300 hover:text-2xl hover:text-blue-600 dark:text-zinc-200 dark:hover:text-zinc-50' />
      </Link>
      <Link href='https://www.twitter.com' target='_blank' rel='noreferrer'>
        <FaXTwitter className='text-xl text-black/70 transition-all duration-300 hover:text-2xl hover:text-black dark:text-zinc-200 dark:hover:text-zinc-50' />
      </Link>
      <Link href='https://www.instagram.com' target='_blank' rel='noreferrer'>
        <FaInstagram className='text-xl text-pink-500 transition-all duration-300 hover:text-2xl hover:text-pink-600 dark:text-zinc-200 dark:hover:text-zinc-50' />
      </Link>
      <Link href='mailto:email@example.com' target='_blank' rel='noreferrer'>
        <FaEnvelope className='text-xl text-maroon-500 transition-all duration-300 hover:text-2xl hover:text-maroon-600 dark:text-zinc-200 dark:hover:text-zinc-50' />
      </Link>
      <Link href='https://wa.me/1234567890' target='_blank' rel='noreferrer'>
        <FaWhatsapp className='text-xl text-green-500 transition-all duration-300 hover:text-2xl hover:text-green-600 dark:text-zinc-200 dark:hover:text-zinc-50' />
      </Link>
    </div>
  );
};
