import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const slidesData = [
  {
    image: "https://i.ibb.co/GQvVf8Y/banner1.jpg",
    title: "Meet, chat, study, collaborate!",
    description:
      "Welcome to Colab Task, where friends become collaborators. Create, manage, and complete tasks together for academic excellence.",
    buttons: [
      { text: "Discover More", style: "btn-primary" },
      { text: "Latest Project", style: "btn-ghost" },
    ],
  },
  {
    image: "https://i.ibb.co/ggkg7XP/banner2.jpg",
    title: "Create and Manage Assignments",
    description:
      "Empower yourself to organize study tasks with ease. Our platform allows you to effortlessly create assignments, track progress, and grade your friends’ work.",
    buttons: [{ text: "Start Assigning", style: "btn-primary" }],
  },
  {
    image: "https://i.ibb.co/xh9ZJHn/banner3.jpg",
    title: "Study Together, Succeed Together!",
    description:
      "Unlock the potential of group study with our user-friendly web application. Collaborate with your friends in real-time, complete assignments, and watch your grades soar.",
    buttons: [{ text: "Join the Study Group", style: "btn-secondary" }],
  },
];

const HeroSection = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 4000 }}
        loop={true}
        className="relative rounded-lg"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              {/* Slide Image */}
              <img
                src={slide.image}
                alt={`banner-${index + 1}`}
                className="max-h-[80vh] w-full object-cover"
              />

              {/* Content Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#111111ad] to-[#11111152] flex flex-col justify-center items-center text-center md:text-left md:items-start px-4 sm:px-10 md:px-16 lg:px-32 text-white gap-4 md:gap-6">
                {/* Slide Title */}
                <h2 className="font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight lg:w-[70%] xl:w-[50%]">
                  {slide.title}
                </h2>

                {/* Slide Description */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl lg:w-[70%] xl:w-[50%]">
                  {slide.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                  {slide.buttons.map((button, btnIndex) => (
                    <motion.button
                      key={btnIndex}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`btn ${button.style} rounded-[4px] px-4 py-2 sm:px-6`}
                    >
                      {button.text}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
