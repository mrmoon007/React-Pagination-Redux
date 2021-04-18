import React, { useState, useEffect } from "react";
const Pagination = (props) => {
  const { showPerPage, paginationHandler, total } = props;
  //const h=total / showPerPage;
  //let m=Math.ceil(h);
  //console.log('total',h)
  
  const [counter, setCounter] = useState(1);
  const [numberOfButton, setNumberOfButton] = useState(Math.ceil(total / showPerPage));
  console.log('numberOfButton',numberOfButton)
  //console.log('m',m)
  
  console.log('showPerPage',showPerPage)
  useEffect(() => {
    let value = counter * showPerPage;
    paginationHandler(value - showPerPage, value);
  }, [counter]);

  const buttonHandler = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (numberOfButton === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  console.log("counter", counter);

  return (
    <div className="d-flex justify-content-center">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link pointer"
              onClick={() => buttonHandler("prev")}
            >
              Previous
            </a>
          </li>

          {new Array(numberOfButton).fill("").map((item, index) => (
            <li className={`page-item ${index+1===counter?"active":null}`}>
              <a 
                className="page-link pointer"
                onClick={()=>setCounter(index+1)}
              
              >{index+1}</a>
            </li>
          ))}
          <li className="page-item">
            <a
              className="page-link pointer"
              onClick={() => buttonHandler("next")}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
