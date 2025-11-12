/**
 * Image Registry
 * 
 * Centralized registry for all optimized image variants.
 * Maps image names to their WebP, AVIF, and fallback formats
 * with different size variants for responsive loading.
 */

import { ImageFormats, ImageConfig, ImageCategory } from '@/types/images';

// Import all optimized image variants
// Hero Images
import aboutHeroSm from './baseAssets/about-hero-640x360.webp';
import aboutHeroMd from './baseAssets/about-hero-768x432.webp';
import aboutHeroLg from './baseAssets/about-hero-1024x576.webp';
import aboutHeroXl from './baseAssets/about-hero-1280x720.webp';
import aboutHeroSmAvif from './baseAssets/about-hero-640x360.webp';
import aboutHeroMdAvif from './baseAssets/about-hero-768x432.webp';
import aboutHeroLgAvif from './baseAssets/about-hero-1024x576.webp';
import aboutHeroXlAvif from './baseAssets/about-hero-1280x720.webp';
import aboutHeroFallback from './about-hero.jpg';

import contactHeroSm from './baseAssets/contact-hero-640x360.webp';
import contactHeroMd from './baseAssets/contact-hero-768x432.webp';
import contactHeroLg from './baseAssets/contact-hero-1024x576.webp';
import contactHeroXl from './baseAssets/contact-hero-1280x720.webp';
import contactHeroSmAvif from './baseAssets/contact-hero-640x360.webp';
import contactHeroMdAvif from './baseAssets/contact-hero-768x432.webp';
import contactHeroLgAvif from './baseAssets/contact-hero-1024x576.webp';
import contactHeroXlAvif from './baseAssets/contact-hero-1280x720.webp';
import contactHeroFallback from './contact-hero.jpg';

import impactHeroSm from './baseAssets/impact-hero-640x360.webp';
import impactHeroMd from './baseAssets/impact-hero-768x432.webp';
import impactHeroLg from './baseAssets/impact-hero-1024x576.webp';
import impactHeroXl from './baseAssets/impact-hero-1280x720.webp';
import impactHeroSmAvif from './baseAssets/impact-hero-640x360.webp';
import impactHeroMdAvif from './baseAssets/impact-hero-768x432.webp';
import impactHeroLgAvif from './baseAssets/impact-hero-1024x576.webp';
import impactHeroXlAvif from './baseAssets/impact-hero-1280x720.webp';
import impactHeroFallback from './impact-hero.jpg';

import mediaHeroSm from './baseAssets/media-hero-640x360.webp';
import mediaHeroMd from './baseAssets/media-hero-768x432.webp';
import mediaHeroLg from './baseAssets/media-hero-1024x576.webp';
import mediaHeroXl from './baseAssets/media-hero-1280x720.webp';
import mediaHeroSmAvif from './baseAssets/media-hero-640x360.webp';
import mediaHeroMdAvif from './baseAssets/media-hero-768x432.webp';
import mediaHeroLgAvif from './baseAssets/media-hero-1024x576.webp';
import mediaHeroXlAvif from './baseAssets/media-hero-1280x720.webp';
import mediaHeroFallback from './media-hero.jpg';

import partnerHeroSm from './baseAssets/partner-hero-640x360.webp';
import partnerHeroMd from './baseAssets/partner-hero-768x432.webp';
import partnerHeroLg from './baseAssets/partner-hero-1024x576.webp';
import partnerHeroXl from './baseAssets/partner-hero-1280x720.webp';
import partnerHeroSmAvif from './baseAssets/partner-hero-640x360.webp';
import partnerHeroMdAvif from './baseAssets/partner-hero-768x432.webp';
import partnerHeroLgAvif from './baseAssets/partner-hero-1024x576.webp';
import partnerHeroXlAvif from './baseAssets/partner-hero-1280x720.webp';
import partnerHeroFallback from './partner-hero.jpg';

import partnerHeroFriendlySm from './baseAssets/partner-hero-friendly-640x360.webp';
import partnerHeroFriendlyMd from './baseAssets/partner-hero-friendly-768x432.webp';
import partnerHeroFriendlyLg from './baseAssets/partner-hero-friendly-1024x576.webp';
import partnerHeroFriendlyXl from './baseAssets/partner-hero-friendly-1280x720.webp';
import partnerHeroFriendlySmAvif from './baseAssets/partner-hero-friendly-640x360.webp';
import partnerHeroFriendlyMdAvif from './baseAssets/partner-hero-friendly-768x432.webp';
import partnerHeroFriendlyLgAvif from './baseAssets/partner-hero-friendly-1024x576.webp';
import partnerHeroFriendlyXlAvif from './baseAssets/partner-hero-friendly-1280x720.webp';
import partnerHeroFriendlyFallback from './partner-hero-friendly.jpg';

