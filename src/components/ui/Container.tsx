import { forwardRef, Ref } from 'react';
import clsx from 'clsx';

type ContainerProps = {
  className?: string;
  children?: React.ReactNode;
};

const OuterContainer = forwardRef(function OuterContainer(
  { className, children, ...props }: ContainerProps,
  ref: Ref<HTMLDivElement> | null,
) {
  return (
    <div ref={ref} className={clsx('sm:px-8', className)} {...props}>
      <div className='mx-auto max-w-7xl lg:px-4'>{children}</div>
    </div>
  );
});

const InnerContainer = forwardRef(function InnerContainer(
  { className, children, ...props }: ContainerProps,
  ref: Ref<HTMLDivElement> | null,
) {
  return (
    <div
      ref={ref}
      className={clsx('relative px-4 sm:px-6 lg:px-8', className)}
      {...props}
    >
      <div className='mx-auto max-w-2xl lg:max-w-7xl'>{children}</div>
    </div>
  );
});

type ContainerComponent = React.ForwardRefExoticComponent<
  ContainerProps & React.RefAttributes<unknown>
> & {
  Outer: typeof OuterContainer;
  Inner: typeof InnerContainer;
};

export const Container = forwardRef(function Container(
  { children, ...props }: ContainerProps,
  ref: Ref<HTMLDivElement> | null,
) {
  return (
    <OuterContainer ref={ref} {...props}>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  );
}) as ContainerComponent;
