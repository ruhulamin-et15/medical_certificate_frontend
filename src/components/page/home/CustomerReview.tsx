import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import Image1 from "@/assets/image/png/tgc-happy-man-seq-opt.jpg";
import Image2 from "@/assets/image/png/tgc-test-women-3.jpg";
import Image3 from "@/assets/image/png/tgc-test-women-4.jpg";
import PopupChildren from "@/components/ui/PopupChildren";
import AnimateHeader from "@/components/ui/AnimateHeader";

interface Testimonial {
  name: string;
  location: string;
  image: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ethan",
    location: "Birmingham",
    image: Image1.src,
    rating: 5,
    text: "\"Effortlessly Acquired My Doctors Note! — I'm incredibly pleased with the convenience of obtaining a Doctor's Note through this platform. The process was quick and user-friendly, sparing me the hassle of booking an appointment with my GP.\"",
  },
  {
    name: "Maureen",
    location: "Chelmsford",
    image: Image2.src,
    rating: 5,
    text: "\"Life- Saver in Times of Urgency! — This service is fantastic! I needed a Doctor's Note urgently, and this website came to my rescue. In just a few hours, I had my Doctor's Note. Kudos to the team for creating such an invaluable solution.\"",
  },
  {
    name: "Torill",
    location: "Colchester",
    image: Image3.src,
    rating: 5,
    text: '"User - Friendly and Reliable Service! — I recently used this platform to obtain my digital medical certificate, and I\'m impressed! The website is incredibly user-friendly, making the whole process a breeze. Plus, the certificates are recognised by authorities without any issues."',
  },
];

function CustomerReview() {
  const words = "Hear What Our Customers Say:".split(" ");
  return (
    <div
      id="reviews"
      className="bg-[#FFF3EA]   flex flex-col items-center justify-center"
    >
      <div className="px-5 md:px-10 container  my-10 md:my-20 w-full">
        <AnimateHeader
          words={words}
          className="mb-10 text-primary"
          center
        ></AnimateHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <PopupChildren className="h-full" key={index}>
              <div className="bg-white p-5 h-full rounded-2xl flex flex-col justify-between ">
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <div className="flex items-center flex-wrap">
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.name}'s profile`}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar
                        key={i}
                        className="w-5 h-5 p-px fill-pink-300 text-pink-300"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </PopupChildren>
          ))}
        </div>
      </div>
    </div>
  );
}
export default CustomerReview;
