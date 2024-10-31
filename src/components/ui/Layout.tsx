import React, { ReactNode } from 'react';
import ThemeProvider from '@/components/ui/themeProvider';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider attribute='class'>
      <main className={`min-h-screen bg-zinc-100 dark:bg-zinc-950`}>
        {children}
      </main>
    </ThemeProvider>
  );
};

export default Layout;
