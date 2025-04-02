import Image from "next/image";
import Image1 from "@/assets/image_2024_11_30T14_27_03_903Z-removebg-preview.png";
import PopupChildren from "@/components/ui/PopupChildren";
import Header from "@/components/ui/Header";

const MedicalCertificate: React.FC = () => {
  return (
    <div className="py-10 md:py-16 lg:py-20 mx-5 md:mx-8 2xl:mx-0">
      <Header center large>
        Shaping the Future of Healthcare
      </Header>
      <div className="flex flex-col lg:flex-row items-center justify-center my-5 md:my-10 bg-white">
        <div className="lg:hidden flex p-4 mb-8 items-center justify-center">
          <PopupChildren className="px-4">
            <Image
              src={Image1}
              alt="Medical Certificate Concept"
              width={400}
              height={250}
              className="rounded-lg max-w-[200px] md:max-w-[400px] w-full"
              style={{ width: "auto", height: "auto", aspectRatio: "auto" }}
            />
          </PopupChildren>
        </div>
        <div className="md:mb-6 lg:mb-0">
          <div className="max-w-md">
            <p className="text-lg text-primary mb-4">
              In today&apos;s fast-paced world, telehealth is changing how
              people access healthcare. With traditional systems struggling,
              Medic Online offers a simpler solution. We are the most affordable
              in the UK, charging just £25 for all medical certificates.
            </p>
            <p className="text-lg text-primary mb-4">
              Using advanced technology, we make the process easy and
              accessible, no matter where you are. Join us in shaping a more
              affordable, efficient healthcare future. At Medic Online, we’re
              committed to improving your experience at the lowest price.
            </p>
          </div>
        </div>
        <div className="lg:w-1/3 hidden lg:flex items-center justify-center">
          <PopupChildren>
            <Image
              priority
              src={Image1}
              alt="Medical Certificate Concept"
              width={350}
              height={250}
              className="rounded-lg max-w-[350px] w-full"
              style={{ width: "auto", height: "auto" }}
            />
          </PopupChildren>
        </div>
      </div>
    </div>
  );
};

export default MedicalCertificate;
