

export default function Home() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <section style={{ backgroundColor: "#efe0bb" }} className="h-screen snap-start flex items-center">
        <div className="pl-10">
            <h1 className="text-black text-6xl font-mono leading-tight ">
              Hi, this is <br /> Katia Henrriquez
            </h1>
            <a href="#about">

            </a>
        </div>
        <div className="max-w-md text-center items-center">
          <p className="text-lg text-gray-700 mb-4">i am a software i have worked on multiple  </p>
        </div>
    </section>


    <section style={{ backgroundColor: "#722c35" }} id="aboutMe" className="h-screen snap-start">

    </section>
    </main>

  );
}
