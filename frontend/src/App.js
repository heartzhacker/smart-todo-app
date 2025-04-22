import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Tab, Badge } from 'react-bootstrap';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import taskService from './api/taskService';
import { FaTasks, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('ongoing');
  const [isLoading, setIsLoading] = useState(true);
  
  const loadTasks = async () => {
    try {
      setIsLoading(true);
      // First update task statuses based on current time
      await taskService.updateStatuses();
      // Then fetch all tasks
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadTasks();
    
    // Set up interval to check task statuses every minute
    const interval = setInterval(() => {
      loadTasks();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleAddTask = async (newTask) => {
    try {
      await taskService.createTask(newTask);
      loadTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  
  const handleCompleteTask = async (taskId) => {
    try {
      await taskService.completeTask(taskId);
      loadTasks();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };
  
  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  const counts = {
    ongoing: tasks.filter(task => task.status === 'ongoing').length,
    success: tasks.filter(task => task.status === 'success').length,
    failure: tasks.filter(task => task.status === 'failure').length
  };
  
  const getTabIcon = (tab) => {
    switch (tab) {
      case 'ongoing':
        return <FaTasks className="me-2" />;
      case 'success':
        return <FaCheckCircle className="me-2" />;
      case 'failure':
        return <FaTimesCircle className="me-2" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="App">
      <Container className="py-5">
        <h1 className="text-center mb-5">
          <FaTasks className="me-3" />
          Smart Todo List
        </h1>
        
        <Row className="g-4">
          <Col lg={4}>
            <TaskForm onSubmit={handleAddTask} />
          </Col>
          
          <Col lg={8}>
            <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
              <Nav variant="tabs" className="mb-4">
                <Nav.Item>
                  <Nav.Link eventKey="ongoing" className="d-flex align-items-center">
                    {getTabIcon('ongoing')}
                    Ongoing
                    <Badge bg="primary" className="ms-2">
                      {counts.ongoing}
                    </Badge>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="success" className="d-flex align-items-center">
                    {getTabIcon('success')}
                    Success
                    <Badge bg="success" className="ms-2">
                      {counts.success}
                    </Badge>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="failure" className="d-flex align-items-center">
                    {getTabIcon('failure')}
                    Failure
                    <Badge bg="danger" className="ms-2">
                      {counts.failure}
                    </Badge>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              
              <Tab.Content>
                <Tab.Pane eventKey="ongoing">
                  <TaskList
                    tasks={tasks}
                    status="ongoing"
                    onComplete={handleCompleteTask}
                    onDelete={handleDeleteTask}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="success">
                  <TaskList
                    tasks={tasks}
                    status="success"
                    onComplete={handleCompleteTask}
                    onDelete={handleDeleteTask}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="failure">
                  <TaskList
                    tasks={tasks}
                    status="failure"
                    onComplete={handleCompleteTask}
                    onDelete={handleDeleteTask}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;