// components/FullscreenVideoSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';
import video3 from '../assets/video5.mp4';

const CarouselSlider = () => {
  const videos = [video1, video2, video3];

  return (
    <div className="flex flex-col overflow-auto h-142">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        slidesPerView={1}
        spaceBetween={0}
        className="w-full h-full"
      >
        {videos.map((src, index) => (
          <SwiperSlide key={index}>
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Optional custom dot style */}
      <style>{`
        .swiper-pagination-bullet {
          background: white;
          width: 10px;
          height: 10px;
          margin: 0 5px !important;
        }import { Carousel } from '@material-tailwind/react';
import { Carousel } from '@material-tailwind/react';

        .swiper-pagination-bullet-active {
          background: #ffffff;
        }
      `}</style>
    </div>
  );
};

export default CarouselSlider;
