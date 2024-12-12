import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
interface User {
  email: string;
  name: string;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');


      try {
        const response = await fetch(`${API_URL}/account`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        //remove token if not valid
        if (response.status === 401) {
          localStorage.removeItem('token');
        }

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch account data');
          localStorage.removeItem('token');
        }
      } catch (err) {
        setError('An unexpected error occurred');
        console.log(error, err);
      } finally {
        setLoading(false);
        if(loading)
        {
          console.log("loading");
        }
      }
    };

    checkAuthentication();
  }, [API_URL, router, error, loading]);

  return user;
};

export default useAuth;
