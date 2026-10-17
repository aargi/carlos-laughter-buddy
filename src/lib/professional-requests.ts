// Planned request requirements only. No booking or request submission is live.
export const plannedProfessionalRequest = {
  minimumNoticeDays: 7,
  creditCardRequired: false,
  contactRequired: true,
  dateRequired: true,
  timeRequired: false,
  formatRequired: true,
  participantCountRequired: true,
  formats: ["In person", "Online"],
} as const;