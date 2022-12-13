import React, { useEffect, useState } from 'react';
import './UserMyWatchlist.css';
import LaunchesList from '../launches/LaunchesList';
import { useAuth } from '../../shared/hooks/auth-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserMyWatchlist = ({ allLaunches }) => {
  const { logout, userId } = useAuth();
  const { sendRequest } = useHttpClient();
  const [users, setUsers] = useState([]);
    
  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await sendRequest(
            //'http://localhost:5000/api/users/'
            'https://spacex-project-backend.vercel.app/api/users/'
          );
        setUsers(usersData.users);
      } catch (err) {
        console.log(err)
      }
    };

    fetchUsers();
  }, [sendRequest]);

  let myUser;

  for(let i=0; i<users.length; i++) {
    if(users[i].id === userId) {
        myUser = users[i]
    }
  }

  const loadedPastL = []

  if(!!allLaunches && !!myUser) {
    for(let i=0; i<allLaunches.length; i++) {
      for(let j=0; j<myUser.launches.length; j++) {
        if(allLaunches[i].id === myUser.launches[j].launchId) {
          loadedPastL.push(allLaunches[i])
        }
      }
    }

    const handleDelete = async (e) => {
      e.preventDefault()

      try {
        const responseData = await sendRequest(
          //`http://localhost:5000/api/users/user/${userId}`,
          `https://spacex-project-backend.vercel.app/api/users/user/${userId}`,
          'DELETE',
          {
            'Content-Type': 'application/json'
          }
        );} catch (err) {}

        alert('Your account was deleted')
        logout()
        window.location.href='/'
    }

    return (
      <div className='userW' key={userId}>
            <h1>My watchlist</h1>
            <LaunchesList launches={loadedPastL} />
            {loadedPastL.length === 0 && <p>No launches!</p>}
            <button onClick={handleDelete}>Delete Account</button>
    </div>)
    } else {
      return (
        <h2 className='userw-error'>Waiting for data...</h2>
      )
    }

    
}

export default UserMyWatchlist;
