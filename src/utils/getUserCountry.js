const getUserCountry = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_LOCATION_URL);
    if (!response.ok) throw new Error("country could not be retrieved");
    const data = await response.json();

    return data?.countryCode;
  } catch (error) {
    console.error(error.message);
    return "US";
  }
};

export default getUserCountry;
