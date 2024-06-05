import React, { useEffect } from 'react';
import useGetAuthenticatedUser from '../hooks/useGetAuthenticatedUser';

const Home = (props) => {
  const { authUser, loading } = useGetAuthenticatedUser();

  useEffect(() => {
    if (authUser !== null) {
      props.setAuthenticatedUser(authUser);
    }
  }, [authUser, props]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {authUser !== null ? (
        <div>
        <div className="name">Hi {authUser.name}</div>
        <div className="name">Username:- {authUser.username}</div>
        <div className="name">Email:- {authUser.email}</div>
        </div>

      ) : (
        <div className="unauth">Unauthenticated User</div>
      )}
    </>
  );
};

export default Home;
