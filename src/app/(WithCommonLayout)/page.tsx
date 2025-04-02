import Banner from "@/components/page/home/Banner";
import FAQSection from "@/components/page/home/FAQSection";
import HowMayWeHelp from "@/components/page/home/HowMayWeHelp";
import MedicalCertificate from "@/components/page/home/MedicalCirtificate";
import ServiceAndStatiestics from "@/components/page/home/ServiceAndStatiestics";
import StepSection from "@/components/page/home/StepSection";
// import GetCertificate from "@/components/page/home/GetCirtificate";

const Home = () => {
  return (
    <div>
      <Banner />
      <ServiceAndStatiestics />
      <HowMayWeHelp />
      <StepSection />
      {/* <CustomerReview /> */}
      <MedicalCertificate />
      <FAQSection />
      {/* <GetCertificate /> */}
    </div>
  );
};

export default Home;
