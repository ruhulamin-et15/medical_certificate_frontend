export interface Payment {
  sessionId: string;
  customerId?: string;
  amountTotal: number;
  paymentStatus: string;
  currency: string;
  created: Date;
  successUrl: string;
  cancelUrl: string;
}

export interface SickNoteRequest {
  firstName: string;
  lastName?: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: Date;
  gender: string;
  preexistingConditions: boolean;
  preexistingConditionsDetails?: string;
  regularMedication: boolean;
  regularMedicationDetails?: string;
  certifiedForWeek?: boolean;
  validFrom: Date;
  validTo?: Date;
  symptomStartDate: Date;
  medicalReason: string;
  symptomsDetails: string;
  medicalCareSought: string;
  conditionStatus: ConditionStatus;
  workplace: string;
  workActivities: string;
  priorityOption: PriorityOption;
  couponCode?: string;
  amount: number;
  requestStatus?: RequestStatus; // Default is PENDING
}

export interface EmployeeFitnessCertificate {
  orderId?: string;
  firstName: string;
  lastName?: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: Date;
  gender: string;
  preExistingConditions: boolean;
  preExistingConditionsDetails?: string;
  medications: boolean;
  medicationsDetails?: string;
  walkingAbility: string;
  workExplanation: string;
  uploadFile?: any;
  workplace: string;
  workActivities: string;
  priorityOption: any;
  amount: number;
  requestStatus?: RequestStatus;
  couponCode?: string;
}

export interface MitigationLetter {
  orderId?: string;
  firstName: string;
  lastName?: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: Date;
  gender: string;
  mitigationReason: string;
  preExistingConditions?: boolean;
  takeMedications: boolean;
  consultedGP: boolean;
  gpConsultationDate?: Date;
  gpName?: string;
  description?: string;
  symptomsStartDate: Date;
  symptomsDetails: string;
  medicalCare: string;
  conditionStatus?: ConditionStatus;
  impactOnAssessment?: string;
  circumstance?: string;
  mitigationProposal?: string;
  validFrom?: Date;
  validTo?: Date;
  institutionName: string;
  courseName: string;
  additionalInfo?: string;
  priorityOption: any;
  amount: number;
  couponCode?: string;
  requestStatus?: RequestStatus;
}

export interface StudentSickLeaveRequest {
  amount: number;
  firstName: string;
  lastName?: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: Date;
  gender: string;
  preExistingConditions: boolean;
  preExistingConditionsDetails?: string;
  medications: boolean;
  medicationsDetails?: string;
  symptomsStartDate: Date;
  medicalReason: string;
  symptomsDetails: string;
  medicalCare: string;
  medicalCareDetails: string;
  conditionStatus: ConditionStatus;
  validFrom?: Date;
  validTo?: Date;
  institutionName: string;
  priorityOption: any;
  couponCode?: string;
  requestStatus?: RequestStatus;
}

export interface FitForFlightRequest {
  firstName: string;
  lastName?: string;
  amount: number;
  email: string;
  mobileNumber: string;
  dateOfBirth: Date;
  gender: string;
  pregnancyDueDate: Date;
  pregnancyComplications: boolean;
  pregnancyConception: string;
  pregnancyConceptionDetails?: string;
  anyExperience: boolean;
  medicalConditions: string;
  adverseConditionsDuring: string;
  nonPregnencyDetails: string;
  currentPrescribe: boolean;
  antenatalCareLocation: string;
  bmiAtStartOfPregnancy: string;
  bloodPressure: string;
  recentBloodPressureDate: string;
  outboundFlightDate: Date;
  airlineName: string;
  flightDuration: string;
  pregnancyWeeksAtFlight: number;
  returnFlight: boolean;
  returnFlightDate?: Date;
  priorityOption: any;
  couponCode?: string;
  requestStatus?: RequestStatus;
}

export interface ChickenpoxCertificateRequest {
  amount: number;
  firstName: string;
  lastName?: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: Date;
  gender: string;
  preExistingCondition: boolean;
  preExistingConditionDetails?: string;
  regularMedications: boolean;
  regularMedicationsDetails?: string;
  flightDate: Date;
  arrivalLocation: string;
  symptomStartDate: Date;
  symptomsDetails: string;
  treatmentGP: string;
  treatmentGPDetails?: string;
  treatmentGPFile?: string;
  conditionStatus: ConditionStatus;
  chickenpoxScabbed: boolean;
  feverLast48Hours: boolean;
  monkeypoxContact: boolean;
  priorityOption: any;
  couponCode?: string;
  requestStatus?: RequestStatus;
}

