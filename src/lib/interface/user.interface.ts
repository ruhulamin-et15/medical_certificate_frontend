// models/User.ts
export interface User {
  id?: string; // MongoDB ObjectId (string format)
  firstName: string; // Required field
  lastName: string; // Required field
  email: string; // Required and unique field
  phone?: string; // Optional field
  password?: string; // Required field for storing hashed password
  addressOne?: string; // Optional field
  addressTwo?: string; // Optional field
  city?: string; // Optional field
  postalCode?: string; // Optional field
  state?: string; // Optional field
  country?: string; // Optional field with a default value
  registeredBy?: string; // Optional field
  availableAt?: string; // Optional field
  acceptedBy?: string; // Optional field
  role?: UserRole; // Enum (UserRole) with default value
  status?: UserStatus; // Enum (UserStatus) with default value
  createdAt?: Date; // Auto-generated DateTime
  updatedAt?: Date; // Auto-updated DateTime
  bookConsultation?: BookConsultation[]; // Array of BookConsultation objects
}

// Enums based on the Prisma schema
export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  SPECIALIST = "SPECIALIST",
  // Add other roles if applicable
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  // Add other statuses if applicable
}

// Sample BookConsultation model (placeholder) - adjust according to actual BookConsultation model
export interface BookConsultation {
  id: string;
  selectedDate: string;
  selectedTime: string;
  userId: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  dateBirth: string;
  gender: string;
  address?: string;
  nhsNumber?: number;
  conditionSymtoms?: string;
  healthConcern?: string;
  symptomsStartDate?: string;
  symptomProgression?: string;
  symptomDetails?: string;
  symptomTriggers?: string;
  dailyLifeImpact?: string;
  specificConcerns?: string;
  needsSpecialist?: string;
  specialistUrgency?: string;
  previousTreatment: boolean;
  hasMedicalRecords?: boolean;
  currentMedications: boolean;
  additionalMedicalInfo?: string;
  createdAt: Date;
  updatedAt: Date;
}
