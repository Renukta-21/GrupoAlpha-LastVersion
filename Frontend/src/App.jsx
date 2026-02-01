import MenuComponent from './MenuComponent.jsx';
import apiInstance from './apiInstance.js';
import { useState, useEffect } from 'react';
import NavBar from './NavBar.jsx';
import { Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import MainPage from './MainPage.jsx';
import ProductViewPage from './pages/ProductViewPage.jsx';
import { fetchCategories } from './services/categoryServices.js';
import Breadcrumb from './components/Breadcrum.jsx';
import CategoryDisplay from './pages/CategoryDisplay.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  const [selectedCatgeory, setSelectedCatgeory] = useState(null)
  const [categories, setCategories] = useState([]);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
   loadCategories()
  }, []);

const loadCategories = async()=>{
   try {
      const data = await fetchCategories()
      setCategories(data);
    } catch (error) {
      console.log('Error loading categories' + error) 
    }
}
  const handleMenuClick = (e) => {
    e.preventDefault();
    setMenuOpened(!menuOpened);
  };

  return (
    
      <div className="bg-mainDarkBlue min-h-screen px-2 relative">
        <MenuComponent categories={categories} menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
        <NavBar handleMenuClick={handleMenuClick} />
       {/*  <Breadcrumb/> */}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products/:id' element={<ProductViewPage/>}/>
          {/* <Route path='/category' element={<CategoryDisplay/>}/> */}
          <Route path='/categories/:id' element={<CategoryDisplay categories={categories}/>}/>
          <Route path='/products' element={<MainPage/>}></Route>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
  );
}

export default App
