import React, { useEffect, useState } from "react";

const Form = (props) => {
  const [formDetails, setFormDetails] = useState(props.initialTask);
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };
  const handleAddTask = () => {
    props.addTask(formDetails);
  };
  useEffect(() => {
    setFormDetails(props.initialTask);
  }, [props.initialTask]);
  return (
    <>
      <div>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formDetails?.name}
            onChange={handleChanges}
          />
        </div>
        <div>
          <label>Task</label>
          <input
            type="text"
            name="task"
            placeholder="Task"
            value={formDetails?.task}
            onChange={handleChanges}
          />
        </div>
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </>
  );
};

export default Form;
