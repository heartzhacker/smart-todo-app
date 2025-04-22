import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import moment from 'moment';
import { FaTrash, FaCheck, FaClock, FaExclamationTriangle } from 'react-icons/fa';

const getStatusVariant = (status) => {
  switch (status) {
    case 'success':
      return 'success';
    case 'failure':
      return 'danger';
    default:
      return 'warning';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'success':
      return <FaCheck className="me-1" />;
    case 'failure':
      return <FaExclamationTriangle className="me-1" />;
    default:
      return <FaClock className="me-1" />;
  }
};

const TaskItem = ({ task, onComplete, onDelete }) => {
  const isDeadlinePassed = moment(task.deadline).isBefore(moment());
  const deadlineFormatted = moment(task.deadline).format('MMM D, YYYY h:mm A');
  const timeRemaining = moment(task.deadline).fromNow();
  
  return (
    <Card className="task-item">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div className="d-flex align-items-center mb-2">
              <Card.Title className="mb-0 me-2">{task.title}</Card.Title>
              <Badge bg={getStatusVariant(task.status)} className="d-flex align-items-center">
                {getStatusIcon(task.status)}
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </Badge>
            </div>
            
            {task.description && (
              <Card.Text className="text-muted">{task.description}</Card.Text>
            )}
            
            <div className="mt-3">
              <div className="d-flex align-items-center text-muted mb-1">
                <FaClock className="me-2" />
                <span>Deadline: {deadlineFormatted}</span>
              </div>
              
              {task.status === 'ongoing' && (
                <div className={isDeadlinePassed ? 'text-danger' : 'text-warning'}>
                  <small>
                    {isDeadlinePassed ? 'Overdue' : `Due ${timeRemaining}`}
                  </small>
                </div>
              )}
            </div>
          </div>
          
          <div className="d-flex">
            {task.status === 'ongoing' && (
              <Button 
                variant="outline-success" 
                size="sm"
                className="me-2"
                onClick={() => onComplete(task.id)}
                title="Mark as complete"
              >
                <FaCheck />
              </Button>
            )}
            <Button 
              variant="outline-danger" 
              size="sm"
              onClick={() => onDelete(task.id)}
              title="Delete task"
            >
              <FaTrash />
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskItem;