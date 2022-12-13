import React, { useContext } from 'react';
import './NavBar.css'
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import Button from '../../shared/FormElements/Button';

const NavBar = () => {
    const auth = useContext(AuthContext);

    let url = `/mywatchlist/${auth.userId}`

    return(
        <nav className='navbar'>
            <h1 className="nav-title">SpaceX</h1>
            <ul>
                <li>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/pastLaunches">Past Launches</NavLink>
                </li>
                <li>
                    <NavLink to="/api/users">Users</NavLink>
                </li>  
                {!auth.isLoggedIn && (
                    <li>
                        <NavLink to="/auth">Authenticate</NavLink>
                    </li>
                )}  
                {auth.isLoggedIn && (
                    <li>
                        <NavLink to={url}>My Watchlist</NavLink>
                    </li>
                )}  
                {auth.isLoggedIn && (
                    <li>
                        <Button onClick={auth.logout}>Logout</Button>
                    </li>
                )}
                </ul>
        </nav>
    )
}

export default NavBar
