import React from 'react'
import './Signup.css';
import HeadingComp from './HeadingComp';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';

const Signin = () => {
  const dispatch=useDispatch();
  const [Inputs, setInputs] = useState({email:"",password:""})
  const history=useNavigate()

  const change =(e)=>{
    const {name,value}=e.target;
    setInputs({...Inputs,[name]:value})
  }

  const submit =async(e)=>{
    e.preventDefault();
        await axios.post(`${window.location.origin}/api/v1/signin`,Inputs)
        .then((response)=>{
            if(response.data.message==="Please Sign Up first")
            toast.error(response.data.message)
            else if(response.data.message==="Enter correct password")
            toast.error(response.data.message)
            else{
                console.log(response.data.others._id)
                sessionStorage.setItem("id",response.data.others._id)
                dispatch(authActions.login())
                history("/todo")
            }
        })
  }

  return (
    <div className='signup'>
        <div className='container'>
            <div className='row'>
                <ToastContainer/>
                <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
                    <div className='d-flex flex-column p-5 w-100'>
                        <input type='email' placeholder='Enter your email' className='p-2 my-3 input-signup' name='email' onChange={change} value={Inputs.email}/>
                        <input type='password' placeholder='Enter your password' className='p-2 my-3 input-signup' name='password'  onChange={change} value={Inputs.password}/>
                        <button className='btn-signup p-2' onClick={submit}>SignIn</button>
                    </div>
                </div>
                <div className="col-lg-4 column col-left d-flex justify-content-center align-items-center">
                    {/* <h1 className='text-center sign-up-heading'>Sign<br/>Up</h1> */}
                    <HeadingComp first="Sign" second="In"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signin