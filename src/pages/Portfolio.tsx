import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import ProjectModal from "@/components/ProjectModal";
import { ProjectData } from "@/types/project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Building, ExternalLink } from "lucide-react";
import { HeroBanner } from "@/components/shared/HeroBanner";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { StatsSection } from "@/components/shared/StatsSection";
import OptimizedImage from "@/components/OptimizedImage";
import { useState } from "react";
import { projectStructuredData } from "@/lib/structuredData";
import { ScrollAnimationWrapper } from "@/components/animations/ScrollAnimationWrapper";

// =============================================================================
// EXTRACTED DATA IMPORTS
// =============================================================================
import {
  portfolioDetailedProjects,
  // @source: src/pages/Portfolio.tsx - projects variable
  portfolioStats, // @source: src/pages/Portfolio.tsx - portfolioStats variable
} from "@/data";

// =============================================================================
// ASSET IMPORTS
// =============================================================================
// All portfolio asset imports moved to @/data/portfolio-detailed.ts

const Portfolio = () => {
  // State management for project modal and pagination
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(6); // Initial load: 6 projects

  // Constants for pagination
  const INITIAL_PROJECTS = 6;
  const LOAD_MORE_INCREMENT = 3;

  // projects data extracted to @/data/portfolio-detailed.ts
  const projects = portfolioDetailedProjects;

  /**
   * Handles project card click to open detailed modal view
   * @param project - The selected project data
   */
  const handleViewDetails = (project: ProjectData) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  /**
   * Closes the project modal and clears selected project
   */
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  /**
   * Loads more projects by incrementing the visible count
   */
  const handleLoadMore = () => {
    setVisibleProjects((prev) => Math.min(prev + LOAD_MORE_INCREMENT, projects.length));
  };

  /**
   * Resets to show only initial projects
   */
  const handleShowLess = () => {
    setVisibleProjects(INITIAL_PROJECTS);
  };

  // Calculate remaining projects to show
  const remainingProjects = projects.length - visibleProjects;
  const showingAllProjects = visibleProjects >= projects.length;
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Our Portfolio - Affordable Housing Projects"
        description="Explore Anhart's portfolio of successful affordable housing projects across Canada. From Vancouver's Downtown Eastside to new developments in Hope and Merritt, see how we're building inclusive communities."
        keywords="affordable housing projects, housing portfolio, Vancouver housing, BC housing, community development, housing developments, social housing"
        url="/portfolio"
        structuredData={projects.slice(0, 3).map((project) =>
          projectStructuredData({
            name: project.title,
            description: project.description,
            location: project.location,
            dateCompleted: project.year,
            image: project.image,
          }),
        )}
      />
      <Header />
      <main>
        {/* Hero Banner - Portfolio overview and project showcase */}
        <HeroBanner backgroundImage="portfolio-hero" title="Our Development Projects" contentPosition="right" />

        {/* Projects Grid */}
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <ScrollAnimationWrapper direction="top" delay={0}>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">Featured Projects</h2>
                <p className="text-lg leading-8 text-muted-foreground">
                  From our humble beginnings in 2000—revitalizing the Jubilee Rooms and Dodson Hotel, two aging
                  single-room-occupancy buildings in Vancouver's Downtown Eastside—we've been driven by a vision to
                  transform lives through affordable housing. Today, we're on a bold journey to develop 20,000
                  sustainable housing units by 2045, creating vibrant, inclusive communities across Canada with every
                  project we undertake.
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  Showing {visibleProjects} of {projects.length} projects
                </p>
              </div>
            </ScrollAnimationWrapper>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, visibleProjects).map((project, index) => (
                <ScrollAnimationWrapper key={project.id} direction="top" delay={Math.min(index * 50, 400)}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 max-w-sm mx-auto md:max-w-none">
                    {/* Project Image */}
                    <div className="aspect-video overflow-hidden p-1">
                      {project.image ? (
                        <OptimizedImage
                          imageName={project.image}
                          alt={project.title}
                          category="portfolio"
                          className="w-full h-full rounded-sm object-cover"
                          aspectRatio="16/9"
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center rounded-sm">
                          <Building className="h-16 w-16 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <StatusBadge status={project.status || ""} />
                      </div>

                      <div className="flex items-center gap-4 text-base text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-5 w-5" />
                          <span className="font-small">{project.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-5 w-5" />
                          <span className="font-medium">{project.year}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-5">
                        {project.briefDescription || project.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-base font-semibold text-primary">
                          <Users className="h-5 w-5" />
                          {project.units} Units
                        </div>
                      </div>

                      <Button
                        onClick={() => handleViewDetails(project)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
                        aria-label={`View details for ${project.title}`}
                      >
                        View Details
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollAnimationWrapper>
              ))}
            </div>

            {/* Load More / Show Less Controls */}
            <div className="flex justify-center mt-12 gap-4">
              {!showingAllProjects && (
                <Button
                  className="px-8 py-3 bg-accent hover:bg-accent/90 text-white rounded-md transition-colors"
                  onClick={handleLoadMore}
                >
                  Load More Projects (
                  {remainingProjects > LOAD_MORE_INCREMENT ? LOAD_MORE_INCREMENT : remainingProjects} more)
                </Button>
              )}

              {visibleProjects > INITIAL_PROJECTS && (
                <Button variant="outline" className="px-8 py-3 rounded-md transition-colors" onClick={handleShowLess}>
                  Show Less
                </Button>
              )}
            </div>

            {/* All Projects Loaded Message */}
            {showingAllProjects && projects.length > INITIAL_PROJECTS && (
              <div className="text-center mt-8">
                <p className="text-muted-foreground">You've viewed {projects.length} projects in our portfolio.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      {/* Project Details Modal */}
      <ProjectModal isOpen={modalOpen} onClose={handleCloseModal} project={selectedProject} />
    </div>
  );
};
export default Portfolio;
