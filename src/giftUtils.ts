// giftUtils.ts

export enum Relationship {
  TeamMate = "team mate",
  TeamLead = "team-lead",
  InSameGroup = "in same group",
  Manager = "manager" // Added "Manager" to the enum
}

export enum Event {
  Birth = "birth",
  Birthday = "birthday",
  LeavingTheGroup = "leaving the group",
  LeavingWix = "leaving wix"
}

// Array of parameter objects with the name and enum
export const params = [
  { name: "Relationship", enum: Relationship },
  { name: "Event", enum: Event }
];

export const calculateGiftAmount = (
  relationship: Relationship,
  event: Event
): number => {
  const relationshipMultiplier = relationshipMultipliers[relationship];
  const eventMultiplier = eventMultipliers[event];
  const totalAmount = 50 * relationshipMultiplier * eventMultiplier;
  return totalAmount;
};

// Separate objects to store multipliers for relationship and event
const relationshipMultipliers: Record<Relationship, number> = {
  [Relationship.TeamMate]: 1,
  [Relationship.TeamLead]: 2,
  [Relationship.InSameGroup]: 1.5,
  [Relationship.Manager]: 3 // Define the multiplier for "Manager"
};

const eventMultipliers: Record<Event, number> = {
  [Event.Birth]: 1.2,
  [Event.Birthday]: 1.5,
  [Event.LeavingTheGroup]: 2,
  [Event.LeavingWix]: 2
};
