import React from 'react';
import SideBar from './SideBar';
import TaskList from './TaskList';

const Content = () => {
  return (
    <div className='main-content'>
        <SideBar />
        <TaskList />
    </div>
  )
}

export default Content