import React from 'react';
import './LaunchCard.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/auth-hook';

const LaunchCard = ({ id, name, date, patch, launchInfo }) => {
    const { token, userId } = useAuth();

    let fDate = date.split('T')[0];
    fDate = fDate.split('-');
    fDate = fDate[2] + '-' + fDate[1] + '-' + fDate[0]
    
    if(token) {
        return (
            <div className='launchCard'>
                <img src={patch} alt={name}/>
                <p>{name}</p>
                <p>{fDate}</p>
                <Link to={{
                    pathname: `/pastLaunch/${id}/${userId}`,
                    state: {...launchInfo, fDate}
                }}>
                    <button>
                        View details
                    </button>
                </Link>
            </div>
        )
    } else {
        return (
            <div className='launchCard'>
                <img src={patch} alt={name}/>
                <p>{name}</p>
                <p>{fDate}</p>
                <Link to={{
                    pathname: `/pastLaunch/${id}`,
                    state: {...launchInfo, fDate}
                }}>
                    <button>
                        View details
                    </button>
                </Link>
            </div>
        )
    }
}

export default LaunchCard;