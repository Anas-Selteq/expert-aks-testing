export const ServicePageMovement = (screenName: string) => {
  switch (screenName) {
    case "ExpertVenue":
      return "flowManagementPages/expert_venue";
    case "ExpertAddress":
      return "flowManagementPages/expert_address";
    case "ExpertNotes":
      return "flowManagementPages/expert_notes";
    case "ExpertSlots":
      return "flowManagementPages/expert_date_time";
    case "ExpertBusiness":
      return "flowManagementPages/expert_business";
    case "PaymentScreen":
      return "flowManagementPages/expert_payment";
    default:
      return "/";
  }
};
