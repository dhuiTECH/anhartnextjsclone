import propestcleanImg from "./propestcleanlogo.png";
import comBuildImg from "./CommunityBuilders.png";
import AACImg from "./AAC.png";
import gwaImg from "./gwa.svg";
import smartantImg from "./smartant.png";
import FISHImg from "./FISH.png";
import PURPOSEImg from "./Purpose.jpg";
import QUIXULINImg from "./QUIXULIN.png";
import OTTVALImg from "./OTTVAL.png";
import SVImg from "./SV.png";
import TPOSImg from "./TPOS.png";
import GLCImg from "./GLC.png";
import ATCOImg from "./atco.jpg";
import LCLAImg from "./lcla.jpg";
import MWGImg from "./markwilson.jpg";

const getImageSrc = (img: string | { src?: string }): string =>
  typeof img === "string" ? img : img?.src || "";

export interface HeroCarouselPartner {
  src: string;
  website: string;
}

/** Partner logos for the hero marquee — files live in this folder (`src/assets/HeroCarousel`). */
export const heroCarouselPartners: HeroCarouselPartner[] = [
  { src: getImageSrc(propestcleanImg), website: "https://www.propestclean.ca/" },
  { src: getImageSrc(comBuildImg), website: "https://www.communitybuilders.ca/" },
  { src: getImageSrc(AACImg), website: "https://anhartconstruction.ca/" },
  { src: getImageSrc(gwaImg), website: "https://www.gwaarchitecture.com/" },
  { src: getImageSrc(smartantImg), website: "https://smartant.ca/" },
  {
    src: getImageSrc(FISHImg),
    website:
      "https://www.facebook.com/p/Fraser-Inclusive-and-Supportive-Housing-Society-100068298222053/",
  },
  { src: getImageSrc(PURPOSEImg), website: "https://www.purposeconstruction.ca/" },
  { src: getImageSrc(QUIXULINImg), website: "https://quixulin.com/" },
  { src: getImageSrc(OTTVALImg), website: "https://www.ahaov.com/" },
  { src: getImageSrc(SVImg), website: "https://sustainable-villages.org/" },
  { src: getImageSrc(TPOSImg), website: "https://thepowerofsmall.net/" },
  { src: getImageSrc(GLCImg), website: "https://gottalovecanada.ca/" },
  { src: getImageSrc(ATCOImg), website: "https://www.atco.com/en-ca.html" },
  { src: getImageSrc(LCLAImg), website: "https://www.lcla.ca/" },
  { src: getImageSrc(MWGImg), website: "https://markwilsongroup.ca/" },
];