import portfolioHeroSm from './baseAssets/portfolio-hero-640x360.webp';
import portfolioHeroMd from './baseAssets/portfolio-hero-768x432.webp';
import portfolioHeroLg from './baseAssets/portfolio-hero-1024x576.webp';
import portfolioHeroXl from './baseAssets/portfolio-hero-1280x720.webp';
import portfolioHeroSmAvif from './baseAssets/portfolio-hero-640x360.webp';
import portfolioHeroMdAvif from './baseAssets/portfolio-hero-768x432.webp';
import portfolioHeroLgAvif from './baseAssets/portfolio-hero-1024x576.webp';
import portfolioHeroXlAvif from './baseAssets/portfolio-hero-1280x720.webp';
import portfolioHeroFallback from './portfolio-hero.jpg';

import programsHeroSm from './baseAssets/programs-hero-640x360.webp';
import programsHeroMd from './baseAssets/programs-hero-768x432.webp';
import programsHeroLg from './baseAssets/programs-hero-1024x576.webp';
import programsHeroXl from './baseAssets/programs-hero-1280x720.webp';
import programsHeroSmAvif from './baseAssets/programs-hero-640x360.webp';
import programsHeroMdAvif from './baseAssets/programs-hero-768x432.webp';
import programsHeroLgAvif from './baseAssets/programs-hero-1024x576.webp';
import programsHeroXlAvif from './baseAssets/programs-hero-1280x720.webp';
import programsHeroFallback from './programs-hero.jpg';

import researchHeroSm from './baseAssets/research-hero-640x360.webp';
import researchHeroMd from './baseAssets/research-hero-768x432.webp';
import researchHeroLg from './baseAssets/research-hero-1024x576.webp';
import researchHeroXl from './baseAssets/research-hero-1280x720.webp';
import researchHeroSmAvif from './baseAssets/research-hero-640x360.webp';
import researchHeroMdAvif from './baseAssets/research-hero-768x432.webp';
import researchHeroLgAvif from './baseAssets/research-hero-1024x576.webp';
import researchHeroXlAvif from './baseAssets/research-hero-1280x720.webp';
import researchHeroFallback from './research-hero.jpg';

import blogHeroXl from './baseAssets/blog-hero-1280x720.webp';
import blogHeroFallback from './baseAssets/blog-hero-1280x720.webp';

// Project Images
import main162Sm from './baseAssets/162Main-320x180.webp';
import main162Md from './baseAssets/162Main-384x216.webp';
import main162Lg from './baseAssets/162Main-512x288.webp';
import main162Xl from './baseAssets/162Main-640x360.webp';
import main162SmAvif from './baseAssets/162Main-320x180.webp';
import main162MdAvif from './baseAssets/162Main-384x216.webp';
import main162LgAvif from './baseAssets/162Main-512x288.webp';
import main162XlAvif from './baseAssets/162Main-640x360.webp';
import main162Fallback from './162Main.png';

import main162_2Sm from './baseAssets/162Main_2-320x180.webp';
import main162_2Md from './baseAssets/162Main_2-384x216.webp';
import main162_2Lg from './baseAssets/162Main_2-512x288.webp';
import main162_2Xl from './baseAssets/162Main_2-640x360.webp';
import main162_2SmAvif from './baseAssets/162Main_2-320x180.webp';
import main162_2MdAvif from './baseAssets/162Main_2-384x216.webp';
import main162_2LgAvif from './baseAssets/162Main_2-512x288.webp';
import main162_2XlAvif from './baseAssets/162Main_2-640x360.webp';
import main162_2Fallback from './162Main_2.png';

import dodsonSm from './baseAssets/DodsonsRooms_1-320x180.webp';
import dodsonMd from './baseAssets/DodsonsRooms_1-384x216.webp';
import dodsonLg from './baseAssets/DodsonsRooms_1-512x288.webp';
import dodsonXl from './baseAssets/DodsonsRooms_1-640x360.webp';
import dodsonSmAvif from './baseAssets/DodsonsRooms_1-320x180.webp';
import dodsonMdAvif from './baseAssets/DodsonsRooms_1-384x216.webp';
import dodsonLgAvif from './baseAssets/DodsonsRooms_1-512x288.webp';
import dodsonXlAvif from './baseAssets/DodsonsRooms_1-640x360.webp';
import dodsonFallback from './DodsonsRooms_1.png';