export interface BookConsultation {
  selectedDate: Date;
  selectedTime: string;
  firstName: string;
  lastName?: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: Date;
  gender: string;
  address?: string;
  nhsNumber?: string;
  conditionSymtoms?: string;
  healthConcern?: string;
  symptomsStartDate?: string;
  symptomProgression?: string;
  symptomDetails?: string;
  symptomTriggers?: string;
  dailyLifeImpact?: string;
  specificConcerns?: string;
  needsSpecialist?: boolean;
  needsSpecialistDetails?: string;
  specialistUrgency?: string;
  previousTreatment: boolean;
  previousTreatmentDetails?: string;
  hasMedicalRecords?: boolean;
  currentMedications: boolean;
  currentMedicationsDetails?: string;
  additionalMedicalInfo?: string;
  requestStatus?: RequestStatus;
  amount: number;
}

export interface VisaCertificate {
  amount: number;
  firstName: string;
  lastName?: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: Date;
  address: string;
  gender: string;
  visaPurpose: string;
  visaCountry: string;
  previouslyIssuedVisa: boolean;
  previouslyIssuedVisaDetails?: string;
  medicalHistoryConditions: boolean;
  medicalHistoryConditionsDetails?: string;
  takingPrescription: boolean;
  takingPrescriptionDetails?: string;
  contagiousDisease?: boolean;
  vaccinationReceived: boolean;
  vaccinationReceivedDetails?: string;
  recentExposure: boolean;
  recentExposureDetails?: string;
  travelHistory: boolean;
  travelHistoryDetails?: string;
  healthInsurance: boolean;
  healthInsuranceDetails?: string;
  additionalInfo?: string;
  passportNumber: string;
  passportUpload?: File;
  priorityOption: any;
  hardCopyRequested?: string;
  couponCode?: string;
  requestStatus?: RequestStatus;
}

export interface DisabilityCertificateRequest {
  amount: number;
  firstName: string;
  lastName?: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: Date;
  gender: string;
  disabilityDescription: string;
  disabilityTime: string;
  impactOnDailyLife: string;
  specificChallenges: string;
  previousMedicalHistory: boolean;
  previousMedicalHistoryDetails?: string;
  relevantMedicalRecords: boolean;
  workOrEducationSupport?: boolean;
  workOrEducationSupportDetails?: string;
  currentMedications: boolean;
  currentMedicationsDetails: string;
  supportingInformation: string;
  consultedSpecialists: boolean;
  consultedSpecialistsDetails?: string;
  additionalInformation?: string;
  priorityOption: any;
  couponCode?: string;
  requestStatus?: RequestStatus;
}

export interface VaccineCertificateRequest {
  amount: number;
  firstName: string;
  lastName?: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: Date;
  gender: string;
  severeAllergicReactions: boolean;
  immuneDisorders: boolean;
  adverseVaccineReactions: boolean;
  adverseVaccineReactionsDetails?: string;
  currentMedications: boolean;
  specificVaccine: string;
  vaccineReceivedInPast: boolean;
  vaccineReceivedInPastDetails?: string;
  healthConditions: boolean;
  pregnant: boolean;
  breastfeeding: boolean;
  recentProcedures: boolean;
  consultedSpecialist: boolean;
  medicalDocumentsProvided: string;
  additionalInformation: string;
  priorityOption: any;
  couponCode?: string;
  requestStatus?: RequestStatus;
}

export interface TravelMedicationLetterRequest {
  amount: number;
  firstName: string;
  lastName?: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: Date;
  gender: string;
  destination?: string;
  travelDates: Date;
  purposeOfTravel?: string;
  medicalCondition: boolean;
  medicalConditionDetails: string;
  medicationList: string;
  medicationDetails: string;
  recentMedicalChanges: boolean;
  recentMedicalChangesDetails?: string;
  consultedGP: boolean;
  consultedGPDetails?: string;
  circumstancesDetails: string;
  travelRegulationsAwareness: boolean;
  travelMedicationExplanation?: string;
  allergiesOrConditions: boolean;
  additionalInformation: string;
  priorityOption: any;
  couponCode?: string;
  requestStatus?: RequestStatus;
}

export interface GymCancellationCertificateRequest {
  amount: number;
  firstName: string;
  lastName?: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: Date;
  gender: string;
  gymOrHealthClubName: string;
  membershipId: string;
  dateOfJoining: Date;
  reasonForCancellation: string;
  medicalConditionAffectsUsage: boolean;
  injuriesOrHealthIssues: boolean;
  injuriesOrHealthExplanation?: string;
  currentMedicalTreatment: boolean;
  whyCancellation: string;
  includeFees: boolean;
  consultedGP: boolean;
  consultedGPDetails?: string;
  additionalInformation?: string;
  priorityOption: any;
  couponCode?: string;
  requestStatus?: RequestStatus;
}

