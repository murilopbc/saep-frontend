import React from 'react';
import styles from '../css/Header.module.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
      <header className={styles.navbar}>
      <div>Gerenciamento de Tarefas</div>
      <nav className={styles.nav}>
        <Link to="/">Cadastro de Usuários</Link>
        <Link to="/tasks/new">Cadastro de Tarefas</Link>
        <Link to="/tasks">Gerenciamento de Tarefas</Link>
      </nav>
    </header>
    );
  };
  
  export default Navbar;

