import React, { useMemo } from "react";
import { calculateFootprint } from "../../utils/carbonCalculator";
import { submitData } from "../../utils/api";
import { useState } from "react";
import { useFormStore } from "../../store/formStore";
import { Card, SelectionButton, Button } from "../ui";

const FormStep5 = () => {
  const { formData, setFormData, setResults, nextStep, prevStep } =
    useFormStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const wasteOptions = ["Yes, always", "Sometimes", "No"];
  const plasticOptions = [
    `Yes, I'm very conscious`,
    "I try when I can",
    "Not a priority for me",
  ];
  const clothingOptions = [
    "0-2 items",
    "3-5 items",
    "6-10 items",
    "More than 10 items",
  ];

  const canProceed = useMemo(
    () =>
      formData.WasteSegregation &&
      formData.ReduceSingleUsePlastic &&
      formData.ClothingPurchases,
    [formData]
  );

  const handleSubmit = async () => {
    if (!canProceed) return;
    setIsLoading(true);
    setError("");

    try {
      // 1. Calculate the results
      const results = calculateFootprint(formData);
      setResults(results);

      // 2. Submit data to the backend
      const response = await submitData(formData);

      if (!response.success) {
        setError(response.message || "An unknown error occurred.");
        setIsLoading(false);
        return;
      }

      // 3. Proceed to the dashboard
      nextStep();
    } catch (err) {
      console.error("Submission failed:", err);
      setError(
        "Failed to connect to the server. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-text">
          Step 5: Waste & Recycling
        </h2>
        <div>
          <h3 className="font-semibold text-text mb-3">
            1. Does your household segregate wet and dry waste?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {wasteOptions.map((o) => (
              <SelectionButton
                key={o}
                isSelected={formData.WasteSegregation === o}
                onClick={() => setFormData({ WasteSegregation: o })}
              >
                {o}
              </SelectionButton>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-text mb-3">
            2. Do you try to reduce single-use plastic?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plasticOptions.map((o) => (
              <SelectionButton
                key={o}
                isSelected={formData.ReduceSingleUsePlastic === o}
                onClick={() => setFormData({ ReduceSingleUsePlastic: o })}
              >
                {o}
              </SelectionButton>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-text mb-3">
            3. How many new clothing items do you buy in a season (3-4 months)?
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {clothingOptions.map((o) => (
              <SelectionButton
                key={o}
                isSelected={formData.ClothingPurchases === o}
                onClick={() => setFormData({ ClothingPurchases: o })}
              >
                {o}
              </SelectionButton>
            ))}
          </div>
        </div>
        {error && (
          <p className="text-sm text-danger-500 text-center">{error}</p>
        )}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center gap-4 pt-4">
          <Button
            onClick={prevStep}
            variant="outline"
            className="w-full sm:w-auto px-8"
            disabled={isLoading}
          >
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canProceed || isLoading}
            className="w-full sm:w-auto px-8"
            variant="primary"
          >
            {isLoading ? "Submitting..." : "Calculate & See Results"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FormStep5;
