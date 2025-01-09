import React, { useEffect, useState } from "react";
import { BsTrash } from 'react-icons/bs';
import { FaPen, FaSort } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UpdateCollegeDetail from '../Modals/updateCollegeDetail';
import style from '../Styles/display_student_iformation.module.css';

function DisplayTeacher() {
    const navigate = useNavigate();
    const user = localStorage.getItem('username');
    const role = localStorage.getItem('Role');
    const [data, setData] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [showMore, setShowMore] = useState(false);
    const [sortItem, setSortItem] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/demo_war_exploded/collgeRegistraion')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error(err));
    }, []);

    const openModal = (d) => {
        setModalData(d);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const limitDisplay = showMore ? data : data.slice(0, 5);

    const searchCollege = limitDisplay.filter(item =>
        item.college_name.toLowerCase().includes(searchItem.toLowerCase()) ||
        item.college_id.toLowerCase().includes(searchItem.toLowerCase())
    );

    const sortByName = () => {
        const sorted = [...data].sort((a, b) => a.college_name.localeCompare(b.college_name));
        setData(sorted);
    };

    if (!user || role !== 'admin') {
        navigate('/');
        return null;
    }

    return (
        <>
            <div className="main-container">
                <h3 className={style.page_header}>Teachers List</h3>
                <p className={style.search}>
                    <input
                        type="search"
                        placeholder="Search here"
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                    />
                </p>
                <hr />
                <div>
                    <FaSort
                        className="text-black text-xxl"
                        onClick={() => setSortItem((prev) => !prev)}
                    />
                    {sortItem && (
                        <div className={style.sortdropdown}>
                            <button className="btn btn-primary" onClick={sortByName}>
                                Sort by Name
                            </button>
                        </div>
                    )}
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered table-group-divider table-striped">
                        <thead>
                            <tr className={style.header}>
                                <th scope="col">College ID</th>
                                <th scope="col">College Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody className={style.body}>
                            {searchCollege.length === 0 ? (
                                <tr>
                                    <td colSpan="3">No records found matching your search.</td>
                                </tr>
                            ) : (
                                searchCollege.map((d) => (
                                    <tr key={d.college_id}>
                                        <td>{d.college_id}</td>
                                        <td>{d.college_name}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => openModal(d)}
                                            >
                                                <FaPen className={style.icon} />
                                            </button>
                                            <button type="button" className="btn btn-danger">
                                                <BsTrash className={style.icon} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <button className="btn bg-info" onClick={() => setShowMore(!showMore)}>
                    {showMore ? 'Show Less' : 'Show More'}
                </button>
            </div>
            {modalIsOpen && (
                <UpdateCollegeDetail
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    ModalData={modalData}
                />
            )}
        </>
    );
}

export default DisplayTeacher;
