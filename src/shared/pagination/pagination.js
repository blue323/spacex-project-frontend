import React from 'react'
import './pagination.css'

const Pagination = ({ nPages, currentPage, setCurrentPage, handleLoadingButton }) => {
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    const nextPage = () => {
        if(currentPage !== nPages) setCurrentPage(currentPage + 1)
        handleLoadingButton()
    }
    const prevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
        handleLoadingButton()
    }
    return (
        <nav className='pagination'>
            <ul>
                <li>
                    <a  className='prev'
                        onClick={prevPage} 
                        href='#'>
                        Previous
                    </a>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber}>
                        <a onClick={() => {
                                setCurrentPage(pgNumber)
                                handleLoadingButton()
                                }}  
                            href='#'>
                            
                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li>
                    <a  className='next'
                        onClick={nextPage}
                        href='#'>
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination