import React, { ReactNode } from 'react';
import ThemeProvider from '@/components/ui/ThemeProvider';
import { ThemeProvider as MaterialTheme } from '@material-tailwind/react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <MaterialTheme>
      <ThemeProvider attribute='class'>
        <main className={`min-h-screen bg-zinc-100 dark:bg-zinc-950`}>
          {children}
        </main>
      </ThemeProvider>
    </MaterialTheme>
  );
};

export default Layout;
