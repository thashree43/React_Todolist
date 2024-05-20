import React, { useState } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
React;
function Todo() {
  const [input, setinput] = useState("");
  const [Todos, setTodos] = useState([]);
  const[edittodo,seteditttodo] = useState(0)

  // just setting the text in the input field
  const handleInput = (event) => {
    setinput(event.target.value);
  };

  // To set a behaviour for form
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // to make the edit 
const onEdit =(id)=>{
  let edittodolist = Todos.find((to)=>to.id === id)
  setinput(edittodolist.list)
  seteditttodo(edittodolist)
  console.log(edittodolist)
}

  // Adding todos to an array
  const AddTodos = () => {
    if(input.trim()===''){
      alert('Todo cannot be empty')
      return;
    }
      if (edittodo) {
        let updatetodo = Todos.map((todo)=> todo.id === edittodo.id ? {...todo,list:input}:todo)
        setTodos(updatetodo)
        seteditttodo("")
      }else{
    setTodos([...Todos, {list:input , id:Date.now() , status:false}]);
    }
    setinput('')
  };
    
  

// to delete a todo  
const OnDelete =(id)=>{
 setTodos(Todos.filter((to)=>to.id!==id))
}

//  to make the status
const onComplete =(id)=>{
  let completes = Todos.map((todo)=>{
    if (todo.id === id) {
    return({...todo,status:!todo.status})
    }
    return todo
  })
  setTodos(completes)
}




  return (
    <div className="Main-Todo-Div">
      <h1>TODO LIST</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          placeholder="Enter Todo List"
          onChange={handleInput}
        />
        <button onClick={AddTodos}> {edittodo ? 'Update' :'ADD'}</button>
      </form>
      <div>
        <ul>
          {Todos.map((to, index) => (
            <li key={index} id={to.status ? 'list-items' :''}>
              {to.list}
              <span>
                <IoMdDoneAll className="list-reacticons" id="complete" title="Complete"  onClick={()=>onComplete(to.id)}/>
                <FiEdit className="list-reacticons" id="edit" title="Edit" onClick={() => onEdit(to.id)}/>
                <MdDelete className="list-reacticons" id="delete" title="Delete" onClick={() => OnDelete(to.id)}/>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
