"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { KeyboardEvent, TouchEvent } from "react";
import type { AvailableState } from "../data/states";

type StateCarouselProps = {
  states: AvailableState[];
};

function chunkStates(states: AvailableState[], size: number) {
  const chunks: AvailableState[][] = [];
  for (let index = 0; index < states.length; index += size) {
    chunks.push(states.slice(index, index + size));
  }
  return chunks;
}

export default function StateCarousel({ states }: StateCarouselProps) {
  const [cardsPerSlide, setCardsPerSlide] = useState(1);
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const updateCardsPerSlide = () => {
      setCardsPerSlide(window.innerWidth >= 768 ? 2 : 1);
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  const slides = useMemo(() => chunkStates(states, cardsPerSlide), [states, cardsPerSlide]);
  const lastSlideIndex = Math.max(0, slides.length - 1);
  const currentSlide = Math.min(activeSlide, lastSlideIndex);

  const goToPrevious = () => {
    setActiveSlide(Math.max(0, currentSlide - 1));
  };

  const goToNext = () => {
    setActiveSlide(Math.min(lastSlideIndex, currentSlide + 1));
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) {
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? touchStartX;
    const deltaX = touchStartX - endX;

    if (deltaX > 50) {
      goToNext();
    } else if (deltaX < -50) {
      goToPrevious();
    }

    setTouchStartX(null);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToNext();
    }
  };

  return (
    <div
      role="region"
      aria-label="State budget carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative"
    >
      <p className="sr-only" aria-live="polite">
        Slide {currentSlide + 1} of {slides.length}
      </p>

      <button
        type="button"
        onClick={goToPrevious}
        disabled={currentSlide === 0}
        aria-label="Previous state"
        className="absolute left-1 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-md transition hover:border-white/30 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40 sm:flex"
      >
        <span aria-hidden="true" className="text-white">
          &#x2039;
        </span>
      </button>

      <button
        type="button"
        onClick={goToNext}
        disabled={currentSlide === lastSlideIndex}
        aria-label="Next state"
        className="absolute right-1 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-md transition hover:border-white/30 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40 sm:flex"
      >
        <span aria-hidden="true" className="text-white">
          &#x203A;
        </span>
      </button>

      <div className="overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, slideIndex) => (
            <div
              key={`slide-${slideIndex}`}
              className="w-full shrink-0"
              aria-hidden={slideIndex !== currentSlide}
            >
              <div className={`grid gap-6 ${cardsPerSlide === 2 ? "md:grid-cols-2" : "grid-cols-1"}`}>
                {slide.map((state) => (
                  <Link
                    key={state.slug}
                    href={`/${state.slug}`}
                    className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-cyan-500/30 transition-all"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <span className="text-3xl">{state.icon}</span>
                      <h3 className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
                        {state.name}
                      </h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Fiscal Year</span>
                        <span className="text-gray-200">{state.fiscalYear}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Budget</span>
                        <span className="text-gray-200">{state.totalBudget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Population</span>
                        <span className="text-gray-200">{state.population}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Per Citizen</span>
                        <span className="text-gray-200">{state.perCitizen}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Categories</span>
                        <span className="text-gray-200">{state.categories} tracked</span>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-cyan-400 transition text-sm font-medium group-hover:text-cyan-300">
                      Explore <span aria-hidden="true">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
