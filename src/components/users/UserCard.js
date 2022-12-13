import React from 'react';
import './UserCard.css'
import { Link } from 'react-router-dom';

    
const UserCard = ({ user }) => {
    return (
        <div className='userCard'>
            <h3>Name: {user.name}</h3>
            <p>watchlist: {user.launches.length} {user.launches.length === 1 ? 'launch': 'launches'}</p>
            <Link to={{
                pathname: `/api/users/user/${user.id}`,
                state: {...user}
            }}>
                <button >
                    View details
                </button>
            </Link>
        </div>
    )
}

export default UserCard;