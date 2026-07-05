export interface RecruiterProfileViewDTO {
  personalInfo: {
    firstName: string;
    lastName: string;
    currentLocation?: string;
    email: string;
  };
  socialProfiles?: any;
  snapshot: any;
  statistics: any;
  experiences: any[];
  educations: any[];
  skills: any[];
  certifications: any[];
  languages: any[];
}
