import React, { useEffect, useState, useCallback, useContext } from 'react';
import './LaunchItem.css';
import { useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/auth-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';


const LaunchItem = () => {
  const { state } = useLocation();
  const { token, login, logout, userId } = useAuth();
  const { sendRequest } = useHttpClient();
  const [users, setUsers] = useState([]);
  const launchIdFromURL = useParams().lid;
  const auth = useContext(AuthContext);

  const handleAddLaunch = useCallback(async(e) => {
    e.preventDefault()
    try {
      const addData = await sendRequest(
        //`http://localhost:5000/pastLaunch/${launchIdFromURL}/${userId}`,
        `https://spacex-project-backend.vercel.app/pastLaunch/${launchIdFromURL}/${userId}`,
        'PATCH'
      );} 
    catch (err) {}

    alert('Launch added to your watchlist')
    window.location.href='/'
}, [launchIdFromURL, sendRequest, userId])

  const handleRemoveLaunch = useCallback(async(e) => {
    e.preventDefault()

    try {
      const removeData = await sendRequest(
        //`http://localhost:5000/pastLaunch/${launchIdFromURL}/${userId}`,
        `https://spacex-project-backend.vercel.app/pastLaunch/${launchIdFromURL}/${userId}`,
        'DELETE'
      );} catch (err) {}

    alert('Launch removed from your watchlist') 
    window.location.href='/'
  }, [launchIdFromURL, sendRequest, userId]);
    
  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: '0px' });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await sendRequest(
            //'http://localhost:5000/api/users/'
            'https://spacex-project-backend.vercel.app/api/users'
          );
        setUsers(usersData.users);
      } catch (err) {
        console.log(err)
      }
    };

    fetchUsers();
  }, [sendRequest, auth.isLoggedIn, handleAddLaunch, handleRemoveLaunch]);

  let myUser;

  for(let i=0; i<users.length; i++) {
    if(users[i].id === userId) {
        myUser = users[i]
    }
  }

  let hasLaunch = false;

  if(!!myUser) {
    for(let i=0; i<myUser.launches.length; i++) {
      if(myUser.launches[i].launchId === launchIdFromURL) {
        hasLaunch = true;
      }
    }
  }

  //console.log(hasLaunch)

  const url = "https://www.youtube.com/embed/" + state.links.youtube_id

  return (
    <div className='launchItem' key={state.id}>
      <h1>{state.name}</h1>
      {state.fDate ?
        <p>Launch Date: {state.fDate}</p> :
        null
      }
      <p>Successful: {state.success === true ? 'Yes' : state.success === false ? 'No' : 'Launch is pending'}</p>
          {state.links.reddit.campaign ?
            <a className='text' href={state.links.reddit.launch} target='_blank' rel='noreferrer'>Reddit - Campaign</a> :
            null
          }
          {state.links.reddit.launch ?
            <a className='text' href={state.links.reddit.launch} target='_blank' rel='noreferrer'>Reddit - Launch</a> :
             null
          }
          {state.links.wikipedia ?
            <a className='text' href={state.links.wikipedia} target='_blank' rel='noreferrer'>Wikipedia</a> :
            null
          }
          <iframe 
              width="560" 
              height="315" 
              src={url}
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
          </iframe>
          <h2>Rocket</h2>
          <p>{state.rocket.name}</p>
          <p>{state.rocket.active === true ? 'Status: Active' : 'Status: Retired'}</p>
          <p>Stages: {state.rocket.stages}</p>
          <p>Boosters: {state.rocket.boosters}</p>
          <ul>
            {state.rocket.flickr_images.map(image => 
              <a 
                 href={image} 
                target='_blank' 
                rel='noreferrer' 
                key={state.rocket.flickr_images.indexOf(image)} >
              <img 
                 key={state.rocket.flickr_images.indexOf(image)} 
                src={image}
                alt='rocket'
              />
              </a>)}
          </ul>
          {(hasLaunch === false) && auth.isLoggedIn && <button onClick={handleAddLaunch}>Add to watchlist</button>}
          {(hasLaunch === true) && auth.isLoggedIn && <button onClick={handleRemoveLaunch}>Remove from watchlist</button>}
        </div> 
    )
}

export default LaunchItem;