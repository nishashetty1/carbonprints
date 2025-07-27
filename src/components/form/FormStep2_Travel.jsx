import React, { useMemo } from "react";
import { useFormStore } from "../../store/formStore";
import { Card, SelectionButton, Button } from "../ui";

const FormStep2 = () => {
  const { formData, setFormData, nextStep, prevStep } = useFormStore();

  const transportOptions = [
    "Metro",
    "Monorail",
    "Local Train",
    "Public Bus",
    "Auto Rickshaw",
    "Private Car/Cab",
    "Carpool",
    "Bike/Scooter",
    "Walking/Cycling",
  ];
  const distanceOptions = [
    "Less than 5 km",
    "5-10 km",
    "11-20 km",
    "21-30 km",
    "More than 30 km",
  ];
  const cabUsageOptions = [
    "Rarely (0-2 times)",
    "Occasionally (3-5 times)",
    "Frequently (6-10 times)",
    "Very Frequently (>10 times)",
  ];
  const flightOptions = ["None", "1-2 flights", "3-4 flights", "5+ flights"];

  const canProceed = useMemo(
    () =>
      formData.PrimaryTransport &&
      formData.DailyDistance &&
      formData.CabUsage &&
      formData.FlightsPerYear,
    [formData]
  );

  return (
    <Card>
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-text">
          Step 2: Travel & Commute
        </h2>
        <div>
          <h3 className="font-semibold text-text mb-3">
            1. What is your primary mode of transport to and from college?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {transportOptions.map((o) => (
              <SelectionButton
                key={o}
                isSelected={formData.PrimaryTransport === o}
                onClick={() => setFormData({ PrimaryTransport: o })}
              >
                {o}
              </SelectionButton>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-text mb-3">
            2. On average, what is your daily one-way travel distance?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {distanceOptions.map((o) => (
              <SelectionButton
                key={o}
                isSelected={formData.DailyDistance === o}
                onClick={() => setFormData({ DailyDistance: o })}
              >
                {o}
              </SelectionButton>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-text mb-3">
            3. How often do you use app-based cabs (Uber/Ola) in a month?
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {cabUsageOptions.map((o) => (
              <SelectionButton
                key={o}
                isSelected={formData.CabUsage === o}
                onClick={() => setFormData({ CabUsage: o })}
              >
                {o}
              </SelectionButton>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-text mb-3">
            4. How many round-trip domestic flights have you taken in the past
            year?
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {flightOptions.map((o) => (
              <SelectionButton
                key={o}
                isSelected={formData.FlightsPerYear === o}
                onClick={() => setFormData({ FlightsPerYear: o })}
              >
                {o}
              </SelectionButton>
            ))}
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center gap-4 pt-4">
          <Button
            onClick={prevStep}
            variant="outline"
            className="w-full sm:w-auto px-8"
          >
            Back
          </Button>
          <Button
            onClick={nextStep}
            disabled={!canProceed}
            className="w-full sm:w-auto px-8"
          >
            Next: Household
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FormStep2;
