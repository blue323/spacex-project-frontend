import React, { useEffect, useContext } from 'react';
import './UserItem.css';
import { useLocation } from 'react-router-dom';
import LaunchesList from '../launches/LaunchesList';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useParams } from 'react-router-dom';

const UserItem = ({ allLaunches }) => {
  const { state } = useLocation();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userIdFromURL = useParams().userId;

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' });
  }, []);

  const loadedPastL = []

  if(!!allLaunches && !!state) {
    for(let i=0; i<allLaunches.length; i++) {
      for(let j=0; j<state.launches.length; j++) {
        if(allLaunches[i].id === state.launches[j].launchId) {
          loadedPastL.push(allLaunches[i])
        }
      }
    }

    const handleDelete = async (e) => {
      e.preventDefault()

      try {
        const responseData = await sendRequest(
          //`http://localhost:5000/api/users/user/${state.id}`,
          `https://spacex-project-backend.vercel.app/api/users/user/${state.id}`,
          'DELETE',
          {
            'Content-Type': 'application/json'
          }
        );} catch (err) {}

        alert('Your account was deleted')
        auth.logout()
        window.location.href='/'
    }

    return (
      <div className='userItem' key={state.id}>
        <h1>{!!auth.isLoggedIn && userIdFromURL === auth.userId ? 'My' : `${state.name}'s`} watchlist</h1>
        <LaunchesList launches={loadedPastL} />
        {loadedPastL.length === 0 && <p>No launches!</p>}
        {auth.isLoggedIn && state.id === auth.userId && <button onClick={handleDelete}>Delete Account</button>}
      </div>
      )
    }

    

    return (
      <h2 className='userItem-error'>Something went wrong</h2>
    )
}

export default UserItem;