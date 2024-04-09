import { HeroLandingPage } from '../Components/HeroLandingPage';
import { InformationLandingPage } from '../Components/InformationLandingPage';
import { AccordionLandingPage } from '../Components/AccordionLandingPage';
import { CTALandingPage } from '../Components/CTALandingPage';
import { FooterLandingPage } from '../Components/FooterLandingPage';

export const LandingPage = () => {
  return (
    <main className="relative bg-gradient-to-r from-indigo-500/40 via-white to-indigo-500/40 text-gray-800 overflow-hidden">
      <HeroLandingPage />
      <InformationLandingPage />
      <AccordionLandingPage />
      <CTALandingPage />
      <FooterLandingPage />
    </main>
  );
};
