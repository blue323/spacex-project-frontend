import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import './App.css';
import { past } from './bodyToQueryLaunches';
import { useHttpClient } from './shared/hooks/http-hook'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import LoadingSpinner from './shared/UIElements/LoadingSpinner';
import Launches from './components/launches/Launches';
import NavBar from './components/navbar/NavBar';
import Users from './components/users/Users';
import UserItem from './components/users/UserItem';
import Auth from './components/auth/Auth';
import UserMyWatchlist from './components/users/UserMyWatchlist';

const Home = lazy(() => import('./components/Home'));
const LaunchItem = lazy(() => import('./components/launches/LaunchItem'));


function App() {
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedPastL, setLoadedPastL] = useState([]);

  const { token, login, logout, userId } = useAuth();

  useEffect(() => {
    const fetchPastLaunches = async () => {
      try {
        const pastLaunchesData = await sendRequest(
          'https://api.spacexdata.com/v5/launches/query',
          'POST',
          JSON.stringify(past),
          { 'Content-Type': 'application/json' }
          );
      setLoadedPastL(pastLaunchesData.docs);
      } catch (err) {
        console.log(err)
      }
    };

    fetchPastLaunches();
  }, [sendRequest]);

  let routes;

  if(token) {
    routes = (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/pastLaunches">
          <React.Fragment>
            {isLoading && (
              <div className="l">
                <LoadingSpinner />
              </div>
            )}
            {!isLoading && loadedPastL && <Launches loadedPastL={loadedPastL} />}
          </React.Fragment>
        </Route>
        <Route exact path="/pastLaunch/:lid/:userId">
          <LaunchItem />
        </Route>
        <Route exact path="/api/users">
          <Users />
        </Route>
        <Route exact path="/api/users/user/:userId">
          <UserItem allLaunches={loadedPastL}/>
        </Route>
        <Route exact path="/mywatchlist/:userId">
          <UserMyWatchlist allLaunches={loadedPastL}/>
        </Route>
          <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/pastLaunches">
          <React.Fragment>
            {isLoading && (
              <div className="l">
                <LoadingSpinner />
              </div>
            )}
            {!isLoading && loadedPastL && <Launches loadedPastL={loadedPastL} />}
          </React.Fragment>
        </Route>
        <Route exact path="/pastLaunch/:lid">
          <LaunchItem />
        </Route>
        <Route exact path="/api/users">
          <Users />
        </Route>
        <Route exact path="/api/users/user/:userId">
          <UserItem allLaunches={loadedPastL}/>
        </Route>
        <Route exact path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <NavBar />
        <main> 
          <Suspense fallback={<LoadingSpinner asOverlay />}>
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;