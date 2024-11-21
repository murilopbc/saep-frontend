import React from 'react';
import '../css/Header.module.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
      <header className="navbar">
        <div className="navbar-title">Gerenciamento de Tarefas</div>
        <nav className="navbar-links">
            <Link to='/'>Cadastro de Usuários</Link>
            <Link to='/tasks/new'>Cadastro de Tarefas</Link>
            <Link to='/tasks'>Gerenciamento de Tarefas</Link>
       
        </nav>
      </header>
    );
  };
  
  export default Navbar;

