import React, { useMemo } from "react";
import { useFormStore } from "../../store/formStore";
import { Card, InputField, SelectionButton, Button } from "../ui";

const FormStep1 = () => {
  // Get state and actions from the Zustand store
  const { formData, setFormData, nextStep } = useFormStore();

  // Define options for selection
  const divisionOptions = ["A", "B"];
  const genderOptions = ["Male", "Female", "Other"];
  const departmentOptions = ["CMPN", "IT", "EXCS", "EXTC", "BIOM"];

  // Memoize the validation check to prevent re-calculation on every render
  const canProceed = useMemo(() => {
    return (
      formData.FullName.trim() &&
      formData.RollNumber.trim() &&
      formData.Division &&
      formData.Gender &&
      formData.Department
    );
  }, [formData]);

  const handleInputChange = (e) => {
    setFormData({ [e.target.name]: e.target.value });
  };

  return (
    <Card>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-text">Step 1: Your Details</h2>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Full Name"
            id="FullName"
            name="FullName"
            value={formData.FullName}
            onChange={handleInputChange}
            placeholder="e.g. John Doe"
          />
          <InputField
            label="Roll Number"
            id="RollNumber"
            name="RollNumber"
            value={formData.RollNumber}
            onChange={handleInputChange}
            placeholder="e.g. 22102A0011"
          />
        </div>

        {/* Division Selection */}
        <div>
          <h3 className="text-sm font-medium text-text mb-2">Division</h3>
          <div className="grid grid-cols-2 gap-4">
            {divisionOptions.map((option) => (
              <SelectionButton
                key={option}
                isSelected={formData.Division === option}
                onClick={() => setFormData({ Division: option })}
              >
                {option}
              </SelectionButton>
            ))}
          </div>
        </div>

        {/* Gender Selection */}
        <div>
          <h3 className="text-sm font-medium text-text mb-2">Gender</h3>
          <div className="grid grid-cols-3 gap-4">
            {genderOptions.map((option) => (
              <SelectionButton
                key={option}
                isSelected={formData.Gender === option}
                onClick={() => setFormData({ Gender: option })}
              >
                {option}
              </SelectionButton>
            ))}
          </div>
        </div>

        {/* Department Selection */}
        <div>
          <h3 className="text-sm font-medium text-text mb-2">Department</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {departmentOptions.map((option) => (
              <SelectionButton
                key={option}
                isSelected={formData.Department === option}
                onClick={() => setFormData({ Department: option })}
              >
                {option}
              </SelectionButton>
            ))}
          </div>
        </div>

        {/* Navigation Button */}
        <div className="pt-4">
          <Button onClick={nextStep} disabled={!canProceed}>
            Next: Travel & Commute
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FormStep1;