import merrittSm from './baseAssets/Meritt_TH_1-320x180.webp';
import merrittMd from './baseAssets/Meritt_TH_1-384x216.webp';
import merrittLg from './baseAssets/Meritt_TH_1-512x288.webp';
import merrittXl from './baseAssets/Meritt_TH_1-640x360.webp';
import merrittSmAvif from './baseAssets/Meritt_TH_1-320x180.webp';
import merrittMdAvif from './baseAssets/Meritt_TH_1-384x216.webp';
import merrittLgAvif from './baseAssets/Meritt_TH_1-512x288.webp';
import merrittXlAvif from './baseAssets/Meritt_TH_1-640x360.webp';
import merrittFallback from './Meritt_TH_1.png';

import merrittNewFallback from './merritt.png';

import ryder1Sm from './baseAssets/Ryder_1-320x180.webp';
import ryder1Md from './baseAssets/Ryder_1-384x216.webp';
import ryder1Lg from './baseAssets/Ryder_1-512x288.webp';
import ryder1Xl from './baseAssets/Ryder_1-640x360.webp';
import ryder1SmAvif from './baseAssets/Ryder_1-320x180.webp';
import ryder1MdAvif from './baseAssets/Ryder_1-384x216.webp';
import ryder1LgAvif from './baseAssets/Ryder_1-512x288.webp';
import ryder1XlAvif from './baseAssets/Ryder_1-640x360.webp';
import ryder1Fallback from './TheRyder.jpeg';

import ryder2Sm from './baseAssets/Ryder_2-320x180.webp';
import ryder2Md from './baseAssets/Ryder_2-384x216.webp';
import ryder2Lg from './baseAssets/Ryder_2-512x288.webp';
import ryder2Xl from './baseAssets/Ryder_2-640x360.webp';
import ryder2SmAvif from './baseAssets/Ryder_2-320x180.webp';
import ryder2MdAvif from './baseAssets/Ryder_2-384x216.webp';
import ryder2LgAvif from './baseAssets/Ryder_2-512x288.webp';
import ryder2XlAvif from './baseAssets/Ryder_2-640x360.webp';
import ryder2Fallback from './Ryder_2.png';

import modularSm from './baseAssets/ModularH_1-320x180.webp';
import modularMd from './baseAssets/ModularH_1-384x216.webp';
import modularLg from './baseAssets/ModularH_1-512x288.webp';
import modularXl from './baseAssets/ModularH_1-640x360.webp';
import modularSmAvif from './baseAssets/ModularH_1-320x180.webp';
import modularMdAvif from './baseAssets/ModularH_1-384x216.webp';
import modularLgAvif from './baseAssets/ModularH_1-512x288.webp';
import modularXlAvif from './baseAssets/ModularH_1-640x360.webp';
import modularFallback from './ModularH_1.png';

import afsSm from './baseAssets/AFS_1-320x180.webp';
import afsMd from './baseAssets/AFS_1-384x216.webp';
import afsLg from './baseAssets/AFS_1-512x288.webp';
import afsXl from './baseAssets/AFS_1-640x360.webp';
import afsSmAvif from './baseAssets/AFS_1-320x180.webp';
import afsMdAvif from './baseAssets/AFS_1-384x216.webp';
import afsLgAvif from './baseAssets/AFS_1-512x288.webp';
import afsXlAvif from './baseAssets/AFS_1-640x360.webp';
import afsFallback from './AFS_1.png';

// Initiative Images
import sustainableSm from './baseAssets/sustainable-homes-initiative-320x180.webp';
import sustainableMd from './baseAssets/sustainable-homes-initiative-384x216.webp';
import sustainableLg from './baseAssets/sustainable-homes-initiative-512x288.webp';
import sustainableXl from './baseAssets/sustainable-homes-initiative-640x360.webp';
import sustainableSmAvif from './baseAssets/sustainable-homes-initiative-320x180.webp';
import sustainableMdAvif from './baseAssets/sustainable-homes-initiative-384x216.webp';
import sustainableLgAvif from './baseAssets/sustainable-homes-initiative-512x288.webp';
import sustainableXlAvif from './baseAssets/sustainable-homes-initiative-640x360.webp';
import sustainableFallback from './sustainable-homes-initiative.jpg';

