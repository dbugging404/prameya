import React from 'react';
import { Button as HeadlessUIButton } from '@headlessui/react';
import { ButtonProps } from '@headlessui/react';

const Button = ({ children, ...props }: ButtonProps) => {
  return <HeadlessUIButton {...props}>{children}</HeadlessUIButton>;
};

export default Button;
