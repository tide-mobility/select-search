"use client"; // Add this line
import { createClient } from "@supabase/supabase-js";
import { ReactNode, useState } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

interface SearchResult {
  id: number;
  title: string;
  description: string;
  property_name_kor: ReactNode;
  property_name_eng: ReactNode;
  sabre_id: ReactNode;
  paragon_id: ReactNode;
}

interface ApiResponse {
  data: SearchResult[];
  error: Error | null;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  // const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false); // Step 1: Add state for search tracking
  // const [results, setResults] = useState([]); // Assuming you have a state for results
  const [results, setResults] = useState<SearchResult[]>([]);
  // const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("search_sabre") // 테이블 명
        .select("*")
        .or(
          `sabre_id.ilike.%${query}%,property_name_eng.ilike.%${query}%,paragon_id.ilike.%${query}%`
        );
      if (error) throw error;
      // setResults(data || []);
      setResults(data || []);
    } catch (err: unknown) {
      setError((err as Error).message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
    setHasSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">
          Sabre 숙소 시설, ID 검색 ver 0.001
        </h1>
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter search query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown} // 엔터 키 핸들러
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {/* <div className="mt-4">
          {results.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {results.map((result) => (
                <li key={result.id} className="py-4">
                  <h2 className="text-lg font-semibold">{result.property_name_kor}</h2>
                  <p className="text-gray-600">{result.property_name_eng}</p>
                  <h2 className="text-lg font-semibold">{result.blog_title}</h2>
                  <p className="text-gray-600">{result.blog_sub_title}</p>
                </li>
              ))}
            </ul>
            
          ) : (
            <p className="text-gray-500">No results found.</p>
          )}
        </div> */}
        <div className="mt-4">
          {/* Property Results */}
          {results.filter(
            (result) => result.sabre_id || result.property_name_eng
          ).length > 0 ? (
            <div>
              <h3 className="text-xl font-bold">Sabre 숙소 시설 검색 결과</h3>
              <ul className="divide-y divide-gray-200">
                {results.map((result) =>
                  result.sabre_id || result.property_name_eng ? (
                    <li key={result.id} className="py-4">
                      <h2 className="text-lg font-semibold">
                        {result.property_name_eng}
                      </h2>
                      <p className="text-gray-600">
                        Sabre ID: {result.sabre_id}
                      </p>
                      <p className="text-gray-600">
                        Paragon ID: {result.paragon_id}
                      </p>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          ) : (
            hasSearched && ( // Step 3: Check hasSearched before displaying message
              <p className="text-gray-500">No property results found.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
