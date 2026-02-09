import Image from "next/image";

const images = [
  { src: "/aboutMe1.jpeg", alt: "Katia in nature" },
  { src: "/aboutMe2.jpeg", alt: "Katia walking outdoors" },
  { src: "/aboutMe3.jpeg", alt: "Katia portrait" },
];

const loopedImages = [...images, ...images];

export default function AboutMeSection() {
  return (
    <div className="w-full max-w-[88rem]">
      <div className="relative min-h-[34rem] overflow-hidden rounded-3xl border border-[#d3c8b6] shadow-xl sm:min-h-[40rem]">
        <div className="about-banner-track absolute inset-y-0 left-0">
          {loopedImages.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="relative h-[34rem] w-[28rem] shrink-0 sm:h-[40rem] sm:w-[36rem] lg:w-[44rem]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1280px) 44rem, (min-width: 640px) 36rem, 28rem"
                className="object-cover"
                priority={index < images.length}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#1f1b17]/78 via-[#1f1b17]/52 to-[#1f1b17]/24" />

        <div className="relative z-10 flex min-h-[34rem] items-end p-6 sm:min-h-[40rem] sm:p-10">
          <div className="max-w-3xl space-y-5 text-left text-[#f7f3ec]">
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
              I am a freelance software developer
            </h2>
            <div className="space-y-4 text-sm leading-relaxed sm:text-base">
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
    </div>
  );
}
