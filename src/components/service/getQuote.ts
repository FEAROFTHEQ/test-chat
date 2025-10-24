import axios from "axios";

const api = import.meta.env.VITE_API_KEY;

interface QuoteResponse {
  quote: string;
}

export async function fetchRandomQuote(): Promise<string> {
  const response = await axios.get<QuoteResponse[]>(
    "https://api.api-ninjas.com/v1/quotes",
    {
      headers: { "X-Api-Key": api },
    }
  );

  return response.data[0].quote;
}
