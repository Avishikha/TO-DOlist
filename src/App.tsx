import "./styles.css";
import TableList from "./TableList";
import list from "./list.json";
import { useEffect, useState } from "react";
import { ITodo,IDate } from "./ITodoList";
export default function App() {
  let [toDolist, setToDoList] = useState<ITodo[]>(list.todos);
  const [editBox, setEditBox] = useState<{ index: number; data: ITodo } | null>(
    null,
  );
  const [defaultValue, setDefaultValue] = useState<{
    title: string;
    Description: string;
    estimatedDate: string;
  }>({
    title: "",
    Description: "",
    estimatedDate: "",
  });

  const [nextId, setNextId] = useState(0);
  useEffect(() => {
    setToDoList(list);
  }, [list]);
  const handleAdd = () => {
    const newTask: ITodo = {
      title: defaultValue.title,
      Description: defaultValue.Description,
      estimatedDate: defaultValue.estimatedDate,
    };
  toDolist.push([...newTask])
    // Update the to-do list with the new task
    setToDoList(toDolist);
    // Clear the input fields or set them to default values
    setDefaultValue(newTask);
  };

  const onEdit = (e: ITodo, listIndex: number) => {
    console.log("Data from child:", e);
    setEditBox({ index: listIndex, data: e });
    setDefaultValue(e);
  };
  const handleInputChange = (e: any) => {
    console.log(e, "avi");
    setDefaultValue(e);
  };
const formatDate=(format:any)=>{
  const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

return format = dd + '-' + mm + '-' + yyyy;
}
console.log(toDolist,"defaultValue.estimatedDate")
  return (
    <>
      <div>
        <h1 className="App">TO DO list</h1>
        <p>Title</p>
        <input
          type="text"
          value={defaultValue.title}
          onChange={(e: any) => handleInputChange(e.target.value)}
        ></input>
        <p>Description</p>
        <input
          type="textArea"
          value={defaultValue.Description}
          onChange={(e: any) => handleInputChange(e.target.value)}
        ></input>
        <p>Estimated Date</p>
        <input
          type="Date"
          value={defaultValue.estimatedDate}
          onChange={(e: any) => handleInputChange(e.target.value)}
        ></input>
        <button onClick={(e: any) => handleAdd()}>Add</button>
      </div>
      <TableList
        toDolist={toDolist}
        notifyParent={(e: any) => {
          console.log(e);
          onEdit(e, nextId);
        }}
      ></TableList>
    </>
  );
}
