export const submitData = async (formData) => {
  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Server response:", result.message);
    return { success: true };
  } catch (error) {
    console.error("Failed to submit data to server:", error);
    return { success: false, error };
  }
};

export const getAllResponses = async () => {
  try {
    const response = await fetch("/api/responses");
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    const jsonData = await response.json();
    return { success: true, data: jsonData };
  } catch (error) {
    console.error("Failed to fetch all responses:", error);
    return { success: false, error };
  }
};
