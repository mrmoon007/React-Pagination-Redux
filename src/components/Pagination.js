import React,{useState,useEffect} from 'react';
const Pagination = (props) => {

    const {showPerPage,paginationHandler,total}=props;

    const [counter,setCounter]=useState(1);
    useEffect(()=>{
        let value=counter*showPerPage;
        paginationHandler(value-showPerPage,value);
    },[counter]);

    const buttonHandler=(type)=>{
        if(type==='prev'){
            if(counter===1){
                setCounter(1)
            }else{
                setCounter(counter-1)
            }
        }else if(type==='next'){
            if(Math.ceil(total/showPerPage)===counter){
                setCounter(counter)
            }else{
                setCounter(counter+1)
            }
        }
    }
    console.log("counter",counter)

   

    return ( 
        <div className='d-flex justify-content-between'>
            <button className='btn btn-success ' onClick={()=>buttonHandler('prev')} >Previous</button>
            <button className='btn btn-success ' onClick={()=>buttonHandler('next')} >next</button>
        </div>
     );
}
 
export default Pagination;