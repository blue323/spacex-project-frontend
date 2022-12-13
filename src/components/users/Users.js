import React, { useState, useEffect} from 'react';
import Pagination from '../../shared/pagination/pagination';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import UsersList from './UsersList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './Users.css'

export default function Users() {
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);
  const [isLoadingFromButton, setIsLoadingFromButton] = useState(false);

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

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const uData = users.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(users.length / recordsPerPage)

  const handleLoadingButton = () => {
    setIsLoadingFromButton(true);
    setTimeout(() => { setIsLoadingFromButton(false) }, 250)
  }

    return (
        <React.Fragment>
        {isLoading && (
          <div className="u">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && users && 
            <React.Fragment>
            {isLoadingFromButton && (<div className="u"> <LoadingSpinner /></div>)}
            {!isLoadingFromButton && 
                <UsersList users={uData} />}
                <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    handleLoadingButton={handleLoadingButton}
                    />
            </React.Fragment>}
        </React.Fragment>
    );
}