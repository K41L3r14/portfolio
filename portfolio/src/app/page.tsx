import PropTypes from "prop-types";
import styles from "./SpeechBubble.module.css";
import Link from "next/link";
import AboutMeSection from "./aboutMe/page";

export default function Home() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory ">
      <div style={{ backgroundColor: "#9bb5bd" }} className="fixed top-0 left-0 h-screen w- bg-gray-800 text-white px-6 py-10 flex flex-col items-center justify-center gap-8 z-50">
        <a href="https://github.com/K41L3r14" target="_blank" rel="noreferrer">
          <img src="/github.png" alt="GitHub" className="w-16 h-16 object-contain brightness-125 drop-shadow-md" />
        </a>
        <a href="https://www.linkedin.com/in/katia-henrriquez-0783302a9/" target="_blank" rel="noreferrer">
          <img src="/linkedin.png" alt="LinkedIn" className="w-16 h-16 object-contain brightness-125 drop-shadow-md" />
        </a>
        <a href="mailto:henrriquezkatia7@gmail.com"
          className="transition hover:scale-105"
          aria-label="Email me">
          <img src="/gmail.png" alt="Gmail" className="w-16 h-16 object-contain brightness-125 drop-shadow-md" />
        </a>


      </div>
      <div className="flex-1 pl-6">
        <section style={{ backgroundColor: "#9bb5bd" }} className="h-screen snap-start flex items-center">
        <div className="pl-50 flex flex-col items-center">
          <img src="/profile.png" alt="Profile Picture" width={250} height={250} className="rounded-full mb-4 "/>
            <h1 className="text-White text-6xl font-mono leading-tight text-color">
              Hi, this is <br /> Katia Henrriquez
            </h1>
            <a href="#about">

            </a>
        </div>
        <div className="max-w-md text-center items-center ml-40">
          <p className="text-lg text-black mb-4 notebook text-color">I’m a passionate, curiosity-driven software engineer who loves tackling tough problems and crafting fun, memorable solutions that bring products to life.
            backend </p>
        </div>
    </section>


    <section style={{ backgroundColor: "#1b475D" }} id="aboutMe" className="h-screen snap-start">
    <AboutMeSection />
    </section>
      </div>

    </main>

  );
}
