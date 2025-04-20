'use client';

import React, { useState } from 'react';
import { PlayCircle } from 'lucide-react';
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
  const latestVideo = videoItems[0];
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <div className="temple-card sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] text-center">
        {/* Video Block */}
        {showPlayer ? (
          <div className="aspect-video w-full rounded overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${latestVideo.id}?autoplay=1`}
              title={latestVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="relative cursor-pointer" onClick={() => setShowPlayer(true)}>
            <Image
              src={latestVideo.thumbnail}
              alt={latestVideo.title}
              width={320}
              height={180}
              className="mx-auto h-auto object-cover rounded"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition">
              <PlayCircle className="text-white w-16 h-16" />
            </div>
          </div>
        )}

        {/* Title */}
        <div className="p-4">
          <h3 className="text-lg font-medium mb-2 text-[#8B4513]">{latestVideo.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default YoutubeCard;
