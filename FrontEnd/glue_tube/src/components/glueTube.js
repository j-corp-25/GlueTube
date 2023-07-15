import React from 'react'
// import { useState } from 'react';
import NavBar from './navBar';
import './home.css';
import VideoList from './VideoList';
// import ProductTable from './ProductTable';


const GlueTube = () => {
  return (
    <div className='master-page'>
     <NavBar/>
     <VideoList/>
    </div>

  )
}

export default GlueTube;
