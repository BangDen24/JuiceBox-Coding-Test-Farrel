"use client";

import Navbar from "@/components/ui/navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import styles from "../styles/home.module.scss";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";

// Constants untuk easy maintenance
const SLIDE_CONFIG = {
  TOTAL_SLIDES: 4,
  SLIDES: [
    {
      id: 0,
      title: "Slide 1",
      content: "Intro content...",
      buttonText: "Get a Reality Check",
      buttonStyle: "default"
    },
    {
      id: 1, 
      title: "Slide 2",
      content: "Some explanation...",
      buttonText: "Continue",
      buttonStyle: "black"
    },
    {
      id: 2,
      title: "Slide 3", 
      content: "More content...",
      buttonText: "Continue",
      buttonStyle: "black"
    },
    {
      id: 3,
      title: "Slide 4",
      content: "Final slide content...",
      buttonText: "Get Started", 
      buttonStyle: "white"
    }
  ]
} as const;

export default function Home() {
  const swiperRef = useRef<SwiperType>();
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Ref untuk animations nanti
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Current slide data
  const currentSlide = SLIDE_CONFIG.SLIDES[activeIndex] || SLIDE_CONFIG.SLIDES[0];

  // Button class mapping
  const getButtonClass = (style: string) => {
    const classMap = {
      default: styles.nextButtonDefault,
      black: styles.nextButtonBlack,
      white: styles.nextButtonWhite
    };
    return classMap[style as keyof typeof classMap] || styles.nextButtonDefault;
  };

  // Handlers
  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
    // Hook untuk GSAP animations nanti
    // animateSlideTransition(swiper.activeIndex);
  };

  const handleNext = () => {
    if (activeIndex < SLIDE_CONFIG.TOTAL_SLIDES - 1) {
      swiperRef.current?.slideNext();
    }
    // Hook untuk button animations nanti
    // animateButtonClick();
  };

  const handleBack = () => {
    swiperRef.current?.slidePrev();
  };

  const handleRefresh = () => {
    swiperRef.current?.slideTo(0);
  };

  // Setup refs untuk animations
  const setSlideRef = (index: number) => (el: HTMLDivElement | null) => {
    slideRefs.current[index] = el;
  };

  // Effect untuk initial animations nanti
  useEffect(() => {
    // Initial GSAP setup akan di sini
    // setupInitialAnimations();
  }, []);

  // Effect untuk slide change animations nanti
  useEffect(() => {
    // GSAP slide transition animations akan di sini
    // animateSlideContent(activeIndex);
  }, [activeIndex]);

  return (
    <div className={styles.container}>
      <Navbar
        showBack={activeIndex > 0}
        onBack={handleBack}
        onRefresh={handleRefresh}
      />

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        spaceBetween={50}
        slidesPerView={1}
        allowTouchMove={false}
        className={styles.swiper}
        modules={[Pagination]}
        pagination={{ clickable: true }}
      >
        {SLIDE_CONFIG.SLIDES.map((slide, index) => (
          <SwiperSlide key={slide.id} className={styles.slide}>
            <div 
              ref={setSlideRef(index)}
              className={styles.slideContent}
              data-slide={index}
            >
              <h1>{slide.title}</h1>
              <p>{slide.content}</p>
              
              {/* Placeholder untuk Lottie animations nanti */}
              <div className={styles.animationContainer}>
                {/* Lottie component akan di sini */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Button */}
      {activeIndex < SLIDE_CONFIG.TOTAL_SLIDES && (
        <div 
          ref={buttonRef}
          className={getButtonClass(currentSlide.buttonStyle)}
          data-button-style={currentSlide.buttonStyle}
        >
          <button onClick={handleNext}>
            {currentSlide.buttonText}
          </button>
        </div>
      )}
    </div>
  );
}