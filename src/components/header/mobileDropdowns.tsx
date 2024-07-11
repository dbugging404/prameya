import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi2';
import { FaArrowRightLong } from 'react-icons/fa6';
import React from 'react';
import Link from 'next/link';

export const MobileDropdowns = () => {
  return (
    <div className='mb-6 flex w-full items-center justify-start font-sans'>
      <div className='flex w-full flex-col space-y-2 rounded-md bg-zinc-200 p-2 dark:bg-zinc-800'>
        {navBar.map((item) => (
          <Disclosure key={item.label}>
            <DisclosureButton className='w-full rounded-md px-2 py-3 text-left text-sm text-zinc-800 hover:bg-zinc-900 hover:text-zinc-200 dark:text-zinc-200'>
              {item.label}
            </DisclosureButton>
            <DisclosurePanel className='mx-auto mt-2 w-full divide-y divide-black/5 rounded-xl border border-zinc-300 bg-zinc-100 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 dark:divide-white/5 dark:border dark:border-black/10 dark:bg-zinc-900'>
              <div className=''>
                {item?.options?.map((option) => (
                  <div className='p-1' key={option.label}>
                    {option?.options?.length > 0 ? (
                      <Disclosure>
                        <DisclosureButton className='flex w-full items-center justify-between rounded-lg p-2 text-left text-sm text-zinc-800 transition hover:bg-black/5 focus:bg-black/5 focus:outline-none dark:text-zinc-200 dark:hover:bg-white/5 dark:focus:bg-white/5'>
                          <div className='px-3 py-2'>
                            {option.label} <br />{' '}
                            <span className='text-xs text-black/50 dark:text-white/50'>
                              {option.description}
                            </span>
                          </div>
                          <div>
                            <HiChevronDown />
                          </div>
                        </DisclosureButton>
                        <DisclosurePanel className={`mt-2 space-y-2`}>
                          {option.options.map((subOption) => (
                            <Link
                              key={subOption.label}
                              className='block rounded-lg p-2 transition hover:bg-black/5 focus:bg-black/5 focus:outline-none dark:hover:bg-white/5 dark:focus:bg-white/5'
                              href='#'
                            >
                              <div className='ml-6 flex items-center justify-start space-x-4 text-xs text-zinc-800 dark:text-zinc-200'>
                                <div>
                                  <FaArrowRightLong />
                                </div>
                                <div>{subOption.label}</div>
                              </div>
                            </Link>
                          ))}
                        </DisclosurePanel>
                      </Disclosure>
                    ) : (
                      <div>
                        <Link
                          className='block rounded-lg p-2 transition hover:bg-black/5 focus:bg-black/5 focus:outline-none dark:hover:bg-white/5 dark:focus:bg-white/5'
                          href='#'
                        >
                          <>
                            <p className='font-semi text-sm text-zinc-800 dark:text-zinc-200'>
                              {option.label}
                            </p>
                            <p className='text-xs text-black/50 dark:text-white/50'>
                              {option.description}
                            </p>
                          </>
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </div>
    </div>
  );
};

const navBar = [
  {
    label: 'Cancer Support',
    options: [
      {
        label: 'Sahai',
        description: 'Cancer Support Group',
        options: [],
      },
      {
        label: 'Certification Program',
        description: 'For Cancer Support Group',
        options: [],
      },
      {
        label: 'Products',
        description: 'For Cancer Support Group',
        options: [],
      },
    ],
  },
  {
    label: "Women's Health",
    options: [
      {
        label: 'PranaSakhi',
        description: 'Women Wellness Program',
        options: [],
      },
      {
        label: 'Focus Areas',
        description: 'of Women Wellness Program',
        options: [],
      },
    ],
  },
  {
    label: 'Integrated Services',
    options: [
      {
        label: 'Allopathy',
        description: 'the treatment of disease by conventional means',
        options: [
          {
            label: 'Learn More',
            options: [],
          },
          {
            label: 'Consultation',
            options: [],
          },
        ],
      },
      {
        label: 'Ayurveda',
        description: 'a system of traditional medicine',
        options: [
          {
            label: 'Learn More',
            options: [],
          },
          {
            label: 'Consultation',
            options: [],
          },
          {
            label: 'Therapies',
            options: [],
          },
        ],
      },
      {
        label: 'Naturopathy',
        description:
          'focuses on using traditional practices alongside conventional medicine.',
        options: [
          {
            label: 'Learn',
            options: [],
          },
          {
            label: 'Consultation',
            options: [],
          },
          {
            label: 'Therapies',
            options: [],
          },
        ],
      },
    ],
  },
  {
    label: 'Corporate Programs',
    options: [
      {
        label: 'Reclaiming Women Wellness',
        description: 'Corporate Program',
        options: [],
      },
    ],
  },
  {
    label: 'Yoga',
    options: [],
  },
  {
    label: 'Resources',
    options: [],
  },
];
