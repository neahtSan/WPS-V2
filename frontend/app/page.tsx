"use client";

import HeroCarousel from "@/components/HeroCarousel";
import YoutubeCard from "@/components/YoutubeCard";
import Testimonial from "@/components/Testimonial";
import TempleDescription from "@/components/TempleDescription";
import EventCalendar from "@/components/EventCalendar";


function HomePage() {
  const testimonials = [
    {
      quote: "The peaceful environment at Wat Pasunyata helped me reconnect with my inner self. The meditation sessions were transformative.",
      author: "Somchai P.",
      occupation: "Retired Teacher"
    },
    {
      quote: "I've been attending retreats at Wat Pasunyata for years. The monks are knowledgeable and the forest setting is perfect for meditation.",
      author: "Malai S.",
      occupation: "Business Owner"
    },
    {
      quote: "As a complete beginner to meditation, I found the guidance here very accessible and helpful. Everyone was welcoming.",
      author: "Pranee K.",
      occupation: "Homemaker"
    }
  ];
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />
      
      {/* Temple Description */}
      {/* <section id="about" className="section bg-temple-sand">
        <div className="temple-container">
          <TempleDescription />
        </div>
      </section> */}

      {/* Activities Calendar */}
      <section id="events" className="section bg-white">
        <div className="temple-container">
          <EventCalendar />
        </div>
      </section>


      {/* Testimonials */}
      <section id="testimonials" className="section bg-temple-cream">
        <div className="temple-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl-large font-semibold text-temple-brown-dark mb-2">
              Visitor Experiences
            </h2>
            <p className="text-temple-brown max-w-2xl mx-auto">
              Hear from those who have visited our temple and experienced our meditation practices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
      {/* Dharma Teachings */}
      <section id="videos" className="section bg-white">
        <div className="temple-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl-large font-semibold text-temple-brown-dark mb-2">
              Dharma Teachings
            </h2>
            <p className="text-temple-brown max-w-2xl mx-auto">
              Watch recordings of our Dharma talks and meditation instructions.
            </p>
          </div>
          <YoutubeCard />
        </div>
      </section>

    </div>
  );
}

export default HomePage;
