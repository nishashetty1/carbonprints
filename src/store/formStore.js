import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the initial state for your form data.
const initialFormData = {
  FullName: "",
  RollNumber: "",
  Division: "",
  Gender: "",
  Department: "",
  PrimaryTransport: "",
  DailyDistance: "",
  CabUsage: "",
  FlightsPerYear: "",
  ElectricityConsumption: "",
  ACHours: "",
  EfficientAppliances: "",
  DietType: "",
  FoodOrdered: "",
  WasteSegregation: "",
  ReduceSingleUsePlastic: "",
  ClothingPurchases: "",
};

export const useFormStore = create(
  persist(
    (set) => ({
      // --- STATE ---
      step: 1,
      formData: initialFormData,
      results: {
        totalFootprint: 0,
        breakdown: {},
      },

      allResponses: [],
      // --- ACTIONS ---
      nextStep: () => set((state) => ({ step: state.step + 1 })),
      prevStep: () => set((state) => ({ step: state.step - 1 })),
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      setAllResponses: (responses) => set({ allResponses: responses }),
      setResults: (results) => set({ results }),
      reset: () =>
        set({
          step: 1,
          formData: initialFormData,
          results: { totalFootprint: 0, breakdown: {} },
          allResponses: [],
        }),
    }),
    {
      // Configuration for the persist middleware
      name: "carbon-tracker-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
