import React from 'react'
import './Todo.css'
import TodoCards from './TodoCards'
import { useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
// import { useDispatch } from 'react-redux';
// import { authActions } from '../../store';
import axios from 'axios';

let id=sessionStorage.getItem("id")
let toUpdateArray=[]

const Todo = () => {

const [Inputs, setInputs] = useState({title:"",body:""})
const [Array, setArray] = useState([])

const show = ()=>{
    document.getElementById("textarea").style.display="block";
}

const change=(e)=>{
    const {name,value}=e.target;
    setInputs({...Inputs,[name]:value})
}

const submit =async()=>{
    // console.log(Inputs)
    // console.log(Inputs.title)
    console.log(id)
    if(Inputs.title==="" || Inputs.body==="")
    toast.error("Title/Body should not be Empty")
    else{
        if(id){
            await axios.post(`${window.location.origin}/api/v2/addTask`,{title:Inputs.title,body:Inputs.body,id:id})
            .then((response)=>{
                console.log(response)
            })
            // setArray([...Array,Inputs])
            setInputs({title:"",body:""})
            toast.success("Your task is added")
            // toast.error("Your task is not saved Please SignUp")
        }
        else
        toast.error("Your task is not saved Please SignUp")
    }
}

const del =async(Cardid)=>{
    // console.log(Cardid)
    if(id){
        await axios.delete(`${window.location.origin}/api/v2/deleteTask/${Cardid}`,{data:{id:id}},)
        .then((response)=>{
            toast.success("Your task is deleted")
        })
    }
    else
    toast.error("Please SignUp")

}

const dis =(value)=>{
    document.getElementById("todo-update").style.display=value
}

const update =(value)=>{
    // console.log(Array[value])
    toUpdateArray=(Array[value])
    // console.log(toUpdateArray)
}

useEffect(()=>{
    if(id){
        const fetch =async ()=>{
            await axios.get(`${window.location.origin}/api/v2/getTasks/${id}`)
            .then((response)=>{
                setArray(response.data.list)
            })
        }
        fetch();
    }
},[submit])

return (
    <>
        <div className='todo'>
            <ToastContainer />
            <div className="todo-main container d-flex justify-content-center align-items-center flex-column">
                <div className='d-flex flex-column todo-inputs w-50 todo-inputs-div p-1'>
                    <input type="text" placeholder='TITLE' className='my-2 p-2 todo-inputs' name='title' value={Inputs.title} onClick={show} onChange={change}/>
                    <textarea id="textarea" type="text" placeholder='BODY' className='my-2 p-2 todo-inputs' name='body' value={Inputs.body} onChange={change}/>
                    {/* <button className='home-btn'>Add</button> */}
                </div>
                <div className='w-50 d-flex justify-content-end my-3'>
                    <button className='home-btn px-2 py-1' onClick={submit}>Add</button>
                </div>
            </div>
            <div className="todo-body">
                <div className="container">
                    <div className='row'>
                        {Array && Array.map((item,index) => 
                            <div className='col-lg-3 col-10 mx-5 my-2' key={index}>
                            <TodoCards title={item.title} body={item.body} id={item._id} delid={del} display={dis} updateId={index} toBeUpdate={update}/>
                            </div>
                        )}
                    </div>
                    {/* {Array && Array.map((item,index) => <><TodoCards/></>)} */}
                </div>
            </div>
        </div>
        <div className='todo-update' id='todo-update'>
            <div className='container update'>
                <Update display={dis} update={toUpdateArray}/>
            </div>
        </div>
    </>
  )
}

export default Todo