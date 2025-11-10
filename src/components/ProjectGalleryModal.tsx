import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, MapPin, Calendar, Users, Building, ExternalLink } from "lucide-react";
import { ProjectData } from "@/types/project";

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
    Maternity: new URL("@/assets/portfolioAssets/Maternity.jpeg", import.meta.url).href,
    // Project images - using direct asset imports for Lovable compatibility
    "162Main": new URL("@/assets/162Main.png", import.meta.url).href,
    "162Main_2": new URL("@/assets/162Main_2.png", import.meta.url).href,
    "162MainSt": new URL("@/assets/162MainSt.webp", import.meta.url).href,
    DodsonsRooms_1: new URL("@/assets/DodsonsRooms_1.png", import.meta.url).href,
    Meritt_TH_1: new URL("@/assets/Meritt_TH_1.png", import.meta.url).href,
    merritt: new URL("@/assets/Meritt_TH_1.png", import.meta.url).href,
    // Map merritt to original image for View Details
    Ryder_1: new URL("@/assets/TheRyder.jpeg", import.meta.url).href,
    Ryder_2: new URL("@/assets/Ryder_2.png", import.meta.url).href,
    ModularH_1: new URL("@/assets/ModularH_1.png", import.meta.url).href,
    AFS_1: new URL("@/assets/AFS_1.png", import.meta.url).href,
    // Initiative images - using direct asset imports for Lovable compatibility
    "sustainable-homes-initiative": new URL("@/assets/sustainable-homes-initiative.jpg", import.meta.url).href,
    "affordable-living-complex": new URL("@/assets/affordable-living-complex.jpg", import.meta.url).href,
    "urban-renewal-project": new URL("@/assets/urban-renewal-project.jpg", import.meta.url).href,
  };
  return imageMap[imageName] || imageName; // Return original if not found
};
interface ProjectGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectData[];
}
export const ProjectGalleryModal: React.FC<ProjectGalleryModalProps> = ({ isOpen, onClose, projects }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "planned":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="sticky top-2 right-2 ml-auto z-50 bg-background/80 hover:bg-background h-8 w-8 rounded-full mb-4"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </Button>

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Our Project Portfolio</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={getOriginalImagePath(project.image)}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = "none";
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div
                  className="w-full h-full bg-muted flex items-center justify-center"
                  style={{
                    display: "none",
                  }}
                >
                  <Building className="h-12 w-12 text-muted-foreground" />
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                  <Badge className={`ml-2 text-xs ${getStatusColor(project.status)}`}>
                    {project.status.replace("-", " ")}
                  </Badge>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.location}
                  </div>

                  {(project.year || project.completion_date) && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {project.year || (project.completion_date ? new Date(project.completion_date).getFullYear() : "")}
                    </div>
                  )}

                  {project.units && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-1" />
                      {project.units} units
                    </div>
                  )}

                  {project.type && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Building className="w-4 h-4 mr-1" />
                      {project.type}
                    </div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-3">{project.description}</p>

                {project.highlights && project.highlights.length > 0 && (
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-foreground">Key Highlights:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {project.highlights.slice(0, 3).map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center pt-6 pb-2 border-t border-border mt-6">
          <Button
            variant="outline"
            className="group hover:bg-primary hover:text-primary-foreground transition-colors"
            asChild
          >
            <a href="https://anhart.ca/portfolio" target="_blank" rel="noopener noreferrer">
              View All Projects
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
