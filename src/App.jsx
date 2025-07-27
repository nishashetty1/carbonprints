import React from "react";
import { useFormStore } from "./store/formStore";
import {
  FormStep1,
  FormStep2,
  FormStep3,
  FormStep4,
  FormStep5,
} from "./components/form";
import Dashboard from "./components/Dashboard";

const App = () => {
  const step = useFormStore((state) => state.step);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <FormStep1 />;
      case 2:
        return <FormStep2 />;
      case 3:
        return <FormStep3 />;
      case 4:
        return <FormStep4 />;
      case 5:
        return <FormStep5 />;
      case 6:
        return <Dashboard />;
      default:
        return <FormStep1 />;
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative z-10">
        <header className="text-center mb-6 md:mb-8 flex flex-col items-center">
          <img
            src="/logo.png"
            alt="CarbonMeter Logo"
            className="w-24 h-24 mb-4"
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-logo">
            CarbonPrints
          </h1>
          <p className="text-md sm:text-lg text-logo mt-2">
            Discover your environmental impact.
          </p>
        </header>

        <main className="w-full max-w-2xl">{renderStep()}</main>

        <footer className="text-center mt-8 text-text">
          <p>
            Built by{" "}
            <a
              href="https://linkedin.com/in/nishashetty2022"
              className="text-logo hover:underline"
            >
              Nisha Shetty
            </a>{" "}
            &{" "}
            <a
              href="https://linkedin.com/in/adarshnambiar12"
              className="text-logo hover:underline"
            >
              Adarsh Nambiar
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default App;
