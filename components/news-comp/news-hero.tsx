"use client";
// import { BobAnimation } from "@/animations/bob-animation";


export function NewsHero() {
  // Default values for missing variables
  const majorTitle = "Latest News & Updates";
  const heroDescription = "Stay updated with the latest news and events, featuring recent achievements, community highlights, and upcoming activities.";

  return (
    <section className="relative isolate min-h-[90vh] w-full overflow-hidden flex flex-col bg-linear-to-br from-primary to-secondary">
      {/* Main Background */}
      <div
        className="absolute -z-10 bg-[url('/herobg.png')] bg-cover bg-center mt-0 opacity-30 pointer-events-none"
        style={{
          width: "900px",
          height: "900px",
          top: "-100px",
          transform: "rotate(10deg)",
          transformOrigin: "0% 50%",
        }}
      />
      <div className="mt-10"></div>

      <div
        className="absolute top-0 right-0 -z-10 h-[700px] w-[700px] bg-[url('/herobg.png')] bg-cover bg-right bg-no-repeat opacity-40 pointer-events-none"
        style={{
          transform: "translateX(75%) rotate(100deg)",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 py-20 text-white mt-[10vh]">
        <div className="relative w-full max-w-3xl">
          <div className="relative rounded-2xl shadow-[0_0_15px_rgba(20,28,255,0.4),inset_0_0_10px_rgba(20,28,255,0.2)] bg-secondary/0 p-8 text-center backdrop-blur-xs before:absolute before:inset-0 before:rounded-2xl before:bg-linear-to-br before:from-[secondary]/15 before:to-[secondary]/10 before:content-['']">
            <div className="relative z-10">
              <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl">
                {majorTitle}
              </h1>
              <p className="mx-auto max-w-xl text-sm text-white/90 sm:text-base">
                {heroDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-white" />
    </section>
  )
}
