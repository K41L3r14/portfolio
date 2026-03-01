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
            <h2 className="title-font text-3xl leading-tight sm:text-4xl lg:text-5xl">
              I am a Independent Software Developer
            </h2>
            <div className="description-font space-y-4 text-sm leading-relaxed sm:text-base">
              <p>
                I love collaborating on projects that solve real problems and create memorable experiences.
                I have experience working on full-stack projects that range from building reliable backend
                systems to crafting polished, user-friendly interfaces. I don’t like to limit myself to what
                I am comfortable with. I am always looking for new opportunities to learn and grow as a developer,
                and I am open to researching and learning new technologies.

              </p>
              <p>
                In my free time, I like spending time with my family and friends. I also enjoy drawing whenever I can and learning new languages.
                One of my life goals is to speak five different languages. Spanish is my first language, I learned English at 13, and I am currently
                teaching myself Japanese.

                I also enjoy game design and development by playing different video game genres.
                I like it because it combines two things I admire most: art and software development.
                Another life goal of mine is to create my own game in the future and make it successful,
                like the creator of the popular life simulation game Stardew Valley.

              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