import affordableComplexSm from './baseAssets/affordable-living-complex-320x180.webp';
import affordableComplexMd from './baseAssets/affordable-living-complex-384x216.webp';
import affordableComplexLg from './baseAssets/affordable-living-complex-512x288.webp';
import affordableComplexXl from './baseAssets/affordable-living-complex-640x360.webp';
import affordableComplexSmAvif from './baseAssets/affordable-living-complex-320x180.webp';
import affordableComplexMdAvif from './baseAssets/affordable-living-complex-384x216.webp';
import affordableComplexLgAvif from './baseAssets/affordable-living-complex-512x288.webp';
import affordableComplexXlAvif from './baseAssets/affordable-living-complex-640x360.webp';
import affordableComplexFallback from './affordable-living-complex.jpg';

import urbanRenewalSm from './baseAssets/urban-renewal-project-320x180.webp';
import urbanRenewalMd from './baseAssets/urban-renewal-project-384x216.webp';
import urbanRenewalLg from './baseAssets/urban-renewal-project-512x288.webp';
import urbanRenewalXl from './baseAssets/urban-renewal-project-640x360.webp';
import urbanRenewalSmAvif from './baseAssets/urban-renewal-project-320x180.webp';
import urbanRenewalMdAvif from './baseAssets/urban-renewal-project-384x216.webp';
import urbanRenewalLgAvif from './baseAssets/urban-renewal-project-512x288.webp';
import urbanRenewalXlAvif from './baseAssets/urban-renewal-project-640x360.webp';
import urbanRenewalFallback from './urban-renewal-project.jpg';

// Portfolio Assets
import jubileeSm from './portfolioAssets/Jubilee-Sign-320x180.webp';
import jubileeMd from './portfolioAssets/Jubilee-Sign-384x216.webp';
import jubileeLg from './portfolioAssets/Jubilee-Sign-512x288.webp';
import jubileeXl from './portfolioAssets/Jubilee-Sign-640x360.webp';
import jubileeSmAvif from './portfolioAssets/Jubilee-Sign-320x180.webp';
import jubileeMdAvif from './portfolioAssets/Jubilee-Sign-384x216.webp';
import jubileeLgAvif from './portfolioAssets/Jubilee-Sign-512x288.webp';
import jubileeXlAvif from './portfolioAssets/Jubilee-Sign-640x360.webp';
import jubileeFallback from './portfolioAssets/Jubilee-Sign.jpg';

import affordableApartmentsSm from './portfolioAssets/affordapartment-320x180.webp';
import affordableApartmentsMd from './portfolioAssets/affordapartment-384x216.webp';
import affordableApartmentsLg from './portfolioAssets/affordapartment-512x288.webp';
import affordableApartmentsXl from './portfolioAssets/affordapartment-640x360.webp';
import affordableApartmentsSmAvif from './portfolioAssets/affordapartment-320x180.webp';
import affordableApartmentsMdAvif from './portfolioAssets/affordapartment-384x216.webp';
import affordableApartmentsLgAvif from './portfolioAssets/affordapartment-512x288.webp';
import affordableApartmentsXlAvif from './portfolioAssets/affordapartment-640x360.webp';
import affordableApartmentsFallback from './portfolioAssets/affordapartment.png';

import klandingSm from './portfolioAssets/KLanding-320x180.webp';
import klandingMd from './portfolioAssets/KLanding-384x216.webp';
import klandingLg from './portfolioAssets/KLanding-512x288.webp';
import klandingXl from './portfolioAssets/KLanding-640x360.webp';
import klandingSmAvif from './portfolioAssets/KLanding-320x180.webp';
import klandingMdAvif from './portfolioAssets/KLanding-384x216.webp';
import klandingLgAvif from './portfolioAssets/KLanding-512x288.webp';
import klandingXlAvif from './portfolioAssets/KLanding-640x360.webp';
import klandingFallback from './portfolioAssets/KLanding.png';

import oppenheimerSm from './portfolioAssets/TheOppenhiemer-320x180.webp';
import oppenheimerMd from './portfolioAssets/TheOppenhiemer-384x216.webp';
import oppenheimerLg from './portfolioAssets/TheOppenhiemer-512x288.webp';
import oppenheimerXl from './portfolioAssets/TheOppenhiemer-640x360.webp';
import oppenheimerSmAvif from './portfolioAssets/TheOppenhiemer-320x180.webp';
import oppenheimerMdAvif from './portfolioAssets/TheOppenhiemer-384x216.webp';
import oppenheimerLgAvif from './portfolioAssets/TheOppenhiemer-512x288.webp';
import oppenheimerXlAvif from './portfolioAssets/TheOppenhiemer-640x360.webp';
import oppenheimerFallback from './portfolioAssets/TheOppenhiemer.png';

