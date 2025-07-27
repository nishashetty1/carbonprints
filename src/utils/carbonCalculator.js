// These are simplified emission factors for demonstration purposes.

const EMISSION_FACTORS = {
  // Transport (kg CO2e per km)
  transport: {
    Metro: 0.014,
    "Local Train": 0.022,
    Monorail: 0.04,
    "Public Bus": 0.08,
    "Auto Rickshaw": 0.11,
    "Bike/Scooter": 0.12,
    Carpool: 0.15,
    "Private Car/Cab": 0.2,
    "Walking/Cycling": 0,
  },
  // Average distance mapping (km)
  distance: {
    "Less than 5 km": 3,
    "5-10 km": 7.5,
    "11-20 km": 15,
    "21-30 km": 25,
    "More than 30 km": 35,
  },
  // Cab usage (extra km per month)
  cab: {
    "Rarely (0-2 times)": 20,
    "Occasionally (3-5 times)": 60,
    "Frequently (6-10 times)": 120,
    "Very Frequently (>10 times)": 200,
  },
  // Flights (kg CO2e per round trip)
  flights: {
    None: 0,
    "1-2 flights": 300,
    "3-4 flights": 750,
    "5+ flights": 1200,
  },
  // Household (kg CO2e)
  electricity: {
    // per kWh
    "0-100 Units": 0.82 * 50,
    "101-200 Units": 0.82 * 150,
    "201-300 Units": 0.82 * 250,
    "301-500 Units": 0.82 * 400,
    ">500 Units": 0.82 * 600,
  },
  ac: {
    // extra kg CO2e per month
    "No AC": 0,
    "1-3 hours": 50,
    "4-6 hours": 100,
    "7-10 hours": 180,
    "More than 10 hours": 250,
  },
  // Consumption (kg CO2e per month)
  diet: {
    Vegan: 60,
    Vegetarian: 75,
    Eggetarian: 90,
    "Mixed (Vegetarian + Non-Vegetarian)": 100,
    "Non-Vegetarian (Fish/Chicken)": 120,
    "Non-Vegetarian (incl. Red Meat)": 200,
  },
  waste: {
    // kg CO2e per month based on habits
    "Yes, always": 10,
    Sometimes: 20,
    No: 30,
  },
};

export const calculateFootprint = (formData) => {
  const breakdown = {
    travel: 0,
    household: 0,
    consumption: 0,
  };

  const dailyKm = EMISSION_FACTORS.distance[formData.DailyDistance] || 0;
  const transportFactor =
    EMISSION_FACTORS.transport[formData.PrimaryTransport] || 0;
  const primaryTravelEmissions = dailyKm * 2 * 22 * transportFactor; // 22 working days
  const cabEmissions = (EMISSION_FACTORS.cab[formData.CabUsage] || 0) * 0.15; // Assume cab factor
  const flightEmissions =
    (EMISSION_FACTORS.flights[formData.FlightsPerYear] || 0) / 12; // Monthly
  breakdown.travel = primaryTravelEmissions + cabEmissions + flightEmissions;

  // --- Household Calculation (monthly) ---
  const electricityEmissions =
    EMISSION_FACTORS.electricity[formData.ElectricityConsumption] || 0;
  const acEmissions = EMISSION_FACTORS.ac[formData.ACHours] || 0;
  breakdown.household = electricityEmissions + acEmissions;

  // --- Consumption Calculation (monthly) ---
  const dietEmissions = EMISSION_FACTORS.diet[formData.DietType] || 0;
  const wasteEmissions = EMISSION_FACTORS.waste[formData.WasteSegregation] || 0;
  breakdown.consumption = dietEmissions + wasteEmissions;

  const totalFootprint =
    breakdown.travel + breakdown.household + breakdown.consumption;

  return {
    totalFootprint,
    breakdown,
  };
};
