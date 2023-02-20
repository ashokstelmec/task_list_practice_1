import React from "react";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="content">
        <div className="search-tasks">
          <input
            type="text"
            className="search"
            name="search"
            placeholder="Search Tasks"
          />
        </div>
        <div className="task-priority">
          <span>
            <i className="fa-regular fa-calendar-check"></i> Task Priority
          </span>
        </div>
        <div className="filter-button">
          <button className="btn-1">All</button>
          <button>High</button>
          <button>Medium</button>
          <button>Low</button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
