import { StaffMember } from "@/types/common";

// Import staff images
import crystalWiebeImg from "@/assets/staffAssets/Crystal Wiebe.jpeg";
import christineWangImg from "@/assets/staffAssets/Christine Wang.png";
import gradiousTheonestImg from "@/assets/staffAssets/Gradious Theonest.jpeg";
import marcieGoodImg from "@/assets/staffAssets/Marcie Good.png";
import sheriKingImg from "@/assets/staffAssets/Sheri King.jpeg";
import reyahSobretodoImg from "@/assets/staffAssets/Reyah Sobretodo.jpeg";
import ivyTsaiImg from "@/assets/staffAssets/Ivy Tsai.jpeg";
import marielBeltranImg from "@/assets/staffAssets/MarielBeltran.jpeg";
import veronicaBalanquitImg from "@/assets/staffAssets/VeronicaBalanquit.jpeg";
import jessyMarquezImg from "@/assets/staffAssets/JessyMarquez.jpeg";
import karenGarciaImg from "@/assets/staffAssets/KarenGarcia.jpeg";

// Extract .src from Next.js static imports
const getImageSrc = (img: string | { src: string } | undefined): string => {
  if (!img) return "";
  if (typeof img === "string") return img;
  return img.src || "";
};

/**
 * Board Members Data
 *
 * Leadership and governance team members for Anhart
 */
export const boardMembers: StaffMember[] = [
  {
    name: "Keith Gordon",
    role: "Co-founder & CEO",
    bio: "Keith has spent over 25+ years bringing affordable housing projects to life across Canada. He's passionate about creating lasting communities where families can thrive.",
    isLeadership: true,
    emailDomain: "anhart.ca",
    image: "/images/keithpicture.jpg",
  },
  {
    name: "Crystal Wiebe",
    role: "CFO & Constructions",
    bio: "",
    isLeadership: true,
    emailDomain: "anhart.ca",
    image: getImageSrc(crystalWiebeImg),
  },
  {
    name: "Christine Wang",
    role: "Director",
    bio: "",
    isLeadership: true,
    emailDomain: "anhart.ca",
    image: getImageSrc(christineWangImg),
  },
  {
    name: "Gradius Theonest",
    role: "Director",
    bio: "",
    isLeadership: true,
    emailDomain: "anhart.ca",
    image: getImageSrc(gradiousTheonestImg),
  },
  {
    name: "Marcie Good",
    role: "Director",
    bio: "",
    isLeadership: true,
    emailDomain: "anhart.ca",
    image: getImageSrc(marcieGoodImg),
  },
];

/**
 * Staff Team Data
 *
 * Operational and support team members for Anhart
 */
export const staff: StaffMember[] = [
  {
    name: "Sheri King",
    role: "Business Manager",
    bio: "",
    isLeadership: true,
    emailDomain: "anhart.ca",
    image: getImageSrc(sheriKingImg),
  },
  {
    name: "Reyah Sobretodo",
    role: "Executive Administrator",
    bio: "",
    isLeadership: true,
    emailDomain: "anhart.ca",
    image: getImageSrc(reyahSobretodoImg),
  },
  {
    name: "Mariel Beltran",
    role: "Development Coordinator",
    bio: "",
    isLeadership: false,
    emailDomain: "anhart.ca",
    image: getImageSrc(marielBeltranImg),
  },
  {
    name: "Veronica Balanquit",
    role: "Project Coordinator",
    bio: "",
    isLeadership: false,
    emailDomain: "anhart.ca",
    image: getImageSrc(veronicaBalanquitImg),
  },
  {
    name: "Jessy Marquez",
    role: "Sales & Marketeer",
    bio: "",
    isLeadership: false,
    emailDomain: "anhart.ca",
    image: getImageSrc(jessyMarquezImg),
  },
  {
    name: "Damon Hui",
    role: "Project Manager",
    bio: "",
    isLeadership: false,
    emailDomain: "anhart.ca",
    image: "/images/dhuipp.jpg",
  },
  {
    name: "Dillon Hui",
    role: "Technology & Development",
    bio: "",
    isLeadership: false,
    emailDomain: "anhart.ca",
  },
  {
    name: "Ivy Tsai",
    role: "Investments Coordinator",
    bio: "",
    isLeadership: false,
    emailDomain: "anhartinvestments.ca",
    image: getImageSrc(ivyTsaiImg),
  },
  {
    name: "Karen Garcia",
    role: "Research Coordinator",
    bio: "",
    isLeadership: false,
    email: "karen.garcia@anhart.ca",
    emailDomain: "anhart.ca",
    image: getImageSrc(karenGarciaImg),
  },
];
