import Image from "next/image";
import { FC } from "react";
import Image2 from "@/assets/image/placeholder/hp-lady-plus-1.jpg";
import PopupChildren from "@/components/ui/PopupChildren";
import Button from "@/components/ui/Button";
import AnimateHeader from "@/components/ui/AnimateHeader";
import Link from "next/link";

const GetCertificate: FC = () => {
  const words =
    "Seize Convenience and Peace of Mind with Online Medical Certificates".split(
      " "
    );
  return (
    <div className="flex container flex-col lg:flex-row max-lg:items-center justify-between px-5 md:px-8 my-5 md:my-16">
      {/* Left Section */}
      <div className="max-lg:flex flex-col max-lg:text-center w-full max-lg:items-center mb-10">
        <AnimateHeader
          words={words}
          className="max-w-sm mb-4 text-primary"
        ></AnimateHeader>
        <p className="text-lg mb-8 text-gray-600">
          Request Your Medical Certificate Within Minutes: Friendly and
          Personalised Healthcare Access Awaits
        </p>
        <Link href="/medical-certificate">
          <Button size="big" className="btn max-w-[250px]">
            Consult Now
          </Button>
        </Link>
      </div>

      {/* Right Section */}
      <div className="relative  flex justify-center">
        <div className="flex mb-8 items-center justify-center">
          <PopupChildren>
            <Image
              src={Image2}
              alt="Medical Certificate Concept2"
              width={400}
              height={250}
              className="rounded-lg max-md:w-60 md:max-w-[400px] w-full"
              style={{ width: "auto", height: "auto", aspectRatio: "auto" }}
            />
          </PopupChildren>
        </div>
      </div>
    </div>
  );
};

export default GetCertificate;