import skeenaSm from './portfolioAssets/skeena-320x180.webp';
import skeenaMd from './portfolioAssets/skeena-384x216.webp';
import skeenaLg from './portfolioAssets/skeena-512x288.webp';
import skeenaXl from './portfolioAssets/skeena-640x360.webp';
import skeenaSmAvif from './portfolioAssets/skeena-320x180.webp';
import skeenaMdAvif from './portfolioAssets/skeena-384x216.webp';
import skeenaLgAvif from './portfolioAssets/skeena-512x288.webp';
import skeenaXlAvif from './portfolioAssets/skeena-640x360.webp';
import skeenaFallback from './portfolioAssets/skeena.png';

import main179Sm from './portfolioAssets/179Main-320x180.webp';
import main179Md from './portfolioAssets/179Main-384x216.webp';
import main179Lg from './portfolioAssets/179Main-512x288.webp';
import main179Xl from './portfolioAssets/179Main-640x360.webp';
import main179SmAvif from './portfolioAssets/179Main-320x180.webp';
import main179MdAvif from './portfolioAssets/179Main-384x216.webp';
import main179LgAvif from './portfolioAssets/179Main-512x288.webp';
import main179XlAvif from './portfolioAssets/179Main-640x360.webp';
import main179Fallback from './portfolioAssets/179Main.png';

import howe1060Sm from './portfolioAssets/1060howe-320x180.webp';
import howe1060Md from './portfolioAssets/1060howe-384x216.webp';
import howe1060Lg from './portfolioAssets/1060howe-512x288.webp';
import howe1060Xl from './portfolioAssets/1060howe-640x360.webp';
import howe1060SmAvif from './portfolioAssets/1060howe-320x180.webp';
import howe1060MdAvif from './portfolioAssets/1060howe-384x216.webp';
import howe1060LgAvif from './portfolioAssets/1060howe-512x288.webp';
import howe1060XlAvif from './portfolioAssets/1060howe-640x360.webp';
import howe1060Fallback from './portfolioAssets/1060howe.png';

import maternitySm from './portfolioAssets/Maternity-320x180.webp';
import maternityMd from './portfolioAssets/Maternity-384x216.webp';
import maternityLg from './portfolioAssets/Maternity-512x288.webp';
import maternityXl from './portfolioAssets/Maternity-640x360.webp';
import maternitySmAvif from './portfolioAssets/Maternity-320x180.webp';
import maternityMdAvif from './portfolioAssets/Maternity-384x216.webp';
import maternityLgAvif from './portfolioAssets/Maternity-512x288.webp';
import maternityXlAvif from './portfolioAssets/Maternity-640x360.webp';
import maternityFallback from './portfolioAssets/Maternity.jpeg';

import merrittPortfolioSm from './portfolioAssets/Merritt-320x180.webp';
import merrittPortfolioMd from './portfolioAssets/Merritt-384x216.webp';
import merrittPortfolioLg from './portfolioAssets/Merritt-512x288.webp';
import merrittPortfolioXl from './portfolioAssets/Merritt-640x360.webp';
import merrittPortfolioSmAvif from './portfolioAssets/Merritt-320x180.webp';
import merrittPortfolioMdAvif from './portfolioAssets/Merritt-384x216.webp';
import merrittPortfolioLgAvif from './portfolioAssets/Merritt-512x288.webp';
import merrittPortfolioXlAvif from './portfolioAssets/Merritt-640x360.webp';
import merrittPortfolioFallback from './portfolioAssets/Merritt.png';

import kwasFallback from './portfolioAssets/Kwas.png';

// Pillar/Home Asset Images
import beaverConsFallback from './homeAssets/beaverConsturction.png';
import trustedPartnersFallback from './Trusted-Partners.jpeg';
import expertConsultFallback from './expert-consultation.jpg';
import systemsNetworkFallback from './homeAssets/systemsNetwork.png';
import thinkingStatueFallback from './homeAssets/thinkingStatueLaptop.png';
import communityChampionsFallback from './homeAssets/communityChampions.webp';

