import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';
import UpdateProduct from './pages/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Home/>} path="/"/>
            <Route element={<AddProduct/>} path="/addProduct"/>
            <Route element={<ProductDetail/>} path="/detail/:slug"/>
            <Route element={<UpdateProduct/>} path="/update/:id"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
