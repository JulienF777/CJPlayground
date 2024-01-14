import { useState } from 'react'

export function NewTodoForm(props) {
    props.onSubmit
    const [newItem, setNewItem] = useState("")

    //function to add the item when button "add" is pressed
    function handleSubmit(e) {
        e.preventDefault()
        if (newItem === "") return

        //call from app.jsx
        props.onSubmit(newItem)

        //clear the input text area after submitting
        setNewItem("")
    }

    return (
        <>
            {/* We use onSubmit to make the logic of adding new items to the list */}
            <form onSubmit={handleSubmit} className="new-item-form">
                <div className="form-row">
                    <label>Ajouter article</label>
                    {/* the value of the input is stored in newItem, onChange is an eventlistener*/}
                    <input value={newItem} onChange={e => setNewItem(e.target.value)} type="text" id="item" />
                </div>
                <button className="btn">Ajouter</button>
            </form>
        </>
    )
}