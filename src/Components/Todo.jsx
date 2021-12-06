import React, {useEffect, useState} from 'react'
import "../App.css"


// get the data from local storage
const getLocalStorage = () => {
    const data = localStorage.getItem('items')
    console.log(data)
    if (data){
        return (JSON.parse(localStorage.getItem('items')));
    }
    else{
        return [];
    }
}

const Todo = () => {
    const [todo, setTodo] = useState('')
    const [items, setItem] = useState(getLocalStorage())
    const [toggleSubmit, setToggleSubmit] = useState(true)
    const [editData, setEditData] = useState(null)

    const changeItem = (e) => {
        e.preventDefault();
        setTodo(e.target.value)
    }

    const addItem = (e) => { 
        if (todo === ''){
            alert('please add a data')
        }
        else if(todo &&  !toggleSubmit){
            {
                setItem(items.map((item) => {
                    if (item.id === editData){
                        return {...item, value: todo}
                    }
                    else{
                        return item
                    }
                }))
                setToggleSubmit(true);

                setTodo('');

                setEditData(null);
            }

        }
        else{
            e.preventDefault();
            const allInputdata = { id: new Date().getTime().toString(), value: todo }
            setItem([...items, allInputdata])
            setTodo('')  
        }
        
     }

    const deleteItem = (index) => {
        const newItem = items.filter((item) => {
            return index !== item.id
        })
        setItem(newItem)
    }

    const updateItem = (index) => {
        const newItem = items.find((item) => {
            return item.id === index
        })
        console.log(newItem)
        setToggleSubmit(false)
        setTodo(newItem.value)
        setEditData(index)
    }
     
    const deleteAll = () => {
        setItem([])
    }

    // set the data from local storage
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items))
    }, [items])

     
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text" value={todo} onChange={changeItem} placeholder=" Add Items..." />
                        
                       {
                           toggleSubmit ? <i className="fa fa-plus add-btn" onClick={addItem} title="Add Item"></i> :
                            <i className="far fa-edit add-btn" onClick={addItem} title="Update Item"></i>
                        }
                       
                    </div>

                    <div className="showItems">
                        
                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3>{elem.value}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" onClick={() => updateItem(elem.id)} title="Edit Item"></i>
                                            <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(elem.id)} title="Delete Item"></i>
                                        </div>
                                  </div>
                                )
                            })

                        }
                       
                    </div>
                
                    {/* clear all button  */}
                    <div className="showItems">
                        <button className="btn effect04" onClick={deleteAll} data-sm-link-text="Remove All"><span> CHECK LIST </span> </button>
                    </div>
                </div>
          </div>  
        </>
    )
}

export default Todo

