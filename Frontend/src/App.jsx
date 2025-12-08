import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import logo from './assets/logo.jpeg'
import logoDark from './assets/logoDark.png'
import axios from 'axios';
import apiInstance from './apiInstance.js';
import { useState, useEffect } from 'react';

function App() {
  const [categories, setCategories] = useState([]);
  const [menuOpened, setMenuOpened] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await apiInstance.get('/categories');
    setCategories(response.data);
    console.log(response.data);
  };

  const handleMenuClick = (e) => {
    e.preventDefault();
    setMenuOpened(!menuOpened);
  };

  return (
    <div className="bg-mainDarkBlue min-h-screen px-2 relative">

      {menuOpened && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[1px] z-10"></div>
      )}

      <div
        className={`${menuOpened
            ? "fixed z-20 bg-secondaryBlue left-0 w-4/5 h-full translate-x-0 border-r-[1px] border-blue-950"
            : "hidden -translate-x-full"
          }`}
      >
        
        <section className="py-3 pl-4 pr-6">
          <div className="flex justify-between">
            <div className="border-[1px] border-gray-500 rounded-xl flex items-center">
              <IoSearch className="mx-4 text-gray-500" />
              <input type="text" placeholder='Buscar categorias...' className='placeholder-gray-500 text-gray-300 outline-none py-2' />
            </div>
            <div>
              <button className='text-gray-500 text-2xl' onClick={() => setMenuOpened(false)}>x</button>
            </div>
          </div>
        </section>
        <div className='w-full h-[1px] bg-blue-950'></div>

        <section className='h-full'>
          <ul className="flex flex-col gap-4 bg-thirdBlue">
            {categories.map((category) => (
              <li key={category.id} className="text-gray-300 hover:bg-blue-700 rounded-lg px-3 py-2">
                <a href="">{category.nombre}</a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* NAV */}
      <nav className="py-2 mx-3">
        <section className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="" className="text-white mr-2" onClick={handleMenuClick}>
              <RxHamburgerMenu />
            </a>

            <a href="" className="max-w-[140px] block">
              <img src={logoDark} alt="" className="w-full" />
            </a>
          </div>

          <div className="flex text-xl items-center gap-4">
            <a href="" className="text-white">
              <MdOutlineLocalFireDepartment />
            </a>
            <a href="" className="text-white">
              <FaRegUserCircle />
            </a>
            <a href="" className="bg-cartBackground p-2 rounded-lg">
              <IoCartOutline />
            </a>
          </div>
        </section>

        <section>
          <div className="flex items-center border-white border-[0.5px] rounded-full my-2 py-2">
            <IoSearch className="mx-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar productos, marcas y mas..."
              className="searchProductsinput"
            />
          </div>
        </section>
      </nav>
    </div>
  );
}
function MenuComponent(){
  return(
    <>
      
    </>
  )
}

export default App