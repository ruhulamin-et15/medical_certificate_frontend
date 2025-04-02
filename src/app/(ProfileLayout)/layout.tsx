import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import PrivetLayout from "@/utils/layouts/PrivetLayout";

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <PrivetLayout>
      <div className="flex min-h-screen flex-col justify-between">
        <div>
          <Navbar />
          {children}
        </div>
        <Footer />
      </div>
    </PrivetLayout>
  );
}
export default ProfileLayout;
