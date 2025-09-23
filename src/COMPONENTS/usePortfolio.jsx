import { useState, useEffect } from "react";

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // ✅ get from localStorage
    if (!userId) {
      console.warn("No userId found in localStorage");
      setLoading(false);
      return;
    }

    const fetchPortfolio = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/portfolio/user/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Portfolio API response:", data);
          if (data.length > 0) {
            setPortfolio(data[0]); // backend returns a list
          }
        } else {
          console.error("Failed to fetch portfolio");
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  return { portfolio, loading };
}
