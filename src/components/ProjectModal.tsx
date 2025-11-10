import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Users, Building } from "lucide-react";
import { ProjectData } from "@/types/project";
import { StatusBadge } from "@/components/shared/StatusBadge";

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

// Function to map image names back to original PNG file paths
const getOriginalImagePath = (imageName: string): string => {
  const imageMap: Record<string, string> = {
    // Portfolio images - using direct asset imports for Lovable compatibility
    "Jubilee-Sign": new URL("@/assets/portfolioAssets/Jubilee-Sign.jpg", import.meta.url).href,
    affordapartment: new URL("@/assets/portfolioAssets/affordapartment.png", import.meta.url).href,
    KLanding: new URL("@/assets/portfolioAssets/KLanding.png", import.meta.url).href,
    TheOppenhiemer: new URL("@/assets/portfolioAssets/TheOppenhiemer.png", import.meta.url).href,
    skeena: new URL("@/assets/portfolioAssets/skeena.png", import.meta.url).href,
    "179Main": new URL("@/assets/portfolioAssets/179Main.png", import.meta.url).href,
    "1060howe": new URL("@/assets/portfolioAssets/1060howe.png", import.meta.url).href,
    Merritt: new URL("@/assets/portfolioAssets/Merritt.png", import.meta.url).href,
    // Project images - using direct asset imports for Lovable compatibility
    "162Main": new URL("@/assets/162Main.png", import.meta.url).href,
    "162Main_2": new URL("@/assets/162Main_2.png", import.meta.url).href,
    "162MainSt": new URL("@/assets/162MainSt.webp", import.meta.url).href,
    DodsonsRooms_1: new URL("@/assets/DodsonsRooms_1.png", import.meta.url).href,
    Meritt_TH_1: new URL("@/assets/Meritt_TH_1.png", import.meta.url).href,
    merritt: new URL("@/assets/Meritt_TH_1.png", import.meta.url).href,
    Ryder_1: new URL("@/assets/TheRyder.jpeg", import.meta.url).href,
    Ryder_2: new URL("@/assets/Ryder_2.png", import.meta.url).href,
    ModularH_1: new URL("@/assets/ModularH_1.png", import.meta.url).href,
    AFS_1: new URL("@/assets/AFS_1.png", import.meta.url).href,
    "sustainable-homes-initiative": new URL("@/assets/sustainable-homes-initiative.jpg", import.meta.url).href,
    "affordable-living-complex": new URL("@/assets/affordable-living-complex.jpg", import.meta.url).href,
    "urban-renewal-project": new URL("@/assets/urban-renewal-project.jpg", import.meta.url).href,
    Kwas: new URL("@/assets/portfolioAssets/Kwas.png", import.meta.url).href,
    Maternity: new URL("@/assets/portfolioAssets/Maternity.jpeg", import.meta.url).href
  };
  return imageMap[imageName] || imageName; // Return original if not found
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