"use client";

// import { useEffect, useRef } from "react";
// import { motion } from "framer-motion";
import Image from "next/image";
// import ManImage from "@/assets/image/png/doctor.png";
// import BgImage from "@/assets/image/png/hp-topstrip-bg2.jpg";
// import ConsultImage from "@/assets/image/png/cirtificate-icon.png";
import banner from "@/assets/image/pixelcut-export.jpeg";
// import banner from "@/assets/freepik__adjust__49520.jpg";
import banner2 from "@/assets/image/freepik__adjust__49520 (7).jpg";

// import Button from "@/components/ui/Button";
import Link from "next/link";
import Button from "@/components/ui/Button";
// import { GoStarFill } from "react-icons/go";
// import AnimateHeader from "@/components/ui/AnimateHeader";
// import Link from "next/link";
// import Button from "@/components/ui/Button";

export default function Banner() {
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [isVisible, setIsVisible] = useState(false); // State to track visibility
  // const bannerRef = useRef<HTMLDivElement | null>(null); // Ref to the Banner component

  // useEffect(() => {
  //   // Set the loaded state after the component mounts
  //   if (document) setIsLoaded(true);
  // }, []);

  // useEffect(() => {
  //   // Create an Intersection Observer to track visibility of the banner
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       // Update isVisible based on entry's intersection status
  //       if (entry.isIntersecting) {
  //         setIsVisible(true);
  //       } else {
  //         setIsVisible(false); // Reset to false when out of view
  //       }
  //     },
  //     { threshold: 0.1 } // Trigger when 10% of the element is visible
  //   );

  //   if (bannerRef.current) {
  //     observer.observe(bannerRef.current);
  //   }

  //   // Cleanup observer on component unmount
  //   return () => {
  //     if (bannerRef.current) {
  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  //       observer.unobserve(bannerRef.current);
  //     }
  //   };
  // }, [bannerRef]);

  // const words = "The Easiest Way to Getting Your Medical Certificates".split(
  //   " "
  // );
  // //  ${isLoaded ? "opacity-100" : "opacity-0" }
  return (
    <div className="relative max-w-[2600px] mx-auto overflow-hidden">
      <Image
        src={banner}
        className="h-full block xl:hidden  w-full  object-center md:object-top"
        alt="banner"
        width={banner.width}
        height={banner.height}
        priority
      />
      <Image
        src={banner2}
        className="h-full hidden xl:block  w-full md:object-cover object-center md:object-top"
        alt="banner"
        width={banner2.width}
        height={banner2.height}
        priority
      />
      <div className="bg-white min-2000:left-[10%] min-2000:rounded-l-xl rounded-r-3xl xl:absolute left-0 xl:top-[50%] xl:-translate-y-1/2 w-full max-w-3xl leading-tight space-y-3 py-8 xl:py-10 px-[5%] flex flex-col gap-5 justify-around h-[85%] min-h-[350px] max-h-[600px]">
        {/* Flexbox applied for vertical centering */}
        <h1 className="text-primary hidden xl:inline font-semibold text-[1.8rem] md:text-[2.4rem] lg:text-[3rem]">
          The Easiest Way to Get <br /> Your Medical <br /> Certificates
        </h1>
        <h1 className="text-primary font-bold inline xl:hidden text-[2rem] md:text-[2.4rem] lg:text-[3rem]">
          The Easiest Way to Get Your Medical Certificates
        </h1>
        <p className="text-xl lg:text-3xl font-medium max-w-lg">
          Same Day Medical Certificates No Appointment Needed, Lowest Price in
          the UK.
        </p>
        <Link href={"/medical-certificate"} className="text-center">
          <Button className="px-2 md:px-4 font-bold py-2 md:py-2 text-lg  md:text-xl rounded-md border-2 border-primary text-primary">
            Get My Medical Certificate For £25
          </Button>
        </Link>
      </div>
    </div>
  );
}
