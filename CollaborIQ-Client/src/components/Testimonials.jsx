/* eslint-disable react/prop-types */
import { useLoaderData } from "react-router-dom";
import Marquee from "../hooks/marquee";
import { cn } from "../utils/utils";

// const reviews = [
//   {
//     _id: "67683f403b1a89d46a425956",
//     name: "Jozef Albino", // spell-check-ignore-line
//     age: "20 Years old",
//     review:
//       "This e-course really helped me develop my graphic design skills. The material was complete and the mentor was very supportive!",
//     rating: 4.5,
//     institution: "IAIN Surakarta", // spell-check-ignore-line
//     img: "https://via.placeholder.com/32", // Placeholder image URL
//   },
//   {
//     _id: "67683f403b1a89d46a425957",
//     name: "Mark Benson",
//     age: "22 Years old",
//     review:
//       "This e-course opened doors to new opportunities in the tech industry. Highly recommended!",
//     rating: 4.8,
//     institution: "Tech Academy",
//     img: "https://via.placeholder.com/32", // Placeholder image URL
//   },
//   {
//     _id: "67683f403b1a89d46a425958",
//     name: "Alina Cruz", // spell-check-ignore-line
//     age: "25 Years old",
//     review: "Amazing content and mentors! I feel confident in my skills now.",
//     rating: 4.7,
//     institution: "Skill Booster",
//     img: "https://via.placeholder.com/32", // Placeholder image URL
//   },
// ];

const ReviewCard = ({ img, name, review, rating, institution }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img
          className="rounded-full"
          width="32"
          height="32"
          alt={`${name}'s profile`}
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">
            {institution}
          </p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{review}</blockquote>
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Rating: {rating} / 5
      </div>
    </figure>
  );
};

const Testimonials = () => {
  const reviews = useLoaderData();
  const firstRow = reviews.slice(0, reviews.length / 3);

  return (
    <div className="bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 dark:text-gray-200">
          What are they saying?
        </h2>
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden py-10">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard key={review._id} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-gray-900"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-gray-900"></div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
