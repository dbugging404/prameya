import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi2';
import { FaArrowRightLong } from 'react-icons/fa6';
import React from 'react';
import Link from 'next/link';

export const Dropdowns = () => {
  return (
    <div className='flex w-full items-center justify-center font-sans'>
      <div className='flex space-x-2'>
        {navBar.map((item) => (
          <Popover key={item.label} className={`relative`}>
            <PopoverButton className='px-2 py-1.5 text-sm text-zinc-800 transition-all duration-150 hover:font-semibold hover:tracking-wide hover:underline focus:outline-none data-[open]:font-semibold data-[open]:tracking-wide data-[open]:underline dark:text-zinc-200'>
              {item.label}
            </PopoverButton>
            <PopoverPanel
              anchor='bottom'
              transition
              className='absolute mt-6 w-72 divide-y divide-black/5 rounded-xl border border-white bg-zinc-50 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 dark:divide-white/5 dark:border dark:border-black/10 dark:bg-zinc-900'
            >
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
                              className='block rounded-lg p-2 transition hover:bg-black/10 focus:bg-black/10 focus:outline-none dark:hover:bg-white/10 dark:focus:bg-white/10'
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
                          className='block rounded-lg p-2 transition hover:bg-black/10 focus:bg-black/10 focus:outline-none dark:hover:bg-white/10 dark:focus:bg-white/10'
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
            </PopoverPanel>
          </Popover>
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
