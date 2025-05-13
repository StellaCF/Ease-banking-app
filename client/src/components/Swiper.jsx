import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import card from '../assets/card.png';
import bank from '../assets/bank1.png';

const swiper1 = () => {
  return (
    <div>
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide><img src={card} alt="" /></SwiperSlide>
      <SwiperSlide><img src={bank} alt="" /></SwiperSlide>
      <SwiperSlide><img src={card} alt="" /></SwiperSlide>
      <SwiperSlide><img src={card} alt="" /></SwiperSlide>
    </Swiper>
    </div>
  )
}

export default swiper1
