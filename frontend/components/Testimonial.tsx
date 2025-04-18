
import React from 'react';
import { Quote } from 'lucide-react';
import Image from 'next/image';

interface TestimonialProps {
  quote: string;
  author: string;
  occupation?: string;
  image?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, occupation, image }) => {
  return (
    <div className="temple-card p-6 flex flex-col items-center text-center">
      <Quote className="h-10 w-10 text-temple-gold mb-4" />
      
      <blockquote className="mb-4 text-lg italic">
        {quote}
      </blockquote>
      
      <div className="mt-auto">
        {image && (
          <Image 
            src={image}
            alt={author}
            className="w-16 h-16 mx-auto rounded-full mb-2 object-cover"
            width={64}
            height={64}
          />
        )}
        
        <div className="font-medium text-temple-brown-dark">{author}</div>
        
        {occupation && (
          <div className="text-temple-brown">{occupation}</div>
        )}
      </div>
    </div>
  );
};

export default Testimonial;
