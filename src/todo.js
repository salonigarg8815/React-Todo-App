import React, { useEffect, useState } from 'react'
import './index.css';


// To get the data from local storage
const getLocalItems = () => {
    let list = localStorage.getItem('list');
    if (list) {
        return JSON.parse(localStorage.getItem('list'));
    } else {
        return [];
    }
}
const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setisEditItem] = useState(null)
    console.log(isEditItem)

    // Add Items
    const addItem = () => {
        if (!inputData) {
            alert("Please fill value")
        } else if (inputData && !toggleSubmit) {
            setItems(
                items.map((elem, ind) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            )

            setToggleSubmit(true)

            setInputData('')

            setisEditItem(null);
        }
        else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allInputData]);
            setInputData('')
        }
    }

    // Delete items
    const deleteItem = (index) => {
        // console.log(id)
        const updateditems = items.filter((elem) => {
            return index !== elem.id
        })
        setItems(updateditems)
    }

    // Edit-Item
    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id;
        })
        // console.log(newEditItem)

        setToggleSubmit(false)

        setInputData(newEditItem.name)

        setisEditItem(id);
    }

    // Remove All
    const removeAll = () => {
        setItems([]);
    }


    // add data to local storage
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(items))

    }, [items])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <h2> Add Your List Here 😉😊😍 </h2>

                    <div className="addItems">
                        <input type="text" placeholder='✍ Add Items...'
                            value={inputData} onChange={(e) => setInputData(e.target.value)} onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    // console.log(e.target.value)
                                    if (!inputData) {
                                        alert("Please add value")
                                    } else if (inputData && !toggleSubmit) {
                                        setItems(
                                            items.map((elem, ind) => {
                                                if (elem.id === isEditItem) {
                                                    return { ...elem, name: inputData }
                                                }
                                                return elem;
                                            })
                                        )

                                        setToggleSubmit(true)

                                        setInputData('')

                                        setisEditItem(null);
                                    }
                                    else {
                                        const allInputData = { id: new Date().getTime().toString(), name: inputData }
                                        setItems([...items, allInputData]);
                                        setInputData('')
                                    }
                                }
                            }} />
                        {
                            toggleSubmit ? <i className="fa fa-plus add-btn" title='Add Item' onClick={addItem}></i> :
                                <i className="fa fa-edit add-btn " title='update Item' onClick={addItem}></i>
                        }

                    </div>

                    <div className="showItems">
                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h4> {elem.name}</h4>
                                        <div className="btn-group">
                                            <i className="fa fa-edit edit-btn" title='edit Item' onClick={() => editItem(elem.id)}></i>
                                            <i className="far fa-trash-alt delete-btn" title='Delete Item'
                                                onClick={() => deleteItem(elem.id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }


                    </div>

                    <div className="clear-btn">
                        <button className='btn' onClick={removeAll}>Remove All</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;
