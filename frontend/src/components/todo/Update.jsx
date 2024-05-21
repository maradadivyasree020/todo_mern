import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Update = ({display,update}) => {

  // console.log(update.title)
  useEffect(() => {
      setInputs({title:update.title,body:update.body})
  }, [update])
  
  const [Inputs, setInputs] = useState({title:"",body:""})

  const change =(e)=>{
    const {name,value}=e.target;
    setInputs({...Inputs,[name]:value})
    console.log(update.title,update.body)
  }
  
  const submit=async()=>{
    try{
    console.log(Inputs)
    console.log(update.title)
    await axios.put(`http://localhost:5000/api/v2/updateTask/${update._id}`,Inputs)
    .then((response)=>{
      console.log(response)
      toast.success("Your task is Updated")
    })
  }
  catch(err){
    toast.error("Error Occuered")
  }
    // console.log(Inputs)
    // display("none")
  }

  return (
    <div className='p-5 d-flex justify-content-center align-items-start flex-column update'>
      
      <ToastContainer />
        <h1>Update your task</h1>
        <input type='text' className='todo-inputs my-4 w-100 p-3' name='title'  value={Inputs.title} onChange={change}/>
        <textarea className='todo-inputs w-100 p-3' name='body' value={Inputs.body} onChange={change}/>
        <div>
            <button className='btn btn-dark my-4' onClick={submit}>UPDATE</button>
            <button className='btn btn-danger my-4 mx-3' onClick={()=>display('none')}>CLOSE</button>
        </div>
    </div>
  )
}

export default Update