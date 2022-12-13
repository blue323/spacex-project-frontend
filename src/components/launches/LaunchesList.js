import React from 'react';
import LaunchCard from './LaunchCard';
import './LaunchesList.css';

const LaunchesList = ({ launches }) => {
    if(!launches) {
        return (
            <h2 className='l'>Something went wrong</h2>
        )
    }

    const launchData = launches.map(launch => 
        <LaunchCard 
            key={launch.id}
            id={launch.id}
            name={launch.name} 
            date={launch.date_utc} 
            patch={launch.links.patch.small}
            launchInfo={launch}
        />)

    return (
        <React.Fragment>
            <div className='launchesList'>
                <div className='launchesListCards'>
                    {launchData}
                </div>
            </div>
        </React.Fragment>
    )
}

export default LaunchesList;
