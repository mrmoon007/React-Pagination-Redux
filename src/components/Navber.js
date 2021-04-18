import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Table,
} from "react-bootstrap";
import Pagination from "./Pagination";


const Navbaer = () => {
  const [IsCreateMode, setIsCreateMode] = useState(false);
  const [title, setTitle] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [priority, setPriority] = useState(" ");
  const [list, setList] = useState([]);
  const [status, setStatus] = useState(false);
  const [id, setId] = useState(" ");

  console.log.apply(title);
  console.log.apply(description);
  console.log.apply(priority);

  const[showPerPage,setShowaPerPage]=useState(10);
  const[pagination,setPagination]=useState({
    start: 0,
    end:showPerPage,
  });

  useEffect(() => {
    initialize();
  },[showPerPage]);

  const initialize = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        console.log(res.data);
        const tasks=res.data;
        setList(tasks);
      })
      .catch((err) => console.log(err));
  };

  const createTask = (e) => {
    e.preventDefault();
    const task = {
      
      title: title,
      body: description,
    };

    axios
      .post("https://jsonplaceholder.typicode.com/posts",task)
      .then((res) => {
        console.log('post data',res.data);
        //const tasks=res.data;
        //setList(tasks);
      })
      .catch((err) => console.log(err));

    //const taskData = list;
    // taskData.push(task);
    // setList(taskData);
    setTitle(" ");
    setDescription(" ");
    setPriority(" ");
    //console.log(list);
  };

  const editHandler = (id, data) => {
    setTitle(data.title);
    setDescription(data.description);
    setPriority(data.priority);
    setStatus(true);
    setId(id);
  };

  const updateTask = (e) => {
    e.preventDefault();
    const cloneList = [...list];
    for (let index = 0; index < list.length; index++) {
      const element = cloneList[index];
      if (index === id) {
        element.title = title;
        element.description = description;
        element.priority = priority;
      }
    }
    setList(cloneList);
    setStatus(false);
    setTitle(" ");
    setDescription(" ");
    setPriority(" ");
  };

  const deleteHandler = (id) => {
    let cloneList = [...list];
    cloneList.splice(id, 1);
    setList(cloneList);
  };

  const viewHandler = (data) => {
    setTitle(data.title);
    setDescription(data.description);
    setPriority(data.priority);
    !IsCreateMode ? setIsCreateMode(true) : setIsCreateMode(false);
  };

  // Pagination code

  const paginationHandler=(start,end)=>{
    setPagination({
      start:start,
      end:end,
    })
  }
  

  return (
    <div>
      <Container>
        <Navbar bg="light" expand="lg" className="mt-4 pb-4">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>

        <Container className="mt-4 mb-4 ">
          <div className="d-flex justify-content-start">My Tasks</div>
          <div className="d-flex justify-content-end">
            <i
              className="btn btn-success fa fa-plus-circle"
              onClick={() =>
                IsCreateMode ? setIsCreateMode(false) : setIsCreateMode(true)
              }
            ></i>
          </div>
        </Container>
        {IsCreateMode === true && (
          <Container>
            <Form onSubmit={(e) => (status ? updateTask(e) : createTask(e))}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Enter Title"
                  value={title}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  placeholder="Enter Description"
                  value={description}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Priority select</Form.Label>
                <Form.Control
                  onChange={(e) => setPriority(e.target.value)}
                  value={priority}
                  as="select"
                  custom
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Form.Control>
              </Form.Group>

              {!status ? (
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              ) : (
                <Button variant="primary" type="submit">
                  update
                </Button>
              )}
            </Form>
          </Container>
        )}

        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Task Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.slice(pagination.start,pagination.end).map((data, id) => (
              <tr key={id}>
                <td>{data.id}</td>
                <td>{data.title}</td>
                <td>{}</td>
                <td>{data.priority}</td>
                <td>
                  <i
                    className="text-success fa fa-pencil pointer"
                    title="Edit Task"
                    onClick={() => editHandler(id, data)}
                  ></i>
                  <i
                    className="fa fa-trash text-danger ml-3 pointer"
                    title="Delete Task"
                    onClick={() => deleteHandler(id)}
                  ></i>

                  <i
                    className="fa fa-eye text-primary ml-3 pointer"
                    title="View Task"
                    onClick={() => viewHandler(data)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
          
        </Table>
        <div className='mt-4 mb-4 pb-4'>
        <Pagination 
          showPerPage={showPerPage}  
          paginationHandler={paginationHandler}
          total={list.length}
          />
        </div>
      </Container>
      
    </div>
  );
};

export default Navbaer;
