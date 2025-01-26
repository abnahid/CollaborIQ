import CallToAction from "../components/CallToAction";
import Faqs from "../components/faqs";
import FeaturesSection from "../components/FeaturesSection";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <Testimonials />
      <CallToAction />
      <Faqs />
    </div>
  );
};

export default Home;
