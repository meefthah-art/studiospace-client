"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { HERO_SLIDES } from "@/lib/constants";

export default function HeroSlider() {
  return (
    <section aria-label="Featured">
      <Swiper modules={[Autoplay, Pagination, Navigation, EffectFade]} effect="fade" loop autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }} navigation className="h-[520px] sm:h-[600px]">
        {HERO_SLIDES.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full w-full bg-secondary">
              <img src={s.image} alt="" className="absolute inset-0 h-full w-full object-cover" fetchPriority={i === 0 ? "high" : "auto"} />
              <div className="hero-spot absolute inset-0" />
              <div className="container-x relative flex h-full items-center">
                <div className="max-w-2xl pb-8 text-left text-white">
                  <h1 className="text-4xl font-bold leading-[1.05] sm:text-6xl">{s.title}</h1>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{s.text}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/studios" className="btn btn-primary btn-lg">Explore Studios</Link>
                    <Link href="/add-studio" className="btn btn-lg border-white/60 bg-white/10 text-white hover:bg-white hover:text-secondary">Host Your Space</Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
