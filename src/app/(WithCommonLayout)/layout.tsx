import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

function WithCommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div>
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  );
}
export default WithCommonLayout;
