import React from 'react';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { VideoItem } from '@/types/video';

const videoItems: VideoItem[] = [
  {
    id: '8PSqPjiF4QI',
    title: '๑๗๒. ตายเพื่อไม่ตาย',
    thumbnail: 'https://img.youtube.com/vi/8PSqPjiF4QI/mqdefault.jpg'
  }
];

const YoutubeCard = () => {
  const latestVideo = videoItems[0]; // Get the latest video

  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        <div className="temple-card flex-none sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] text-center cursor-pointer" onClick={() => window.open(`https://youtube.com/watch?v=${latestVideo.id}`, '_blank')}>
          <Image
            src={latestVideo.thumbnail}
            alt={latestVideo.title}
            width={320}
            height={180}
            className="mx-auto h-auto object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-medium mb-2">{latestVideo.title}</h3>
            <a 
              href={`https://youtube.com/watch?v=${latestVideo.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-temple-green hover:text-temple-green-dark"
            >
              ดูบน YouTube
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <a 
          href="https://www.youtube.com/@Watpasonyata/featured"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-temple-green hover:text-temple-green-dark"
        >
          Visit our YouTube Channel
          <ExternalLink className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default YoutubeCard;