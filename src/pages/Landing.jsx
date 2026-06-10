import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Hero from "../components/sections/Hero.jsx";
import About from "../components/sections/About.jsx";
import HowItWorks from "../components/sections/HowItWorks.jsx";
import OnboardingForm from "../components/sections/OnboardingForm.jsx";
import KycUpload from "../components/sections/KycUpload.jsx";
import Funding from "../components/sections/Funding.jsx";
import RiskDisclaimer from "../components/sections/RiskDisclaimer.jsx";
import Faq from "../components/sections/Faq.jsx";
import Contact from "../components/sections/Contact.jsx";

export default function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <OnboardingForm />
        <KycUpload />
        <Funding />
        <RiskDisclaimer />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
