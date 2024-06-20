import "./App.css";
import Form from "./Components/Form";
import { useState } from "react";
import { v4 as uuid } from "uuid";
function App() {
  const TaskList = [
    { id: 1, name: "Ravikumar", task: "React App", completed: false },
    { id: 2, name: "Satish", task: "Django App", completed: false },
    { id: 3, name: "Rafi", task: "Angular App", completed: false },
    { id: 4, name: "Das", task: "Node App", completed: false },
  ];
  const [initialTask, setIntialTask] = useState({
    name: "",
    task: "",
    completed: false,
  });
  const [checked, setChecked] = useState(false);
  const [edit, setEdit] = useState(false);
  const [initialTaskList, setInitialTaskList] = useState(TaskList);
  const addTask = (data) => {
    const { name, task, completed, id } = data;
    if (!edit) {
      const newTask = {
        id: uuid(),
        name: name,
        task: task,
        completed: completed,
      };
      setInitialTaskList((prev) => [...prev, newTask]);
      setIntialTask({ name: "", task: "", completed: false });
      setEdit(!edit);
    } else {
      setInitialTaskList((prev) =>
        prev.map((task) => (task.id === id ? data : task))
      );
      setIntialTask({ name: "", task: "", completed: false });
      setEdit(!edit);
    }
  };
  const handleDelete = (id) => {
    const filteredTasks = initialTaskList.filter((each) => each.id !== id);
    setInitialTaskList(filteredTasks);
  };

  const handleEdit = (data) => {
    setEdit(true);
    setIntialTask(data);
  };
  const handleCheck = (id) => {
    const checkStatus = initialTaskList.filter((each) => each.id === id);
    setInitialTaskList((prev) =>
      prev.map((each) =>
        each.id === id
          ? { ...each, completed: !checkStatus[0].completed }
          : each
      )
    );
  };

  return (
    <div className="App">
      <Form initialTask={initialTask} addTask={addTask} />
      <div>
        <div>
          {initialTaskList.map((each) => {
            return (
              <>
                <div key={each.id} className="container">
                  <div className="child">
                    <div>{each.name}</div>
                    <div className="checkCont">
                      <input
                        type="checkbox"
                        onChange={() => handleCheck(each.id)}
                      />
                      <div className={each.completed && "checked"}>
                        {" "}
                        {each.task}
                      </div>
                    </div>
                    <div className="edit" onClick={() => handleEdit(each)}>
                      Edit
                    </div>
                    <div className="edit" onClick={() => handleDelete(each.id)}>
                      Delete
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
