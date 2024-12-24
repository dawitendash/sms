import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import style from '../Styles//Error.module.css';
function ErrorPage() {
    const Navigate = useNavigate();
    return (
        <div className={style.page}>
            <FaExclamationTriangle className={style.errorIcon} />
            <p>
                Data Fetching Error please try again later !!!
            </p>
            <button className='btn btn-primary' onClick={() => {

                Navigate('/');
                window.location.reload()
            }

            }> Refresh </button>
        </div>
    )
}

export default ErrorPage
