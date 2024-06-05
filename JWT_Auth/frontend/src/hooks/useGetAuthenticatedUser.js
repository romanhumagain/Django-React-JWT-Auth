import { useState, useEffect } from 'react';

const useGetAuthenticatedUser = () => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchAuthenticatedUser = async () => {
      const URL = 'http://127.0.0.1:8000/api/user/';
      try {
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        if (!response.ok) {
          throw Error('Network response is not OK!');
        }
        const userData = await response.json();
        setAuthUser(userData);
      } catch (error) {
        console.log("ERROR", error);
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthenticatedUser();
  }, []);

  return { authUser, loading };
};

export default useGetAuthenticatedUser;
