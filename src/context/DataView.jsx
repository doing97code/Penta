import React, { useState, useEffect } from 'react';
import { MdModeEdit } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

function DataView() {
    const [listitemvalue, setlistitemvalue] = useState('');
    const [localStorageData, setLocalStorageData] = useState([]);
    const [mycolor, setmycolor] = useState('');
    const [isEditButton, setisEditButton] = useState(true);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("myData")) || [];
        setLocalStorageData(storedData);
        localStorage.setItem("double_loggedIn", true);
    }, []);

    function setLocalStorage(listitemvalue) {
        if (!listitemvalue) {
            toast.error("Please enter your data before saving." ,  { autoClose: 1500  });
            return;
        }

        const newdata = JSON.parse(localStorage.getItem("myData")) || [];
        const updatedData = [...newdata, listitemvalue];
        localStorage.setItem('myData', JSON.stringify(updatedData));

        setLocalStorageData(updatedData);
        setlistitemvalue('');
        toast.info("Item successfully added." , { autoClose: 1500 ,   style: {  color: "green" } });
    }

    function deleteData(index) {
        const updatedData = localStorageData.filter((_, i) => i !== index);
        localStorage.setItem("myData", JSON.stringify(updatedData));
        setLocalStorageData(updatedData);
        toast.info("Item successfully deleted." ,{ autoClose: 500 ,   style: {  color: "red" } });
    }

    function change_color() {
        const num = '#' + Math.floor(Math.random() * 16777215).toString(16);
        setmycolor(num);
    }

    function edit_localStrgData(index) {
        if (isEditButton) {
            setisEditButton(false);
            setlistitemvalue(localStorageData[index]);
            setEditIndex(index);
            toast.info("You are now editing an item." , { autoClose: 1000 ,   style: {  color: "green" } });

            const mY_item = document.querySelectorAll('#allitem');
            mY_item.forEach((item, indx) => {
                if (indx === index) {
                    item.style.backgroundColor = '#ffeb3b';
                }
            });
        }
    }

    function update_data(index) {
        if (!listitemvalue) {
            toast.error("Please enter the required updates to continue.");
            return;
        }

        const new_arr = [...localStorageData];
        new_arr.splice(index, 1, listitemvalue);
        localStorage.setItem('myData', JSON.stringify(new_arr));
        setLocalStorageData([]);
        setTimeout(() => setLocalStorageData(new_arr), 0);

        setisEditButton(true);
        setlistitemvalue('');
        toast.info("Item successfully updated." , { autoClose: 1500 });
    }

    const navigate = useNavigate();

    function logout() {
        sessionStorage.setItem('isLoggedIn', 'false');
        navigate('/');
    }

    function special_person() {
        const specialGuest = import.meta.env.VITE_SPECIAL_GUEST;
        const specialGuest2 = import.meta.env.VITE_SPECIAL_GUEST2;

        const store_data = localStorage.getItem('name');
        if (store_data === specialGuest || store_data === specialGuest2) {
            navigate('/special');
        } else {
            toast.info("Access restricted. You are not a special guest.");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-tr from-[#1836dd] via-[#fa4cfd] to-[#ee9e9e] p-6 flex flex-col items-center sm:scale-[1.35] lg:scale-[1] ">
            <ToastContainer />

            <h1 className="text-2xl font-semibold text-white mb-3 text-center">Step Into Your Story, <span></span>
                <button className='underline text-black' onClick={() => special_person()}>{localStorage.getItem('name')}</button>
            </h1>

            <div className='mb-3'>
                <button type="button" onClick={() => change_color()} className='px-4 text-white bg-indigo-600 m-2 rounded-md py-1  text-pretty  '>Change color</button>
                <button type="button" className='px-4 m-2 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-pretty font-medium' onClick={() => logout()}>Log out</button>
            </div>

            <textarea
                value={listitemvalue}
                onChange={(e) => setlistitemvalue(e.target.value)}
                placeholder="Enter item :"
                className="mb-4 px-2 py-2 text-xl border border-gray-300 rounded-md w-full max-w-md text-black sm:w-11/12 md:w-1/2 border-spacing-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                style={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',
                    resize: 'none',
                }}
                rows={2}
            />

            {isEditButton ? (
                <button
                    onClick={() => setLocalStorage(listitemvalue)}
                    className="mb-4 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                    Save
                </button>
            ) : (
                <button
                    onClick={() => update_data(editIndex)}
                    className="mb-4 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                    Update
                </button>
            )}

            <ol className="w-full max-w-md sm:max-w-lg md:max-w-2xl space-y-2" id='allitem_id'>
                {localStorageData.map((item, index) => (
                    <li
                        key={index}
                        id="allitem"
                        className="flex justify-between items-center p-1 bg-gray-300 text-gray-800 font-semibold font-serif border border-gray-300 rounded-lg  hover:shadow-md transition-shadow">

                        <span id='item' className="break-words text-black max-w-[290px] text-sm px-1" style={{ color: mycolor }}>{item}</span>
                        <div>
                            <button
                                onClick={() => deleteData(index)}
                                className="text-white px-4 py-1 bg-red-600 tracking-wider rounded-md hover:text-black hover:bg-red-700 text-md font-semibold"
                            >
                                <AiTwotoneDelete className='text-xl' />
                            </button>
                            <button
                                className="text-white px-2 ml-2 py-1 bg-indigo-600 tracking-wider rounded-md hover:text-black hover:bg-indigo-800 transition font-medium"
                                onClick={() => edit_localStrgData(index)}
                            >
                                <MdModeEdit className='text-xl' />
                            </button>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default DataView;
