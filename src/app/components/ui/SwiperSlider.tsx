// components/SwiperSlider.tsx
'use client';

import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { FreeMode, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { useState, useRef, ReactNode } from 'react';

interface SwiperSliderProps {
  title: string;
  subtitle: string;
  children: ReactNode[];
  slideWidth?: string; // Позволяет настраивать ширину слайдов
}

const SwiperSlider: React.FC<SwiperSliderProps> = ({ 
  title, 
  subtitle, 
  children, 
  slideWidth = "!w-[85%] sm:!w-[70%] md:!w-[45%]" 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <section className="relative w-full py-12 md:py-20 overflow-hidden bg-none">
      <div className="container-custom">
        <div className="block md:hidden mb-8 text-start ml-4">
          <h2 className="mb-4 text-base text-zinc-400 ">{subtitle}</h2>
          <p className="text-4xl font-bold dark:text-white">{title}</p>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="hidden md:block md:w-1/3 pr-10 relative z-20 bg-zinc-100 dark:bg-black">
            <div className="sticky top-10">
              <h2 className="mb-4 text-base text-zinc-400">{subtitle}</h2>
              <p className="text-4xl font-bold dark:text-white">{title}</p>
            </div>
          </div>

          <div className="w-full md:w-2/3 relative overflow-hidden">
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-zinc-100 dark:from-black to-transparent z-10 pointer-events-none"></div>

            <div className="relative pl-0 md:pl-8">
              <Swiper
                ref={swiperRef}
                modules={[FreeMode, Mousewheel, Keyboard]}
                freeMode={{
                  enabled: true,
                  momentum: true,
                  momentumRatio: 1.5,
                  momentumBounce: true,
                  momentumVelocityRatio: 0.8,
                  sticky: false,
                  minimumVelocity: 0.1
                }}
                mousewheel={{
                  enabled: true,
                  forceToAxis: true,
                  sensitivity: 1.2,
                }}
                keyboard={{
                  enabled: true,
                }}
                speed={800}
                slidesPerView="auto"
                spaceBetween={24}
                resistance={true}
                resistanceRatio={0.6}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.activeIndex);
                }}
                className="swiper-initialized swiper-horizontal delay-fade-in _slider_32wsj_1 _main_32wsj_4 _withShadow_32wsj_12"
                style={{ overflow: 'visible' }}
              >
                {children.map((child, index) => (
                  <SwiperSlide key={index} className={slideWidth}>
                    {child}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Индикаторы для мобильной версии */}
            <div className="flex justify-center mt-6 md:hidden">
              <div className="flex space-x-2">
                {children.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'bg-green-600 w-4' 
                        : 'bg-zinc-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SwiperSlider;