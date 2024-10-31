import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Button from '@/components/ui/button';

import { MdLightMode, MdDarkMode } from 'react-icons/md';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    // Set the initial state of the theme based on the theme provided by next-themes.
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (!mounted) return null;

  return (
    <Button
      className={`group relative inline-block overflow-hidden rounded bg-maroon-100 px-2 py-2 font-medium text-maroon-600 dark:bg-zinc-600 dark:text-white`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <span className='absolute left-0 top-0 mb-0 flex h-0 w-full translate-y-0 transform bg-maroon-600 opacity-90 transition-all duration-200 ease-out group-hover:h-full dark:bg-yellow-900'></span>
      <span className='relative group-hover:text-white'>
        {theme === 'light' ? (
          <MdLightMode className='text-2xl font-bold' />
        ) : (
          <MdDarkMode className='text-2xl font-bold' />
        )}
      </span>
    </Button>
  );
};

export default ThemeToggle;
