import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    let cancel = false;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        console.log('🌐 Buscando:', url);
        const response = await axios.get(url, {
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!cancel) {
          console.log('✅ API carregada:', response.data);
          setData(response.data);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('⚠️ Requisição cancelada');
        } else {
          console.error('❌ Erro ao buscar dados:', err.message);
          if (!cancel) setError(err.response?.data?.error || 'Erro ao carregar dados.');
        }
      } finally {
        if (!cancel) setLoading(false);
      }
    };

    fetchData();

    return () => {
      cancel = true;
      controller.abort();
    };
  }, [url]);

  return { data, error, loading };
}