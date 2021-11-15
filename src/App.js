import React from "react";
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import AllProduct from './components/AllProduct';

const App = () => {
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>  
          <Route exact path='/login' element={ <Login /> } />
          <Route exact path='/add' element={<AddProduct />} />
          <Route exact path='/edit/:id' element={<UpdateProduct />} />
          <Route exact path='/' element={<AllProduct />} />
          <Route exact path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;