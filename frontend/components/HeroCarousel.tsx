import React from 'react';
import { EmblaCarousel } from './carousel/EmblaCarousel';

const slides = [
  {
    image: 'https://picsum.photos/id/28/800/450',
    title: 'วัดป่าสุญญตา',
    description: 'วัดป่าแห่งความสงบเพื่อการปฏิบัติสมาธิและการพัฒนาทางจิตวิญญาณ'
  },
  {
    image: 'https://picsum.photos/id/29/800/450',
    title: 'บรรยากาศร่มรื่น',
    description: 'สัมผัสความสงบท่ามกลางธรรมชาติในสภาพแวดล้อมของป่า'
  },
  {
    image: 'https://picsum.photos/id/30/800/450',
    title: 'คำสอนของพระพุทธเจ้า',
    description: 'เรียนรู้และปฏิบัติตามหลักคำสอนอันไม่มีกาลเวลาของพระพุทธเจ้า'
  }
];

const HeroCarousel = () => {
  return (
    <div className="relative h-[500px] overflow-hidden bg-temple-brown-light/10">
      <EmblaCarousel slides={slides} />
    </div>
  );
};

export default HeroCarousel;