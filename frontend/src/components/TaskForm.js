import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaPlus, FaCalendarAlt } from 'react-icons/fa';

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if deadline is in the past
    if (deadline < new Date()) {
      setError('Deadline cannot be in the past');
      return;
    }
    
    setError(''); // Clear any previous errors
    onSubmit({
      title,
      description,
      deadline: deadline.toISOString(),
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setDeadline(new Date());
  };
  
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title className="mb-4 d-flex align-items-center">
          <FaPlus className="me-2" />
          Add New Task
        </Card.Title>
        
        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="title">
            <Form.Label className="fw-bold">Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-4" controlId="description">
            <Form.Label className="fw-bold">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description (optional)"
            />
          </Form.Group>
          
          <Form.Group className="mb-4" controlId="deadline">
            <Form.Label className="fw-bold d-flex align-items-center">
              <FaCalendarAlt className="me-2" />
              Deadline
            </Form.Label>
            <div className="position-relative">
              <DatePicker
                selected={deadline}
                onChange={(date) => {
                  setDeadline(date);
                  setError(''); // Clear error when date changes
                }}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="form-control"
                minDate={new Date()}
                placeholderText="Select deadline"
              />
            </div>
          </Form.Group>
          
          <Button 
            variant="primary" 
            type="submit"
            className="w-100 py-2"
          >
            <FaPlus className="me-2" />
            Add Task
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TaskForm;