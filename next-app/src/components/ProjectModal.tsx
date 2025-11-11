'use client';

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Users, Building } from "lucide-react";
import { ProjectData } from "@/types/project";
import { StatusBadge } from "@/components/shared/StatusBadge";

// Portfolio image imports
import imgJubileeSign from "@/assets/portfolioAssets/Jubilee-Sign.jpg";
import imgAffordapartment from "@/assets/portfolioAssets/affordapartment.png";
import imgKLanding from "@/assets/portfolioAssets/KLanding.png";
import imgTheOppenhiemer from "@/assets/portfolioAssets/TheOppenhiemer.png";
import imgSkeena from "@/assets/portfolioAssets/skeena.png";
import img179Main from "@/assets/portfolioAssets/179Main.png";
import img1060howe from "@/assets/portfolioAssets/1060howe.png";
import imgMerritt from "@/assets/portfolioAssets/Merritt.png";
import imgKwas from "@/assets/portfolioAssets/Kwas.png";
import imgMaternity from "@/assets/portfolioAssets/Maternity.jpeg";

// Project image imports
import img162Main from "@/assets/162Main.png";
import img162Main_2 from "@/assets/162Main_2.png";
import img162MainSt from "@/assets/162MainSt.webp";
import imgDodsonsRooms_1 from "@/assets/DodsonsRooms_1.png";
import imgMeritt_TH_1 from "@/assets/Meritt_TH_1.png";
import imgTheRyder from "@/assets/TheRyder.jpeg";
import imgRyder_2 from "@/assets/Ryder_2.png";
import imgModularH_1 from "@/assets/ModularH_1.png";
import imgAFS_1 from "@/assets/AFS_1.png";
import imgSustainableHomes from "@/assets/sustainable-homes-initiative.jpg";
import imgAffordableLiving from "@/assets/affordable-living-complex.jpg";
import imgUrbanRenewal from "@/assets/urban-renewal-project.jpg";

// Function to convert URLs in text to clickable links
const convertUrlsToLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  
  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 underline transition-colors"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectData | null;
}

// Function to map image names to Next.js static imports
const getOriginalImagePath = (imageName: string): string => {
  const imageMap: Record<string, any> = {
    // Portfolio images
    "Jubilee-Sign": imgJubileeSign,
    affordapartment: imgAffordapartment,
    KLanding: imgKLanding,
    TheOppenhiemer: imgTheOppenhiemer,
    skeena: imgSkeena,
    "179Main": img179Main,
    "1060howe": img1060howe,
    Merritt: imgMerritt,
    Kwas: imgKwas,
    Maternity: imgMaternity,
    // Project images
    "162Main": img162Main,
    "162Main_2": img162Main_2,
    "162MainSt": img162MainSt,
    DodsonsRooms_1: imgDodsonsRooms_1,
    Meritt_TH_1: imgMeritt_TH_1,
    merritt: imgMeritt_TH_1,
    Ryder_1: imgTheRyder,
    Ryder_2: imgRyder_2,
    ModularH_1: imgModularH_1,
    AFS_1: imgAFS_1,
    "sustainable-homes-initiative": imgSustainableHomes,
    "affordable-living-complex": imgAffordableLiving,
    "urban-renewal-project": imgUrbanRenewal,
  };
  const image = imageMap[imageName];
  return typeof image === 'string' ? image : image?.src || imageName;
};

/**
 * ProjectModal Component
 *
 * A detailed modal view for displaying comprehensive project information.
 * Features project images, status indicators, key highlights, and contact
 * information. Provides a full-screen experience for project details.
 */
const ProjectModal = ({
  isOpen,
  onClose,
  project
}: ProjectModalProps) => {
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto dialog-content">
        <DialogHeader className="text-center dialog-header">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl sm:text-2xl font-bold font-center dialog-title">
              Project Details
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 p-0 hover:bg-gray-200">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Display */}
          {project && <div className="space-y-6">
              {/* Project Image */}
              <div className="w-full max-w-[80%] mx-auto h-72 sm:h-96 bg-muted rounded-lg overflow-hidden">
                {project.image ? <img src={getOriginalImagePath(project.image)} alt={project.title} className="w-full h-full object-cover" loading="lazy" decoding="async" onError={e => {
              (e.currentTarget as HTMLElement).style.display = "none";
              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = "flex";
            }} /> : null}
                <div className="w-full h-full bg-muted flex items-center justify-center" style={{
              display: project.image ? "none" : "flex"
            }}>
                  <Building className="h-16 w-16 text-muted-foreground" />
                </div>
              </div>

              {/* Project Details */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-3">{project.title}</h3>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-base text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-5 w-5" />
                          <span className="font-medium">{project.location}</span>
                        </div>
                        {project.year && <div className="flex items-center gap-1">
                            <Calendar className="h-5 w-5" />
                            <span className="font-medium">{project.year}</span>
                          </div>}
                      </div>

                      {project.units && <div className="flex items-center gap-1 text-lg font-bold text-primary mb-3">
                          <Users className="h-6 w-6" />
                          <span>{project.units} Units</span>
                        </div>}
                    </div>

                    {project.status && <StatusBadge status={project.status} className="self-start text-sm px-3 py-1" />}
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3 text-lg">Project Overview:</h4>
                    <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-4">
                      {convertUrlsToLinks(project.briefDescription || project.description)}
                    </p>

                    {project.comprehensiveDetails && <div>
                        <h4 className="font-semibold text-foreground mb-3 text-lg">Detailed Information:</h4>
                        <p className="text-muted-foreground leading-relaxed">{convertUrlsToLinks(project.comprehensiveDetails)}</p>
                      </div>}
                  </div>
                </CardContent>
              </Card>
            </div>}
        </div>
      </DialogContent>
    </Dialog>;
};
export default ProjectModal;