"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { gsap } from "gsap";

import SLIDE_CONFIG from "@/config/slides-config";
import Navbar from "@/components/ui/navbar";
import OpeningSlide from "@/components/features/slides/openingSlides";
import DescriptionSlide from "@/components/features/slides/descriptionSlides";
import FormStep from "@/components/features/slides/multiStepForm";
import FinishSlide from "@/components/features/slides/finishSlides";
import Hexagon from "@/components/ui/hexagon";
import styles from "@/styles/home.module.scss";

import AnimationData from "@/components/features/animations/JB2G_Lottie.json";
import Button from "@/components/ui/button";

export default function Home() {
  const swiperRef = useRef<SwiperType>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [descIndex, setDescIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const hexagonRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const currentSlide = SLIDE_CONFIG.SLIDES[activeIndex];
  const nextSlide = SLIDE_CONFIG.SLIDES[activeIndex + 1];

  const handleNext = () => {
    if (currentSlide.type === "description") {
      const children = currentSlide.children;
      if (descIndex < children.length - 1) {
        swiperRef.current?.slideNext();
      } else {
        if (nextSlide?.type === "form") {
          animateHexagonToLottie();
        } else {
          setActiveIndex((prev) => prev + 1);
        }
        setDescIndex(0);
      }
    } else {
      if (activeIndex < SLIDE_CONFIG.TOTAL_SLIDES - 1) {
        setActiveIndex((prev) => prev + 1);
      }
    }
  };

  const animateHexagonToLottie = () => {
    setIsTransitioning(true);
    
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex((prev) => prev + 1);
        setIsTransitioning(false);
      }
    });

    if (hexagonRef.current) {
      tl.to(hexagonRef.current, {
        scale: 0.3,
        opacity: 0,
        rotation: 180,
        duration: 0.8,
        ease: "power2.inOut"
      });
    }

    if (formRef.current) {
      tl.from(formRef.current, {
        scale: 0.3,
        opacity: 0,
        rotation: -180,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");
    }
  };

  const handleBack = () => {
    if (currentSlide.type === "description") {
      if (swiperRef.current && descIndex > 0) {
        swiperRef.current.slidePrev();
      } else {
        setActiveIndex((prev) => prev - 1);
        setDescIndex(0);
      }
    } else {
      if (activeIndex > 0) {
        const prevSlide = SLIDE_CONFIG.SLIDES[activeIndex - 1];
        if (prevSlide.type === "description") {
          const descSlides = prevSlide.children;
          setDescIndex(descSlides.length - 1);
        }
        setActiveIndex((prev) => prev - 1);
      }
    }
  };

  const handleRefresh = () => {
    setActiveIndex(0);
    setDescIndex(0);
    setIsTransitioning(false);
  };

  const hexVariant = currentSlide.type === "opening" ? "large" : "small";

  const showBack =
    activeIndex > 0 || (currentSlide.type === "description" && descIndex > 0);

  const showHexagon = (
    currentSlide.type === "opening" || 
    currentSlide.type === "description" || 
    isTransitioning
  );

  return (
    <main className={styles.mainContainer}>
      <Navbar
        showBack={showBack}
        onBack={handleBack}
        onRefresh={handleRefresh}
      />

      {showHexagon && (
        <div 
          ref={hexagonRef}
          className={styles.hexContainer}
          style={{ 
            visibility: isTransitioning ? 'visible' : 'visible',
            zIndex: isTransitioning ? 20 : -1
          }}
        >
          <Hexagon animate size={hexVariant} />
        </div>
      )}

      <div style={{ position: "relative", zIndex: 10 }}>
        {currentSlide.type === "opening" && !isTransitioning && (
          <OpeningSlide
            title={currentSlide.title}
            buttonText={currentSlide.buttonText}
            onNext={handleNext}
          />
        )}

        {currentSlide.type === "description" && !isTransitioning && (
          <>
            <div className={styles.swiperWrapper}>
              <Swiper
                key={`desc-${activeIndex}`}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  if (descIndex > 0) {
                    setTimeout(() => {
                      swiper.slideTo(descIndex, 0);
                    }, 0);
                  }
                }}
                onSlideChange={(swiper) => setDescIndex(swiper.activeIndex)}
                spaceBetween={50}
                slidesPerView={1}
                allowTouchMove={false}
                modules={[Pagination]}
                pagination={{ clickable: true }}
              >
                {currentSlide.children?.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <DescriptionSlide content={slide.content} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className={styles.nextButton}>
              <Button variant="black" onClick={handleNext}>
                {currentSlide?.children[descIndex]?.buttonText}
              </Button>
            </div>
          </>
        )}

        {currentSlide.type === "form" && !isTransitioning && (
          <div ref={formRef}>
            <FormStep
              key={currentSlide.id}
              animationData={AnimationData}
              questionText={currentSlide.questionText}
              inputType={currentSlide.inputType}
              placeholder={currentSlide.placeholder}
              initialValue={formValues[currentSlide.id] || ""}
              error={formErrors[currentSlide.id]}
              buttonText={currentSlide.buttonText}
              onNext={(val) => {
                setFormValues({ ...formValues, [currentSlide.id]: val });
                handleNext();
              }}
            />
          </div>
        )}

        {currentSlide.type === "finish" && !isTransitioning && (
          <FinishSlide
            animationData={AnimationData}
            title={currentSlide.title}
            subtitle={currentSlide.subtitle}
            buttonText={currentSlide.buttonText}
            onFinish={handleNext}
            formValues={formValues}
          />
        )}
      </div>
    </main>
  );
}