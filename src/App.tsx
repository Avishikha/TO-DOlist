import "./styles.css";
import TableList from "./TableList";
import { todos } from "./list";
import { useEffect, useState } from "react";
import { ITodo } from "./ITodoList";

export default function App() {
 
  const [toDolist, setToDoList] = useState<ITodo[]>(todos);
  const [clickedOnEdit, setClickedOnEdit] = useState(null);
  const [isEdit,setIsEdit] =useState(false)
  const [defaultValue, setDefaultValue] = useState<{
    id:number,
    title: string;
    Description: string;
    estimatedDate: string;
  }>({
    id:0,
    title: "",
    Description: "",
    estimatedDate: "",
  });
  const  formatDate=(date:string)=> {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
  const newTask: ITodo = {
    id: Math.random(),
    title: defaultValue.title,
    Description: defaultValue.Description,
    estimatedDate: formatDate(defaultValue.estimatedDate),
  };
  const handleAdd = () => {
      setToDoList([...toDolist, newTask]);
    setDefaultValue({
      id: 0,
      title: '',
      Description: '',
      estimatedDate: '',
    });
  };
  useEffect(()=>{
    console.log(toDolist,"appp")
setToDoList(toDolist)
  },[toDolist])
 const handleUpdate=()=>{
  const existingTaskIndex = toDolist.findIndex((task) => task.id === clickedOnEdit);
    const updatedToDolist = [...toDolist];
   updatedToDolist[existingTaskIndex] = newTask;
    setToDoList(updatedToDolist);
    setIsEdit(false)
    setDefaultValue({
      id: 0,
      title: '',
      Description: '',
      estimatedDate: '',
    });
 }
 const handleCancel=()=>{
  setIsEdit(false)
  setDefaultValue({
    id: 0,
    title: '',
    Description: '',
    estimatedDate: '',
  });
 }
  const onEdit = (e:any) => {
    setIsEdit(true)
    setClickedOnEdit(e.id)
    setDefaultValue({...e});
  };
  const handleInputChange = (e: string,tag:string) => {
    switch(tag){
      case "title":
     defaultValue.title=e
      
      break
      case "description":
        defaultValue.Description=e
         
         break
         case "estimation":
          defaultValue.estimatedDate=e
           
           break
    }
    setDefaultValue({ ...defaultValue});
  }
const updateList=(e:any)=>{
 setToDoList(e)
}
console.log(defaultValue,"defaultValue.estimatedDate")
  return (
    <>
      <div className="inputbox">
        <h1 className="App">TO DO list</h1>
        <p>Title</p>
        <input
          type="textBox"
          value={defaultValue.title}
          onChange={(e) => handleInputChange(e.target.value,"title")}
        ></input>
        <p>Description</p>
        <textarea
          className="textArea"
          value={defaultValue.Description}
          placeholder="Start here..."
          onChange={(e) => handleInputChange(e.target.value,"description")}
        ></textarea>
        <p>Estimated Date</p>
        <input
          type="Date"
          value={formatDate(defaultValue.estimatedDate)}
          onChange={(e) => handleInputChange(formatDate(e.target.value),"estimation")}
        ></input>
        {!isEdit && <button onClick={() => handleAdd()}>Add</button>}
       {isEdit && <button onClick={() => handleUpdate()}>Update</button>}
       {isEdit && <button onClick={() => handleCancel()}>Cancel</button>}
      </div>
      <TableList
      notifyUpdateList={(e)=>{  console.log(e);
        updateList(e)
      }}
      clickOnEdit={clickedOnEdit}
        toDolist={toDolist}
        notifyParent={(e) => {
          console.log(e);
          onEdit(e);
        }}
      ></TableList>
    </>
  );
}
