import React, { useState, useEffect } from "react";
import { AUTH_TOKEN } from "../utils";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import Dialog from "./Dialog";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  
  const getTasksLists = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          AuthToken: AUTH_TOKEN,
        },
        redirect: "follow",
      };

      const response = await fetch(
        "https://devza.com/tests/tasks/list",
        requestOptions
      );
      const data = await response.json();
      console.log("Dataa", data?.tasks);
      setTasks(data?.tasks);
    } catch (error) {
      console.log("Error is ", error);
    }
  };

  useEffect(() => {
    getTasksLists();
  }, []);

  const getUserList = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          AuthToken: AUTH_TOKEN,
        },
        redirect: "follow",
      };

      const response = await fetch(
        "https://devza.com/tests/tasks/listusers",
        requestOptions
      );
      const data = await response.json();
      setUsers(data?.users);
    } catch (error) {
      console.log("Error is ", error);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  const handleChange = (e) => {
    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Creating a task/list
  const addNewTask = async () => {
    try {
      const formdata = new FormData();
      formdata.append("message", task.message);
      formdata.append("due_date", task.dueDate);
      formdata.append("priority", task.priority);
      formdata.append("assigned_to", task.assignedTo);

      const requestOptions = {
        method: "POST",
        headers: {
          AuthToken: AUTH_TOKEN,
        },
        body: formdata,
        redirect: "follow",
      };

      await fetch("https://devza.com/tests/tasks/create", requestOptions);
      getTasksLists();
    } catch (error) {
      console.log("Error is ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewTask();
    updateTask();
    setOpen(false);
  };

  // Update API
  const updateTask = async () => {
    console.log("Update task");

    try {
      const formdata = new FormData();
      formdata.append("message", tasks.message);
      formdata.append("due_date", tasks.dueDate);
      formdata.append("priority", tasks.priority);
      formdata.append("assigned_to", tasks.assignedTo);
      formdata.append("taskid", task.id);

      const requestOptions = {
        method: "POST",
        headers: {
          AuthToken: AUTH_TOKEN,
        },
        body: formdata,
        redirect: "follow",
      };

      await fetch("https://devza.com/tests/tasks/update", requestOptions);

      getTasksLists();
    } catch (error) {
      console.log("Error is ", error);
    }
  };

  return (
    <div>
      <div className="list-of-tasks">
        <div>List of Tasks</div>
        <div>
          <select>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
          <button className="task-btn" onClick={onOpenModal}>
            <i className="fa fa-plus"></i> Add Task
          </button>
        </div>
      </div>
      {tasks?.map((el, i) => {
        return (
          <table key={i}>
            <tbody>
              <tr className="table-row">
                <td className="message-data">{el.message}</td>
                <td className="message-name table-data">{el.assigned_name}</td>
                <td className="table-data priority">{el.priority}</td>
                <td className="creating-date table-data">{el.created_on}</td>
                <td className="edit-icon table-data">
                  <FiEdit onClick={onOpenModal} />
                </td>
                <td className="delete-icon table-data">
                  <MdOutlineDelete />
                </td>
              </tr>
            </tbody>
          </table>
        );
      })}
      <Dialog
        open={open}
        onCloseModal={onCloseModal}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        task={tasks}
        users={users}
      />
    </div>
  );
};

export default TaskList;