export interface EventActivityCancellationRequest {
  amount: number;
  firstName: string;
  lastName?: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: Date;
  gender: string;
  eventName: string;
  eventDate: Date;
  eventLocation: string;
  cancellationReason: string;
  medicalCondition: boolean;
  medicalDetails?: string;
  impactOnParticipation?: string;
  consultedDoctor: boolean;
  GPNameInfo?: string;
  doctorAssessment: boolean;
  assessmentDetails?: string;
  additionalInfo?: string;
  priorityOption: any;
  couponCode?: string;
  requestStatus?: RequestStatus;
}

export interface InjuryAccidentConfirmationRequest {
  amount: number;
  firstName: string;
  lastName?: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: Date;
  gender: string;
  incidentDate: string;
  incidentLocation: string;
  incidentDescription: string;
  medicalTreatment: boolean;
  medicalTDetail?: string;
  medicalTests?: string;
  currentTreatment: boolean;
  discussedWithGP: boolean;
  GPAssessment: boolean;
  confirmationReason: string;
  additionalInformation?: string;
  specificDetails: string;
  allergies: boolean;
  GPRelevant: string;
  priorityOption: any;
  couponCode?: string;
  requestStatus?: RequestStatus;
}

export interface FitToCruiseRequest {
  amount: number;
  firstName: string;
  lastName?: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: Date;
  gender: string;
  passportNumber: string;
  cruiseLineNameAndBooking: string;
  departureDate: Date;
  itinerary: string;
  preExistingMedicalConditions: boolean;
  preExistingMedicalDetails?: string;
  currentlyTakingMedications: boolean;
  currentlyTakingListThem?: string;
  previousCruiseExperience: boolean;
  previousCruiseDetails?: string;
  allergies: boolean;
  allergySpecify?: string;
  recentIllnessOrSurgery: boolean;
  recentIllnessOrSurgeryDetails?: string;
  medicalConsultations: boolean;
  medicalConsultationName?: string;
  physicalActivity: boolean;
  motionSickness: boolean;
  motionSicknessManage?: string;
  specialDietary: string;
  emergencyContacts: string;
  additionalInformation: string;
  passportUpload: string;
  priorityOption: PriorityOption;
  couponCode?: string;
  requestStatus?: RequestStatus;
}

export interface MedicalLetterBlueBadgeRequest {
  amount: number;
  firstName: string;
  lastName?: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: Date;
  gender: string;
  blueBadge: boolean;
  blueBadgeDetails?: string;
  applyBlueBadge: string;
  medicalDisability: string;
  medicalCondition: string;
  medicalDailyLife: string;
  medicalTreatments: string;
  difficultyWalking: boolean;
  limitedMobility: boolean;
  standing: boolean;
  transportation: boolean;
  medicalConditonImpact: string;
  difficultiesFinding: string;
  performDaily: string;
  assistanceCaregiver: boolean;
  careSpecialist: boolean;
  specialistDevices: boolean;
  additionalInfo: string;
  passportUpload: string;
  priorityOption: PriorityOption;
  couponCode?: string;
}

export interface EmergencyCancellationRequest {
  amount: number;
  firstName: string;
  lastName?: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: Date;
  gender: string;
  medicalPractitioner: boolean;
  medicalPractitionerDetails?: string;
  medicalRegularly?: boolean;
  medicalRegularlyDetails?: string;
  mainReasonForCancellation: string;
  symptomsStartDate: Date;
  symptomsDescription: string;
  priorityOption: any;
  medicalCondition: string;
  medicalConditionDetails?: string;
  medicalConditionFile?: string;
  couponCode?: string;
  requestStatus?: RequestStatus;
}

export interface AllergyCertificateRequest {
  amount: number;
  firstName: string;
  lastName?: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: Date;
  gender: string;
  allergies: boolean;
  allergiesDetails?: string;
  specificAllergies: string;
  circumstanceSymptoms?: string;
  severeReaction: boolean;
  emergencyPrescribed: boolean;
  emergencyDetails?: string;
  emergencyMedication: boolean;
  emergencyReadily?: string;
  allergyImpact: string;
  allergyTreatment: boolean;
  allergyTreatmentDetails?: string;
  previousTreatment: boolean;
  previousTreatmentDetails?: string;
  currentMedication: boolean;
  currentMedicationDetails?: string;
  currentAnyMedication: boolean;
  currentAnyMedicationSpecify?: string;
  travelFrequency: boolean;
  travelFrequencyDetails?: string;
  additionalInfo: string;
  passportUpload: string;
  priorityOption: any;
  couponCode?: string;
  requestStatus?: RequestStatus;
}

