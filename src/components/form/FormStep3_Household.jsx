import React, { useMemo } from "react";
import { useFormStore } from "../../store/formStore";
import { Card, SelectionButton, Button } from "../ui";

const FormStep3 = () => {
  const { formData, setFormData, nextStep, prevStep } = useFormStore();

  const electricityOptions = [
    "0-100 Units",
    "101-200 Units",
    "201-300 Units",
    "301-500 Units",
    ">500 Units",
  ];

  const cookingFuelOptions = [
    "LPG Cylinder",
    "Piped Natural Gas (PNG)",
    "Electric/Induction",
    "Kerosene/Firewood",
  ];

  const acOptions = [
    "No AC",
    "1-3 hours",
    "4-6 hours",
    "7-10 hours",
    "More than 10 hours",
  ];
  const applianceOptions = [
    "Yes, most are 5-star",
    "Some of them are",
    "No, I don't know",
  ];

  const canProceed = useMemo(
    () =>
      formData.ElectricityConsumption &&
      formData.CookingFuel &&
      formData.ACHours &&
      formData.EfficientAppliances,
    [formData]
  );

  return (
    <Card>
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-text">
          Step 3: Household & Energy
        </h2>
        <div>
          <h3 className="font-semibold text-text mb-3">
            1. What is your average monthly household electricity consumption?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {electricityOptions.map((o) => (
              <SelectionButton
                key={o}
                isSelected={formData.ElectricityConsumption === o}
                onClick={() => setFormData({ ElectricityConsumption: o })}
              >
                {o}
              </SelectionButton>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-text mb-3">
            2. What is your primary household cooking fuel?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {cookingFuelOptions.map((o) => (
              <SelectionButton
                key={o}
                isSelected={formData.CookingFuel === o}
                onClick={() => setFormData({ CookingFuel: o })}
              >
                {o}
              </SelectionButton>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-text mb-3">
            3. During summer, how many hours a day is an AC used in your home?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {acOptions.map((o) => (
              <SelectionButton
                key={o}
                isSelected={formData.ACHours === o}
                onClick={() => setFormData({ ACHours: o })}
              >
                {o}
              </SelectionButton>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-text mb-3">
            4. Do you actively use energy-efficient (5-star rated) appliances?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {applianceOptions.map((o) => (
              <SelectionButton
                key={o}
                isSelected={formData.EfficientAppliances === o}
                onClick={() => setFormData({ EfficientAppliances: o })}
              >
                {o}
              </SelectionButton>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center pt-4">
          <Button
            onClick={prevStep}
            variant="secondary"
            className="w-auto px-6"
          >
            Back
          </Button>
          <Button
            onClick={nextStep}
            disabled={!canProceed}
            className="w-auto px-6"
          >
            Next: Consumption
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FormStep3;
