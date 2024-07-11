import Image from 'next/image';
import { Carousel } from 'nuka-carousel';

const CarouselComponent = () => {
  return (
    <Carousel
      autoplay
      showDots
      autoplayInterval={5000}
      showArrows
      wrapMode='wrap' // This will enable infinite
      swiping
      className='mx-auto w-full space-x-4 overflow-hidden rounded-md'
    >
      <Image
        src='https://images.unsplash.com/photo-1639921884918-8d28ab2e39a4?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        alt='carousel image'
        width={1920}
        height={1080}
        className=''
      />
      <Image
        src='https://images.unsplash.com/photo-1639874897442-8b6d5a181cf3?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        alt='carousel image'
        width={1920}
        height={1080}
        className=''
      />
      <Image
        src='https://images.unsplash.com/photo-1637984135921-301a7d39e3b7?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        alt='carousel image'
        width={1920}
        height={1080}
        className=''
      />
    </Carousel>
  );
};

export default CarouselComponent;
