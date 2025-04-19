import React from 'react';
import { EmblaCarousel } from './carousel/EmblaCarousel';
import mockSlides from '@/data/mock_slides.json';

// Image size must be 16:9 or 4:3 ratio for mobile and desktop (1600x900)
// const slides = [
//   {
//     image: 'https://picsum.photos/id/28/2400/2400',
//     title: 'วัดป่าสุญญตา',
//     description: 'วัดป่าแห่งความสงบเพื่อการปฏิบัติสมาธิและการพัฒนาทางจิตวิญญาณ'
//   },
//   {
//     image: 'https://picsum.photos/id/29/2400/2400',
//     title: 'บรรยากาศร่มรื่น',
//     description: 'สัมผัสความสงบท่ามกลางธรรมชาติในสภาพแวดล้อมของป่า'
//   },
//   {
//     image: 'https://picsum.photos/id/30/2400/2400',
//     title: 'คำสอนของพระพุทธเจ้า',
//     description: 'เรียนรู้และปฏิบัติตามหลักคำสอนอันไม่มีกาลเวลาของพระพุทธเจ้า'
//   }
// ];

const slides = mockSlides;


const HeroCarousel = () => {
  return (
    <div className="relative h-[500px] overflow-hidden bg-temple-brown-light/10">
      <EmblaCarousel slides={slides} />
    </div>
  );
};

export default HeroCarousel;