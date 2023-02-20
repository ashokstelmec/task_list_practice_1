import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useState } from "react";

const Dialog = ({ open, onCloseModal, handleSubmit, users }) => {
  const [task, setTask] = useState({
    message: "",
    assignedTo: "",
    priority: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onCloseModal}
        classNames={{
          modal: "customModal",
        }}
        center
      >
        <p className="create-task">Create/Edit Task</p>
        <form>
          <input
            type="text"
            name="message"
            placeholder="Enter Your Message"
            className="enter-your-message"
            onChange={handleChange}
            value={task?.message}
          />
          <div className="dropdown">
            <div className="dropdown-1">
              <label>Assign To</label>
              <select
                name="assignedTo"
                value={task?.assignedTo}
                onChange={handleChange}
              >
                <option value="">Choose User</option>

                {users?.map((user) => (
                  <option value={user?.id} key={user?.id}>
                    {user?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown-1">
              <label>Priority</label>
              <select
                name="priority"
                value={task?.priority}
                onChange={handleChange}
              >
                <option value="">Choose Priority</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </select>
            </div>
          </div>
          <div className="date-group">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={task?.dueDate}
              onChange={handleChange}
            />
          </div>
          <button className="add-task-btn" onClick={(e) => handleSubmit(e, task)}>
            Add Task
          </button>
        </form>
      </Modal>
    </div>
  );
};
export default Dialog;
