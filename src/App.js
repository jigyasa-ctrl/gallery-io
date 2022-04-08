import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Components/Layout'
import Image from "./Components/Image"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path="/image" element={<Image />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
