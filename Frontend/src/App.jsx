import MenuComponent from './MenuComponent.jsx';
import apiInstance from './apiInstance.js';
import { useState, useEffect } from 'react';
import NavBar from './NavBar.jsx';
import { Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import MainPage from './MainPage.jsx';


function App() {
  const [categories, setCategories] = useState([]);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await apiInstance.get('/categories');
    const cats = response.data;

    const subRequests = cats.map(c =>
      apiInstance.get(`/categories/${c.id}`).then(r => r.data)
    );

    const subcategories = await Promise.all(subRequests);

    const finalData = cats.map((cat, index) => ({
      ...cat,
      subcategorias: subcategories[index]
    }));

    setCategories(finalData);
    console.log(finalData);
  };

  const handleMenuClick = (e) => {
    e.preventDefault();
    setMenuOpened(!menuOpened);
  };

  return (
    
      <div className="bg-mainDarkBlue min-h-screen px-2 relative">
        <MenuComponent categories={categories} menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
        <NavBar handleMenuClick={handleMenuClick} />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<MainPage/>}></Route>
        </Routes>
      </div>
  );
}

export default App
