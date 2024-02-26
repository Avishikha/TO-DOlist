import "./styles.css";
import { useEffect, useState } from "react";
import { ITodo } from "./ITodoList";
interface ITableList {
  notifyParent: (e: ITodo, index: number) => void;
  toDolist: ITodo[];
  clickOnEdit: any;
  notifyUpdateList: (e: any) => void;
}
export default function TableList(props: ITableList) {
  const [toDolist, setTODoList] = useState<ITodo[]>(props.toDolist);
  useEffect(() => {
    setTODoList(props.toDolist);
  }, [props.toDolist]);
  const handelEdit = (data: ITodo, task: number) => {
    console.log(data, task);

    props.notifyParent(data, task);
  };
  const onDelete = (index: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this record?",
    );
    if (isConfirmed) {
      const updatedList = [...toDolist];
      updatedList.splice(index, 1);
      setTODoList(updatedList);
      props.notifyUpdateList(updatedList);
    }
  };
  const formatDate = (date: string) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  };

  return (
    <>
      <table id="table" className="table">
        <tbody>
          <tr className="tableHead">
            <th>Title</th>
            <th>Description</th>
            <th>Estimated Date</th>
          </tr>

          {toDolist.map((item: ITodo, index: number) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td className="description">{item.Description}</td>
              <td>{formatDate(item.estimatedDate)}</td>
              <td>
                <i
                  className="fa fa-pencil edit"
                  onClick={() => {
                    handelEdit(item, index);
                  }}
                ></i>
                {item.id !== props.clickOnEdit && (
                  <i
                    className="fa fa-trash close"
                    onClick={() => {
                      onDelete(index);
                    }}
                  ></i>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
