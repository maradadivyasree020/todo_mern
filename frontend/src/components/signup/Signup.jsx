import React from 'react'
import './Signup.css';
import HeadingComp from './HeadingComp';
import { useState } from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const history=useNavigate()

    const [Inputs, setInputs] = useState({email:"",username:"",password:""})

    const change =(e)=>{
        // console.log(e.target.value)
        const{name,value}=e.target
        setInputs({...Inputs,[name]:value})
    }

    const submit = async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:5000/api/v1/register",Inputs)
        .then((response)=>{
            if(response.data.message === "User Already Exists")
            toast.error(response.data.message)
            else{
                toast.success(response.data.message)
                setInputs({email:"",username:"",password:""})
                history("/signin")
            }
            // console.log(response)

            setInputs({email:"",username:"",password:""})
        })
        // console.log(Inputs)
        // setInputs({email:"",username:"",password:""})
    }

    return (
    <div className='signup'>
        <ToastContainer/>
        <div className='container'>
            <div className='row'>
                <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
                    <div className='d-flex flex-column p-5 w-100'>
                        <input type='email' placeholder='Enter your email' className='p-2 my-3 input-signup' name='email' value={Inputs.email} onChange={change}/>
                        <input type='username' placeholder='Enter your username' className='p-2 my-3 input-signup' name='username' value={Inputs.username} onChange={change}/>
                        <input type='password' placeholder='Enter your password' className='p-2 my-3 input-signup' name='password' value={Inputs.password} onChange={change}/>
                        <button className='btn-signup p-2' onClick={submit}>SignUp</button>
                    </div>
                </div>
                <div className="col-lg-4 column col-left d-flex justify-content-center align-items-center">
                    {/* <h1 className='text-center sign-up-heading'>Sign<br/>Up</h1> */}
                    <HeadingComp first="Sign" second="Up"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup