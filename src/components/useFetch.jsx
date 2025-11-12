import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    let cancel = false;

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        if (!cancel) {
          console.log("✅ API carregada:", response.data);
          setData(response.data);
        }
      } catch (err) {
        console.error("❌ Erro ao buscar dados:", err.message);
        if (!cancel) setError(err);
      } finally {
        if (!cancel) setLoading(false);
      }
    };

    fetchData();

    return () => {
      cancel = true;
    };
  }, [url]);

  return { data, error, loading };
}
