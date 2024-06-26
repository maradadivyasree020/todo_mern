import React from 'react'
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home d-flex justify-content-center align-items-center'>
        <div className="container d-flex justify-content-center align-items-center flex-column">
            <h1 className='text-center'>Organize yourself!<br/>Stay Productive<br/></h1>
            <p className='text-center'>Become productive <br/> and Achieve Your Goals</p>
            <Link to="/todo"><button className='home-btn p-3'>Add your Todo!</button></Link>
        </div>
    </div>
  )
}

export default Home