import React from 'react'
import style from '../Styles/Changpassword.module.css'
function ChangePassword() {
    return (
        <div className='main-container' id={style.changePasswordContainer}>
            <h4 className={style.changepasswordheader}>Change password</h4>
            <div className={style.oldpassword}>
                <label htmlFor='Old password'>old Password</label>
                <input type='password' placeholder='old password'></input>
            </div>
            <div className={style.newPassword}>
                <label htmlFor='New pasword'>New Password</label>
                <input type='password' placeholder='New Password'>
                </input>
            </div>
            <div className={style.ConfirmPassword}>
                <label htmlFor='confirm Password'>Confirm Password</label>
                <input type='password' placeholder='confirm password'></input>
            </div>
            <div className='btn'>
                <button type='submit' className='btn btn-primary'>Submit</button>
            </div>
        </div>
    )
}

export default ChangePassword
