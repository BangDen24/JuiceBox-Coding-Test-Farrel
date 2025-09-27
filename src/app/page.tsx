"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import SLIDE_CONFIG from "@/config/slides-config";
import Navbar from "@/components/ui/navbar";
import OpeningSlide from "@/components/features/slides/openingSlides";
import DescriptionSlide from "@/components/features/slides/descriptionSlides";
import FormStep from "@/components/features/slides/multiStepForm";
import FinishSlide from "@/components/features/slides/finishSlides";

import AnimationData from "@/components/features/animations/JB2G_Lottie.json";

export default function Home() {
  const swiperRef = useRef<SwiperType>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [descIndex, setDescIndex] = useState(0);

  const currentSlide = SLIDE_CONFIG.SLIDES[activeIndex];

  // navigation handlers
  const handleNext = () => {
    if (activeIndex < SLIDE_CONFIG.TOTAL_SLIDES - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentSlide.type === "description") {
      if (descIndex > 0) {
        swiperRef.current?.slidePrev();
        setActiveIndex((prev) => prev - 1);
      } else {
        setActiveIndex((prev) => prev - 1);
      }
    } else {
      if (activeIndex > 0) {
        setActiveIndex((prev) => prev - 1);
      }
    }
  };

  const handleRefresh = () => {
    setActiveIndex(0);
  };

  console.log(formValues);
  return (
    <div>
      <Navbar
        showBack={activeIndex > 0}
        onBack={handleBack}
        onRefresh={handleRefresh}
      />

      {/* SWITCH BY SLIDE TYPE */}
      {currentSlide.type === "opening" && (
        <OpeningSlide
          title={currentSlide.title}
          content={currentSlide.content}
          buttonText={currentSlide.buttonText}
          onNext={handleNext}
        />
      )}

      {currentSlide.type === "description" && (
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            swiper.slideTo(descIndex, 0);
          }}
          onSlideChange={(swiper) => setDescIndex(swiper.activeIndex)}
          spaceBetween={50}
          slidesPerView={1}
          allowTouchMove={false}
          modules={[Pagination]}
          pagination={{ clickable: true }}
        >
          {SLIDE_CONFIG.SLIDES.filter((s) => s.type === "description").map(
            (slide) => (
              <SwiperSlide key={slide.id}>
                <DescriptionSlide
                  title={slide.title}
                  content={slide.content}
                  buttonText={slide.buttonText}
                  onNext={() => {
                    if (swiperRef.current?.isEnd) {
                      handleNext();
                    } else {
                      swiperRef.current?.slideNext();
                      setActiveIndex((prev) => prev + 1);
                    }
                  }}
                />
              </SwiperSlide>
            )
          )}
        </Swiper>
      )}

      {currentSlide.type === "form" && (
        <FormStep
          questionText={currentSlide.questionText}
          inputType={currentSlide.inputType}
          placeholder={currentSlide.placeholder}
          initialValue={formValues[currentSlide.id] || ""} // kasih default
          error={formErrors[currentSlide.id]}
          buttonText={currentSlide.buttonText}
          onNext={(val) => {
            setFormValues({ ...formValues, [currentSlide.id]: val }); // save ke global
            handleNext(); // lanjut slide
          }}
        />
      )}

      {currentSlide.type === "finish" && (
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
  );
}
