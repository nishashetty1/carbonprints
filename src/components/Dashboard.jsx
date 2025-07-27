import React, { useState, useEffect, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useFormStore } from "../store/formStore";
import { getAllResponses } from "../utils/api";
import { Card, Button } from "./ui";

// Helper Components for Tabs & Charts

const TabButton = ({ children, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`px-3 sm:px-4 py-2 text-sm font-semibold rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
      isActive
        ? "bg-primary text-white shadow-sm"
        : "bg-background text-text-light hover:bg-gray-200"
    }`}
  >
    {children}
  </button>
);

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// --- Main Dashboard Component ---

const Dashboard = () => {
  const { results, formData, reset } = useFormStore();
  const [activeTab, setActiveTab] = useState("personal");
  const [aggregatedData, setAggregatedData] = useState({
    departmentData: [],
    overallAverage: 0,
    transportData: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getAllResponses();
      if (
        response.success &&
        typeof response.data === "object" &&
        response.data !== null
      ) {
        setAggregatedData(response.data);
      } else {
        console.error("Failed to receive valid aggregated data from server.");
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  const { departmentData, overallAverage, transportData } = aggregatedData;

  const renderContent = () => {
    if (loading)
      return (
        <p className="text-center text-text-light py-10">Loading insights...</p>
      );
    if (departmentData.length === 0 && activeTab !== "personal") {
      return (
        <p className="text-center text-text-light py-10">
          No submission data found to generate insights.
        </p>
      );
    }
    switch (activeTab) {
      case "personal":
        return <PersonalReport results={results} />;
      case "department":
        return (
          <DepartmentReport
            departmentData={departmentData}
            currentUserDept={formData.Department}
          />
        );
      case "overall":
        return (
          <OverallReport
            transportData={transportData}
            overallAverage={overallAverage}
            totalSubmissions={Object.values(transportData).reduce(
              (a, b) => a + b,
              0
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <h2 className="text-2xl sm:text-3xl font-bold text-text text-center">
        Carbon Footprint Dashboard
      </h2>
      <div className="flex flex-wrap justify-center gap-2 p-2 bg-background rounded-lg">
        <TabButton
          onClick={() => setActiveTab("personal")}
          isActive={activeTab === "personal"}
        >
          Your Report
        </TabButton>
        <TabButton
          onClick={() => setActiveTab("department")}
          isActive={activeTab === "department"}
        >
          Department Insights
        </TabButton>
        <TabButton
          onClick={() => setActiveTab("overall")}
          isActive={activeTab === "overall"}
        >
          College Insights
        </TabButton>
      </div>
      <div className="min-h-[350px]">{renderContent()}</div>
      <div className="pt-4 flex justify-center">
        <Button onClick={reset} variant="outline" className="w-auto px-8">
          Take the Survey Again
        </Button>
      </div>
    </Card>
  );
};

// --- Sub-Components for each Tab ---

const PersonalReport = ({ results }) => {
  const { totalFootprint, breakdown } = results;
  const pieData = Object.keys(breakdown).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: breakdown[key],
  }));
  const COLORS = ["#3b82f6", "#10b981", "#f97316", "#ef4444"];

  const treesToPlant = Math.ceil((totalFootprint * 12) / 20); // Assuming 1 tree absorbs ~20kg CO2/year

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="w-full h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toFixed(2)} kg CO₂e`} />
              <Legend wrapperStyle={{ fontSize: "14px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-primary p-6 rounded-lg text-center text-white shadow-lg">
          <h3 className="text-lg font-semibold">
            Your Total Monthly Footprint
          </h3>
          <p className="text-5xl font-bold tracking-tight">
            {totalFootprint.toFixed(2)}
          </p>
          <p className="text-lg">kg CO₂e</p>
        </div>
      </div>
      <div className="text-center bg-green-50 border border-green-200 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800">
          How to Neutralize Your Footprint ?
        </h3>
        <p className="mt-1 text-green-700">
          Planting approximately{" "}
          <span className="font-bold">{treesToPlant} trees</span> this year
          could help offset your carbon emissions.
        </p>
      </div>
    </div>
  );
};

const DepartmentReport = ({ departmentData, currentUserDept }) => {
  const sortedData = useMemo(() => {
    if (!departmentData || !departmentData.length)
      return { sorted: [], lowest: null, highest: null };
    const sorted = [...departmentData].sort((a, b) => a.average - b.average);
    return {
      sorted,
      lowest: sorted[0],
      highest: sorted[sorted.length - 1],
    };
  }, [departmentData]);

  const { sorted, lowest, highest } = sortedData;

  const getColor = (value) => {
    if (!lowest || !highest || lowest.average === highest.average)
      return "#3b82f6";
    const ratio = (value - lowest.average) / (highest.average - lowest.average);
    const hue = 120 - ratio * 120;
    return `hsl(${hue}, 70%, 50%)`;
  };

  const renderInsight = () => {
    if (!lowest || !highest) return null;

    // Case 1: Only one department has data.
    if (lowest.name === highest.name) {
      return (
        <p className="text-text-light text-sm mt-1">
          Data from more departments is needed to generate a comparison. Keep
          encouraging submissions!
        </p>
      );
    }

    // Case 2: Multiple departments, show the comparison.
    return (
      <p className="text-text-light text-sm mt-1">
        Excellent work by the{" "}
        <span className="font-bold text-green-600">{lowest.name}</span>{" "}
        department for having the lowest average footprint! The{" "}
        <span className="font-bold text-red-600">{highest.name}</span>{" "}
        department has the largest footprint, highlighting an opportunity for
        collective action, like promoting public transport.
      </p>
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-text text-center">
        Department Average Footprints
      </h3>
      <p className="text-center text-text-light text-sm">
        Compare your department's average with others.
      </p>
      <div className="w-full h-80 mt-4">
        <ResponsiveContainer>
          <BarChart
            data={sorted}
            margin={{ top: 5, right: 10, left: -20, bottom: 55 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              interval={0}
              height={60}
              tick={{ fontSize: 12 }}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value) => `${value.toFixed(2)} kg CO₂e`}
              cursor={{ fill: "rgba(243, 244, 246, 0.5)" }}
            />
            <Bar dataKey="average" radius={[4, 4, 0, 0]}>
              {sorted.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getColor(entry.average)}
                  stroke={entry.name === currentUserDept ? "#111827" : "none"}
                  strokeWidth={3}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-background border border-border p-4 rounded-lg text-center">
        <h4 className="font-semibold text-text">Key Insight</h4>
        {renderInsight()}
      </div>
    </div>
  );
};

const OverallReport = ({ transportData, overallAverage, totalSubmissions }) => {
  const pieData = Object.keys(transportData).map((key) => ({
    name: key,
    value: transportData[key],
  }));
  const COLORS = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#ffc107",
    "#e377c2",
    "#00bcd4",
    "#bcbd22",
    "#4caf50",
    "#9c27b0"
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-text text-center">
        College-Wide Insights
      </h3>
      <div className="text-center bg-background border border-border p-4 rounded-lg">
        <p className="text-lg text-text-light">Overall Average Footprint</p>
        <p className="text-4xl font-bold text-accent">
          {overallAverage.toFixed(2)} kg CO₂e
        </p>
        <p className="text-sm text-text-light">
          across {totalSubmissions} submissions
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-text text-center mb-2">
          Most Common Primary Transport
        </h4>
        <div className="w-full h-72">
          <ResponsiveContainer>
            <PieChart margin={{ top: 20 }}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} students`, name]}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                className="mt-16"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
