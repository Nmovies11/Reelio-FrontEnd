export async function getShows(API_URL: string, queryParams: URLSearchParams) {
    try {
      const response = await fetch(`${API_URL}/shows?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching data:", error);
        throw new Error(error.message); // Propagate error to be handled in the calling component
      } else {
        console.error("Unexpected error", error);
        throw new Error("An unexpected error occurred.");
      }
    }
  }