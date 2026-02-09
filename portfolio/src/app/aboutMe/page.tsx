"use client";

import Image from "next/image";
import { useState } from "react";

const images = [
  { src: "/aboutme1.jpeg", alt: "Katia in nature" },
  { src: "/aboutme2.jpeg", alt: "Katia walking" },
  { src: "/aboutme3.jpeg", alt: "Katia portrait" },
];

const slots = [
  {
    className:
      "relative h-56 w-40 border border-[#d3c8b6] bg-white/70 p-2 shadow-md sm:h-64 sm:w-44 md:h-72 md:w-48 z-10 transition-all duration-500 ease-out",
  },
  {
    className:
      "relative -ml-6 h-64 w-48 border border-[#d3c8b6] bg-white/70 p-2 shadow-xl sm:h-72 sm:w-52 md:h-80 md:w-60 z-30 -translate-y-2 transition-all duration-500 ease-out",
  },
  {
    className:
      "relative -ml-6 h-56 w-40 border border-[#d3c8b6] bg-white/70 p-2 shadow-md sm:h-64 sm:w-44 md:h-72 md:w-48 z-0 transition-all duration-500 ease-out",
  },
];

export default function AboutMeSection() {
  const [order, setOrder] = useState([0, 1, 2]);

  const rotateLeft = () => {
    setOrder(([left, center, right]) => [right, left, center]);
  };

  const rotateRight = () => {
    setOrder(([left, center, right]) => [center, right, left]);
  };

  return (
    <div className="w-full max-w-6xl">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="space-y-6 text-left">
        
          <div className="relative flex items-end">
            <button
              type="button"
              aria-label="Show previous photo"
              onClick={rotateLeft}
              className="absolute left-2 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d3c8b6] bg-white/80 text-lg text-[#3b332b] shadow-md transition-transform hover:-translate-y-1/2 hover:scale-105"
            >
              &#8249;
            </button>
            <button
              type="button"
              aria-label="Show next photo"
              onClick={rotateRight}
              className="absolute right-2 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d3c8b6] bg-white/80 text-lg text-[#3b332b] shadow-md transition-transform hover:-translate-y-1/2 hover:scale-105"
            >
              &#8250;
            </button>
            {order.map((imageIndex, slotIndex) => {
              const image = images[imageIndex];
              const slot = slots[slotIndex];
              return (
                <div
                  key={image.src}
                  className={`${slot.className} transition-transform duration-300`}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 768px) 12rem, 9rem"
                      className="object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6 text-left">
          <h2 className="font-serif text-3xl leading-tight text-[#1f1b17] sm:text-4xl lg:text-5xl">
            I am a freelance software developer
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[#1f1b17] sm:text-base">
            <p>
              I love building thoughtful digital experiences that feel easy to
              use and look polished. My focus is on reliable full-stack work,
              from clean APIs to responsive interfaces.
            </p>
            <p>
              I work with modern JavaScript, React, and Next.js, and I enjoy
              collaborating closely with clients to shape ideas into products
              that are clear, useful, and memorable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
