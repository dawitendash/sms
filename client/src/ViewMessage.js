import React from 'react'

function ViewMessage(props) {
    return (
        <div className='main-container'>
            <div className='not-found'>
                No Message Yet!!{props.title}
            </div>
        </div>
    )
}

export default ViewMessage
