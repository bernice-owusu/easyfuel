import { useEffect, useState } from "react";
import { ALL_COUNTRIES_OPTIONS } from "../data/countries";

export interface CountryOption {
  value: string;
  label: string;
}

export const useCountries = (): {
  countries: CountryOption[];
  loading: boolean;
  error: string | null;
} => {
  const [countries, setCountries] = useState<CountryOption[]>(ALL_COUNTRIES_OPTIONS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return { countries, loading, error };
};