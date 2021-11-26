import React, { useState } from 'react';
import './todoStyle.css';

// Getting data from Local storage 
// const getLocalData = () => {
//     const lists = localStorage.getItem('mytodo');

//     if (lists) {
//         return JSON.parse(lists);
//     }

// }

export const Todo = () => {
    const [state, setstate] = useState("")
    const [items, setItems] = useState([])
    const [isEditItem, setisEditItem] = useState('')
    const [toggleButton, settoggleButton] = useState(false)


    // Add Items 
    const addItem = () => {
        if (!state) {
            alert('Input list pls!')
        }
        else if(state && toggleButton){
            setItems(items.map((e)=>{
              if(e.id===isEditItem){
                  return {...e, name:state}
              }
              return e;
            }));

            setstate([])
            setisEditItem('')
            settoggleButton(false)
        }
        else {
            const myNewInputData = {
                id: new Date().toString(),
                name: state
            }
            setItems([...items, myNewInputData])
            setstate("")
        }
    }

    // edit items 
    const editItem = (i) => {

        const items_todo_edit = items.find((ele) => {
            return ele.id === i
        })
        setstate(items_todo_edit.name)
        setisEditItem(i)
        settoggleButton(true)
    }

    const deleteItem = (i) => {
        const updatedItem = items.filter((curElem) => {
            return curElem.id !== i;
        })
        setItems(updatedItem)
    }

    // Remove all items 
    const removeAll = () => {
        setItems([])
    }

    // Adding local storage 
    // useEffect(() => {
    //     localStorage.setItem("mytodo", JSON.stringify(items)) //locla storage e name and string must use korte hoi tai amader array er samne Json.stringify use kore json format kore pathaisi.
    // }, [items])
    return (
        
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="" />
                        <figcaption>Add your list here</figcaption>
                    </figure>

                    {/* Adding new Item  */}
                    <div className="addItems">
                        <input type="text"
                            placeholder="✍ Add your todo Items" className="form-control"
                            value={state}
                            onChange={(e) => { setstate(e.target.value) }}
                        />

                        {toggleButton ? (<i class="fas fa-edit add-btn "
                            onClick={addItem}></i>) : (
                            <i class="fa fa-plus-circle add-btn"
                                onClick={addItem}></i>
                        )}

                    </div>

                    {/* Show our items  */}
                    <div className="showItems">
                       

                        {items.map((e, index) => {
                            return (
                                <div key={index} className="eachItem">
                                    <h3>{e.name}</h3>
                                    <div className="todo-btn">
                                        <i class="fas fa-edit add-btn"
                                            onClick={() => editItem(e.id)}></i>
                                        <i class="far fa-trash-alt add-btn"
                                            onClick={() => deleteItem(e.id)}></i>
                                    </div>
                                </div>
                            )
                        })}
                    </div>


                    {/* Remove all Button  */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All"
                            onClick={removeAll}><span>CHECK LIST</span></button>
                    </div>
                </div>
            </div>

        </>
    )
}

