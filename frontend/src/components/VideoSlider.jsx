import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';
import video3 from '../assets/video3.mp4';

const VideoSlider = () => {
  const videos = [video1, video2, video3];


  return (
    <Swiper spaceBetween={50} slidesPerView={1}>
      {videos.map((video, index) => (
        <div className="relative-group">
        <SwiperSlide key={index}>
          <video
            src={video}
            className="w-full h-auto z-20 "
            controls
            autoPlay
            muted
          />
        </SwiperSlide>
        </div>
      ))}
    </Swiper>
  );
};
export default VideoSlider;
