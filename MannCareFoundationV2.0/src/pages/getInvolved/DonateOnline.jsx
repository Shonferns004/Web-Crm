import PageHero from "../../components/PageHero";
import DonateSection from "../../components/DonateSection";
import { img } from "../../utils/images";

export default function DonateOnline() {
  return (
    <>
      <PageHero desktop={img("/get-involved/hero3.jpeg")} mobile={img("/get-involved/mobile-slide3.jpeg")} alt="Donate Online" className="h-[70vh] md:h-[85vh]" />
      <DonateSection />
    </>
  );
}
