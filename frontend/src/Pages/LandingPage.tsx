import { AccordionLandingPage } from '../Components/AccordionLandingPage';
import { HeroLandingPage } from '../Components/HeroLandingPage';
import { InformationLandingPage } from '../Components/InformationLandingPage';

export const LandingPage = () => {
  return (
    <main className="relative overflow-hidden">
      <HeroLandingPage />
      <InformationLandingPage />
      <AccordionLandingPage />
    </main>
  );
};
