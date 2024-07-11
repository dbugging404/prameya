import React, { useRef, useEffect } from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '@/components/ui/Layout';
import Header from '@/components/header/header';

function usePrevious(value: any) {
  let ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

const App = ({ Component, pageProps, router }: AppProps) => {
  let previousPathname = usePrevious(router.pathname);
  return (
    <>
      <Layout>
        <div className='fixed inset-0 flex justify-center sm:px-8'>
          <div className='flex w-full max-w-7xl lg:px-8'>
            <div className='w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/30' />
          </div>
        </div>
        <div className={`relative`}>
          <Header />
          <Component previousPathname={previousPathname} {...pageProps} />
        </div>
      </Layout>
    </>
  );
};

export default App;
