import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, status, onComplete, onDelete }) => {
  const filteredTasks = tasks.filter(task => task.status === status);
  
  return (
    <div>
      {filteredTasks.length === 0 ? (
        <p className="text-muted fst-italic">No tasks in this category</p>
      ) : (
        filteredTasks.map(task => (
          <TaskItem 
            key={task.id}
            task={task}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;