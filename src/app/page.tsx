import Home from "@/app/users/home/page";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const page = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default page;
