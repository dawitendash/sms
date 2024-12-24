import React from 'react'
function GradeView() {
    return (
        <div className='main-container'>
            <div className='not-found'>
                No Grade is Released Yet!!
            </div>
            <div className="justify-content-center text-center border border-bottom border-black border-1">
                Grade report
            </div>
            <div className="grid d-inline-grid">
                <div>Year:</div>
                <div>Department:</div>
                <div>Student Name:</div>
                <div>Student Id:</div>
            </div>
            <table className="table table-bordered table-group-divider table-striped ">
                <tr className="">
                    <th scope="col">Course Title</th>
                    <th scope="col">Course Code</th>
                    <th scope="col">Credit</th>
                    <th scope="col">Grade Number</th>
                    <th scope="col">Grade Letter</th>
                    <th scope="col">Grade Point</th>
                </tr>
                <tbody>
                    <tr>
                        <td>dhdjkd</td>
                        <td>dhdjkd</td>
                        <td>dhdjkd</td>
                        <td>dhdjkd</td>
                        <td>dhdjkd</td>
                        <td>dhdjkd</td>
                    </tr>
                </tbody>
            </table>
            <div className="mx-5 justify-content-end text-end font-400">
                <div className="text-end justify-content-end mx-5 ">
                    Remark
                </div>
                <div>
                    First Class With Great Distinction
                </div>
                <div>
                    First Class With Distinction
                </div>
                <div>
                    First Class
                </div>
                <div>
                    Second Class
                </div>
                <div>
                    Lower Class
                </div>
                <div>
                    Lowest Class
                </div>
                <div>
                    Pass
                </div>
                <div>
                    Acadamic Warning
                </div>
                <div>
                    Forced WithDraw
                </div>
                <div>
                    Acadamic Dismisal
                </div>
                <div>
                    Complete Acadamic DisMisal
                </div>
            </div>



        </div>
    )
}

export default GradeView
