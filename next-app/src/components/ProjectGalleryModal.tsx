'use client';

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, MapPin, Calendar, Users, Building, ExternalLink } from "lucide-react";
import { ProjectData } from "@/types/project";

// Portfolio image imports
import imgJubileeSign from "@/assets/portfolioAssets/Jubilee-Sign.jpg";
import imgAffordapartment from "@/assets/portfolioAssets/affordapartment.png";
import imgKLanding from "@/assets/portfolioAssets/KLanding.png";
import imgTheOppenhiemer from "@/assets/portfolioAssets/TheOppenhiemer.png";
import imgSkeena from "@/assets/portfolioAssets/skeena.png";
import img179Main from "@/assets/portfolioAssets/179Main.png";
import img1060howe from "@/assets/portfolioAssets/1060howe.png";
import imgMerritt from "@/assets/portfolioAssets/Merritt.png";
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
    // Initiative images
    "sustainable-homes-initiative": imgSustainableHomes,
    "affordable-living-complex": imgAffordableLiving,
    "urban-renewal-project": imgUrbanRenewal,
  };
  const image = imageMap[imageName];
  return typeof image === 'string' ? image : image?.src || imageName;
};
interface ProjectGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectData[];
}
export const ProjectGalleryModal: React.FC<{
  children?: React.ReactNode;
}> = ({
  isOpen,
  onClose,
  projects,
  children
}) => {
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
