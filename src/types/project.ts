export interface ProjectData {
  id: number;
  title: string;
  originalTitle?: string;
  location: string; 
  year?: string;
  completion_date?: string;
  units?: number | string;
  description: string;
  briefDescription?: string; // Brief description for portfolio cards
  comprehensiveDetails?: string; // Comprehensive details for modal view
  image?: string;
  status?: string;
  type?: string;
  highlights?: string[]; // Deprecated - will be removed
}
