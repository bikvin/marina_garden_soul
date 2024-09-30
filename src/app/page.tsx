import Header from "@/components/visitor-side/header/header";
import Parallax from "@/components/visitor-side/parallax";
import About from "@/components/visitor-side/about/about";
import Services from "@/components/visitor-side/services/services";
import Portfolio from "@/components/visitor-side/portfolio/portfolio";
import Footer from "@/components/visitor-side/footer/Footer";
import HeroSection from "@/components/visitor-side/hero-section/HeroSection";

export default function Home() {
  return (
    <>
      <Header />

      <HeroSection />
      <About />
      <Services />
      <Parallax imageLink="/img/bg/garden-3.jpg" height={400}></Parallax>
      <Portfolio />
      <Footer />
    </>
  );
}
