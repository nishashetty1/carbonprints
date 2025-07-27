import React, { useMemo } from "react";
import { useFormStore } from "../../store/formStore";
import { Card, SelectionButton, Button } from "../ui";

const FormStep4 = () => {
  const { formData, setFormData, nextStep, prevStep } = useFormStore();

  const dietOptions = [
    "Vegetarian",
    "Eggetarian",
    "Non-Vegetarian (Fish/Chicken)",
    "Non-Vegetarian (incl. Red Meat)",
    "Vegan",
    "Mixed (Vegetarian + Non-Vegetarian)",
  ];
  const foodOrderOptions = [
    "Rarely (0-1 time)",
    "Sometimes (2-3 times)",
    "Often (4-5 times)",
    "Almost Daily",
  ];

  const canProceed = useMemo(
    () => formData.DietType && formData.FoodOrdered,
    [formData]
  );

  return (
    <Card>
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-text">
          Step 4: Diet & Consumption
        </h2>
        <div>
          <h3 className="font-semibold text-text mb-3">
            1. Which of these best describes your diet?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {dietOptions.map((o) => (
              <SelectionButton
                key={o}
                isSelected={formData.DietType === o}
                onClick={() => setFormData({ DietType: o })}
              >
                {o}
              </SelectionButton>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-text mb-3">
            2. How often do you eat food ordered from outside per week?
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {foodOrderOptions.map((o) => (
              <SelectionButton
                key={o}
                isSelected={formData.FoodOrdered === o}
                onClick={() => setFormData({ FoodOrdered: o })}
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
            Next: Waste
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FormStep4;