// Image Registry
export const imageRegistry: Record<string, ImageFormats> = {
  // Hero Images
  'about-hero': {
    webp: { sm: aboutHeroSm, md: aboutHeroMd, lg: aboutHeroLg, xl: aboutHeroXl },
    avif: { sm: aboutHeroSmAvif, md: aboutHeroMdAvif, lg: aboutHeroLgAvif, xl: aboutHeroXlAvif },
    fallback: aboutHeroFallback,
  },
  'contact-hero': {
    webp: { sm: contactHeroSm, md: contactHeroMd, lg: contactHeroLg, xl: contactHeroXl },
    avif: { sm: contactHeroSmAvif, md: contactHeroMdAvif, lg: contactHeroLgAvif, xl: contactHeroXlAvif },
    fallback: contactHeroFallback,
  },
  'impact-hero': {
    webp: { sm: impactHeroSm, md: impactHeroMd, lg: impactHeroLg, xl: impactHeroXl },
    avif: { sm: impactHeroSmAvif, md: impactHeroMdAvif, lg: impactHeroLgAvif, xl: impactHeroXlAvif },
    fallback: impactHeroFallback,
  },
  'media-hero': {
    webp: { sm: mediaHeroSm, md: mediaHeroMd, lg: mediaHeroLg, xl: mediaHeroXl },
    avif: { sm: mediaHeroSmAvif, md: mediaHeroMdAvif, lg: mediaHeroLgAvif, xl: mediaHeroXlAvif },
    fallback: mediaHeroFallback,
  },
  'partner-hero': {
    webp: { sm: partnerHeroSm, md: partnerHeroMd, lg: partnerHeroLg, xl: partnerHeroXl },
    avif: { sm: partnerHeroSmAvif, md: partnerHeroMdAvif, lg: partnerHeroLgAvif, xl: partnerHeroXlAvif },
    fallback: partnerHeroFallback,
  },
  'partner-hero-friendly': {
    webp: { sm: partnerHeroFriendlySm, md: partnerHeroFriendlyMd, lg: partnerHeroFriendlyLg, xl: partnerHeroFriendlyXl },
    avif: { sm: partnerHeroFriendlySmAvif, md: partnerHeroFriendlyMdAvif, lg: partnerHeroFriendlyLgAvif, xl: partnerHeroFriendlyXlAvif },
    fallback: partnerHeroFriendlyFallback,
  },
  'portfolio-hero': {
    webp: { sm: portfolioHeroSm, md: portfolioHeroMd, lg: portfolioHeroLg, xl: portfolioHeroXl },
    avif: { sm: portfolioHeroSmAvif, md: portfolioHeroMdAvif, lg: portfolioHeroLgAvif, xl: portfolioHeroXlAvif },
    fallback: portfolioHeroFallback,
  },
  'programs-hero': {
    webp: { sm: programsHeroSm, md: programsHeroMd, lg: programsHeroLg, xl: programsHeroXl },
    avif: { sm: programsHeroSmAvif, md: programsHeroMdAvif, lg: programsHeroLgAvif, xl: programsHeroXlAvif },
    fallback: programsHeroFallback,
  },
  'research-hero': {
    webp: { sm: researchHeroSm, md: researchHeroMd, lg: researchHeroLg, xl: researchHeroXl },
    avif: { sm: researchHeroSmAvif, md: researchHeroMdAvif, lg: researchHeroLgAvif, xl: researchHeroXlAvif },
    fallback: researchHeroFallback,
  },
  'blog-hero': {
    webp: { sm: blogHeroXl, md: blogHeroXl, lg: blogHeroXl, xl: blogHeroXl },
    avif: { sm: blogHeroXl, md: blogHeroXl, lg: blogHeroXl, xl: blogHeroXl },
    fallback: blogHeroFallback,
  },

  // Project Images
  '162Main': {
    webp: { sm: main162Sm, md: main162Md, lg: main162Lg, xl: main162Xl },
    avif: { sm: main162SmAvif, md: main162MdAvif, lg: main162LgAvif, xl: main162XlAvif },
    fallback: main162Fallback,
  },
  '162Main_2': {
    webp: { sm: main162_2Sm, md: main162_2Md, lg: main162_2Lg, xl: main162_2Xl },
    avif: { sm: main162_2SmAvif, md: main162_2MdAvif, lg: main162_2LgAvif, xl: main162_2XlAvif },
    fallback: main162_2Fallback,
  },
  'DodsonsRooms_1': {
    webp: { sm: dodsonSm, md: dodsonMd, lg: dodsonLg, xl: dodsonXl },
    avif: { sm: dodsonSmAvif, md: dodsonMdAvif, lg: dodsonLgAvif, xl: dodsonXlAvif },
    fallback: dodsonFallback,
  },
  'Meritt_TH_1': {
    webp: { sm: merrittSm, md: merrittMd, lg: merrittLg, xl: merrittXl },
    avif: { sm: merrittSmAvif, md: merrittMdAvif, lg: merrittLgAvif, xl: merrittXlAvif },
    fallback: merrittFallback,
  },
  'merritt': {
    webp: { sm: merrittSm, md: merrittMd, lg: merrittLg, xl: merrittXl },
    avif: { sm: merrittSmAvif, md: merrittMdAvif, lg: merrittLgAvif, xl: merrittXlAvif },
    fallback: merrittNewFallback,
  },
  'Ryder_1': {
    webp: { sm: ryder1Sm, md: ryder1Md, lg: ryder1Lg, xl: ryder1Xl },
    avif: { sm: ryder1SmAvif, md: ryder1MdAvif, lg: ryder1LgAvif, xl: ryder1XlAvif },
    fallback: ryder1Fallback,
  },
  'Ryder_2': {
    webp: { sm: ryder2Sm, md: ryder2Md, lg: ryder2Lg, xl: ryder2Xl },
    avif: { sm: ryder2SmAvif, md: ryder2MdAvif, lg: ryder2LgAvif, xl: ryder2XlAvif },
    fallback: ryder2Fallback,
  },
  'ModularH_1': {
    webp: { sm: modularSm, md: modularMd, lg: modularLg, xl: modularXl },
    avif: { sm: modularSmAvif, md: modularMdAvif, lg: modularLgAvif, xl: modularXlAvif },
    fallback: modularFallback,
  },
  'AFS_1': {
    webp: { sm: afsSm, md: afsMd, lg: afsLg, xl: afsXl },
    avif: { sm: afsSmAvif, md: afsMdAvif, lg: afsLgAvif, xl: afsXlAvif },
    fallback: afsFallback,
  },

  // Initiative Images
  'sustainable-homes-initiative': {
    webp: { sm: sustainableSm, md: sustainableMd, lg: sustainableLg, xl: sustainableXl },
    avif: { sm: sustainableSmAvif, md: sustainableMdAvif, lg: sustainableLgAvif, xl: sustainableXlAvif },
    fallback: sustainableFallback,
  },
  'affordable-living-complex': {
    webp: { sm: affordableComplexSm, md: affordableComplexMd, lg: affordableComplexLg, xl: affordableComplexXl },
    avif: { sm: affordableComplexSmAvif, md: affordableComplexMdAvif, lg: affordableComplexLgAvif, xl: affordableComplexXlAvif },
    fallback: affordableComplexFallback,
  },
  'urban-renewal-project': {
    webp: { sm: urbanRenewalSm, md: urbanRenewalMd, lg: urbanRenewalLg, xl: urbanRenewalXl },
    avif: { sm: urbanRenewalSmAvif, md: urbanRenewalMdAvif, lg: urbanRenewalLgAvif, xl: urbanRenewalXlAvif },
    fallback: urbanRenewalFallback,
  },

  // Portfolio Assets
  'Jubilee-Sign': {
    webp: { sm: jubileeSm, md: jubileeMd, lg: jubileeLg, xl: jubileeXl },
    avif: { sm: jubileeSmAvif, md: jubileeMdAvif, lg: jubileeLgAvif, xl: jubileeXlAvif },
    fallback: jubileeFallback,
  },
  'affordapartment': {
    webp: { sm: affordableApartmentsSm, md: affordableApartmentsMd, lg: affordableApartmentsLg, xl: affordableApartmentsXl },
    avif: { sm: affordableApartmentsSmAvif, md: affordableApartmentsMdAvif, lg: affordableApartmentsLgAvif, xl: affordableApartmentsXlAvif },
    fallback: affordableApartmentsFallback,
  },
  'KLanding': {
    webp: { sm: klandingSm, md: klandingMd, lg: klandingLg, xl: klandingXl },
    avif: { sm: klandingSmAvif, md: klandingMdAvif, lg: klandingLgAvif, xl: klandingXlAvif },
    fallback: klandingFallback,
  },
  'TheOppenhiemer': {
    webp: { sm: oppenheimerSm, md: oppenheimerMd, lg: oppenheimerLg, xl: oppenheimerXl },
    avif: { sm: oppenheimerSmAvif, md: oppenheimerMdAvif, lg: oppenheimerLgAvif, xl: oppenheimerXlAvif },
    fallback: oppenheimerFallback,
  },
  'skeena': {
    webp: { sm: skeenaSm, md: skeenaMd, lg: skeenaLg, xl: skeenaXl },
    avif: { sm: skeenaSmAvif, md: skeenaMdAvif, lg: skeenaLgAvif, xl: skeenaXlAvif },
    fallback: skeenaFallback,
  },
  '179Main': {
    webp: { sm: main179Sm, md: main179Md, lg: main179Lg, xl: main179Xl },
    avif: { sm: main179SmAvif, md: main179MdAvif, lg: main179LgAvif, xl: main179XlAvif },
    fallback: main179Fallback,
  },
  '1060howe': {
    webp: { sm: howe1060Sm, md: howe1060Md, lg: howe1060Lg, xl: howe1060Xl },
    avif: { sm: howe1060SmAvif, md: howe1060MdAvif, lg: howe1060LgAvif, xl: howe1060XlAvif },
    fallback: howe1060Fallback,
  },
  'Maternity': {
    webp: { sm: maternitySm, md: maternityMd, lg: maternityLg, xl: maternityXl },
    avif: { sm: maternitySmAvif, md: maternityMdAvif, lg: maternityLgAvif, xl: maternityXlAvif },
    fallback: maternityFallback,
  },
  'Merritt': {
    webp: { sm: merrittPortfolioSm, md: merrittPortfolioMd, lg: merrittPortfolioLg, xl: merrittPortfolioXl },
    avif: { sm: merrittPortfolioSmAvif, md: merrittPortfolioMdAvif, lg: merrittPortfolioLgAvif, xl: merrittPortfolioXlAvif },
    fallback: merrittPortfolioFallback,
  },
  'Kwas': {
    webp: { sm: kwasFallback, md: kwasFallback, lg: kwasFallback, xl: kwasFallback },
    avif: { sm: kwasFallback, md: kwasFallback, lg: kwasFallback, xl: kwasFallback },
    fallback: kwasFallback,
  },
  
  // Pillar/Home Asset Images
  'beaverConsturction': {
    webp: { sm: beaverConsFallback, md: beaverConsFallback, lg: beaverConsFallback, xl: beaverConsFallback },
    avif: { sm: beaverConsFallback, md: beaverConsFallback, lg: beaverConsFallback, xl: beaverConsFallback },
    fallback: beaverConsFallback,
  },
  'Trusted-Partners': {
    webp: { sm: trustedPartnersFallback, md: trustedPartnersFallback, lg: trustedPartnersFallback, xl: trustedPartnersFallback },
    avif: { sm: trustedPartnersFallback, md: trustedPartnersFallback, lg: trustedPartnersFallback, xl: trustedPartnersFallback },
    fallback: trustedPartnersFallback,
  },
  'expert-consultation': {
    webp: { sm: expertConsultFallback, md: expertConsultFallback, lg: expertConsultFallback, xl: expertConsultFallback },
    avif: { sm: expertConsultFallback, md: expertConsultFallback, lg: expertConsultFallback, xl: expertConsultFallback },
    fallback: expertConsultFallback,
  },
  'systemsNetwork': {
    webp: { sm: systemsNetworkFallback, md: systemsNetworkFallback, lg: systemsNetworkFallback, xl: systemsNetworkFallback },
    avif: { sm: systemsNetworkFallback, md: systemsNetworkFallback, lg: systemsNetworkFallback, xl: systemsNetworkFallback },
    fallback: systemsNetworkFallback,
  },
  'thinkingStatueLaptop': {
    webp: { sm: thinkingStatueFallback, md: thinkingStatueFallback, lg: thinkingStatueFallback, xl: thinkingStatueFallback },
    avif: { sm: thinkingStatueFallback, md: thinkingStatueFallback, lg: thinkingStatueFallback, xl: thinkingStatueFallback },
    fallback: thinkingStatueFallback,
  },
  'communityChampions': {
    webp: { sm: communityChampionsFallback, md: communityChampionsFallback, lg: communityChampionsFallback, xl: communityChampionsFallback },
    avif: { sm: communityChampionsFallback, md: communityChampionsFallback, lg: communityChampionsFallback, xl: communityChampionsFallback },
    fallback: communityChampionsFallback,
  },
};

// Image configuration for different categories
export const imageConfigs: Record<ImageCategory, ImageConfig> = {
  hero: {
    category: 'hero',
    aspectRatio: '16/9',
    sizes: '100vw',
    priority: true,
    loading: 'eager',
  },
  project: {
    category: 'project',
    aspectRatio: '16/9',
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    priority: false,
    loading: 'lazy',
  },
  portfolio: {
    category: 'portfolio',
    aspectRatio: '16/9',
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    priority: false,
    loading: 'lazy',
  },
  initiative: {
    category: 'initiative',
    aspectRatio: '16/9',
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    priority: false,
    loading: 'lazy',
  },
  logo: {
    category: 'logo',
    aspectRatio: '1/1',
    sizes: '(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw',
    priority: false,
    loading: 'lazy',
  },
};
