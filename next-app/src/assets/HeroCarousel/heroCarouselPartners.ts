import propestcleanImg from "../partnercarousel/propestcleanlogo.png";
import comBuildImg from "./CommunityBuilders.png";
import AACImg from "./AAC.png";
import gwaImg from "./gwa.svg";
import smartantImg from "./smartant.png";
import FISHImg from "./FISH.png";
import PURPOSEImg from "./Purpose.png";
import QUIXULINImg from "./QUIXULIN.png";
import OTTVALImg from "./OTTVAL.png";
import SVImg from "./SV.png";
import TPOSImg from "./TPOS.png";
import GLCImg from "./GLC.png";
import ATCOImg from "./atco.jpg";
import LCLAImg from "./lcla.png";
import MWGImg from "./markwilson.jpg";

const getImageSrc = (img: string | { src?: string }): string =>
  typeof img === "string" ? img : img?.src || "";

export interface HeroCarouselPartner {
  src: string;
  /** Public website URL for this partner (opens in a new tab from the hero marquee). */
  website: string;
  /** Short name for accessibility (e.g. link label). */
  name: string;
  /** When true, partner is omitted from the hero marquee (kept in data for later). */
  hidden?: boolean;
}

/** Partner logos for the hero marquee — files live in this folder (`src/assets/HeroCarousel`). */
export const heroCarouselPartners: HeroCarouselPartner[] = [
  {
    src: getImageSrc(propestcleanImg),
    website: "https://www.propestclean.ca/",
    name: "Pro Pest Clean",
  },
  {
    src: getImageSrc(comBuildImg),
    website: "https://www.communitybuilders.ca/",
    name: "Community Builders",
  },
  {
    src: getImageSrc(AACImg),
    website: "https://anhartconstruction.ca/",
    name: "Anhart Construction",
  },
  {
    src: getImageSrc(gwaImg),
    website: "https://www.gwaarchitecture.com/",
    name: "GWA Architecture",
  },
  {
    src: getImageSrc(smartantImg),
    website: "https://smartant.ca/",
    name: "Smart Ant",
  },
  {
    src: getImageSrc(FISHImg),
    website:
      "https://www.facebook.com/p/Fraser-Inclusive-and-Supportive-Housing-Society-100068298222053/",
    name: "Fraser Inclusive and Supportive Housing Society",
  },
  {
    src: getImageSrc(PURPOSEImg),
    website: "https://www.purposeconstruction.ca/",
    name: "Purpose Construction",
  },
  {
    src: getImageSrc(QUIXULINImg),
    website: "https://quixulin.com/",
    name: "Quixulin",
  },
  {
    src: getImageSrc(OTTVALImg),
    website: "https://ovah.ca/",
    name: "Ottawa Valley Affordable Housing (OVAH)",
  },
  {
    src: getImageSrc(SVImg),
    website: "https://sustainable-villages.org/",
    name: "Sustainable Villages",
  },
  {
    src: getImageSrc(TPOSImg),
    website: "https://thepowerofsmall.net/",
    name: "The Power of Small",
  },
  {
    src: getImageSrc(GLCImg),
    website: "https://gottalovecanada.ca/",
    name: "Gotta Love Canada",
  },
  {
    src: getImageSrc(ATCOImg),
    website: "https://www.atco.com/en-ca.html",
    name: "ATCO",
  },
  {
    src: getImageSrc(LCLAImg),
    website: "https://www.lcla.ca/",
    name: "LCLA",
  },
  {
    src: getImageSrc(MWGImg),
    website: "https://markwilsongroup.ca/",
    name: "Mark Wilson Group",
  },
];