export interface SportsConsultationFitnessRequest {
  amount: number;
  firstName: string;
  lastName?: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: Date;
  gender: string;
  gpDetails: boolean;
  gpName?: string;
  gpAddress?: string;
  lastBloodPressure?: string;
  bloodPressureTiming?: string;
  gpTelephone?: string;
  gpEmail?: string;
  gpConsulted: boolean;
  gpConsulteDetails?: string;
  height: string;
  weight: string;
  BodyMass: string;
  suffredHighBloodPressure: boolean;
  suffredPalpitations: boolean;
  suffredStroke: boolean;
  suffredHeartAttack: boolean;
  suffredAsthma: boolean;
  suffredBronchitis: boolean;
  suffredChronicDisease: boolean;
  suffredBleedingDisorders: boolean;
  suffredRheumatic: boolean;
  suffredDiabetes: boolean;
  suffredEpilepsy: boolean;
  suffredThyroidDisease: boolean;
  suffredHeatStroke: boolean;
  suffredIntoxication: boolean;
  medicalDisorder: boolean;
  medicalDisorderDetails?: string;
  historyHeartDisease: boolean;
  historyHeartDiseaseDetails?: string;
  suddenCardiac: boolean;
  suddenCardiacDetails?: string;
  chestPains: boolean;
  chestPainsDetails?: string;
  breathlessness: boolean;
  breathlessnessDetails?: string;
  dizziness: boolean;
  dizzinessDetails?: string;
  dizzinessWhenExercising: boolean;
  dizzinessWhenExercisingDetails?: string;
  palpitations: boolean;
  palpitationDetails?: string;
  consciousness: boolean;
  consciousnessDetails?: string;
  currentMedications: boolean;
  currentMedicationDetail?: string;
  admittedHospital: boolean;
  admittedHospitalDetails?: string;
  trainAdequate: boolean;
  cyclingRuningSwimming?: string;
  maximumheartRate: string;
  entranceevents: boolean;
  entranceeventDetails?: string;
  fainted: boolean;
  faintDetails?: string;
  smoke?: string;
  typicalWeek?: string;
  medicalIssues?: boolean;
  medicalIssuesDetails?: string;
  performanceEnhancingDrugs: boolean;
  performanceEnhancingDrugDetails?: string;
  sportingPerformance: boolean;
  sportingPerformanceDetails?: string;
  medicalInsurance: boolean;
  medicalInsuranceDetails?: string;
  enteringOvernext12Months?: string;
  gpSupportingSpecific?: string;
  uploadScanned?: string;
  optionUpload?: string;
  priorityOption: any;
  couponCode?: string;
}

export interface WorkAdjustmentAssessmentRequest {
  orderId?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: Date;
  gender: string;
  reasonForAdjustment: string;
  otherReason?: string;
  medicalCondition: boolean;
  medicalConditionDetails: string;
  medication: boolean;
  medicationDetails?: string;
  physicalDemandsSitting: string;
  physicalDemandsWalking?: string;
  physicalDemandsStanding?: string;
  physicalDemandsBending?: string;
  physicalDemandsReaching?: string;
  physicalDemandsClimbing?: string;
  physicalDemandsliftingWeight?: string;
  physicalDemandstemperatures?: string;
  mentalDemandsIndependently?: string;
  mentalDemandUnderPressure?: string;
  mentalDemandMeeting?: string;
  mentalDemandMultitasking?: string;
  mentalDemandConcentration?: string;
  mentalDemandDecision?: string;
  mentalDemandEmotional?: string;
  mentalDemandInteraction?: string;
  environmentalFactors: boolean;
  functionalLifting?: string;
  functionalSitting?: string;
  specificHours?: string;
  specificTasks?: string;
  specificTasksImpact?: string;
  workingIndependently?: string;
  environmentalDescription?: string;
  interactingWithOthers?: string;
  meetingDeadlines?: string;
  jobDuties: boolean;
  jobDutiesDescription?: string;
  priorityOption: PriorityOption;
  couponCode?: string;
  requestStatus?: RequestStatus;
  amount: number;
}

export enum MedicalReason {
  COLD_FLU = "COLD_FLU",
  INFECTION = "INFECTION",
  BACK_PAIN = "BACK_PAIN",
  ANXIETY_STRESS = "ANXIETY_STRESS",
  OTHER = "OTHER",
}

export enum ConditionStatus {
  ONGOING = "ONGOING",
  PARTIALLY_RECOVERED = "PARTIALLY_RECOVERED",
  FULLY_RECOVERED = "FULLY_RECOVERED",
}

export enum PriorityOption {
  STANDARD_REQUEST = "STANDARD_REQUEST",
  RECOMMENDED_EXPRESS = "RECOMMENDED_EXPRESS",
}

export enum RequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  REFUNDED = "REFUNDED",
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  SPECIALIST = "SPECIALIST",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface Coupon {
  id?: string;
  code: string;
  discount: number;
  expiryDate: string;
}
