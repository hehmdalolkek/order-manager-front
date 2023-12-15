import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar fixed-top bg-body-tertiary shadow border py-2">
      <div className="container">
        <a className="navbar-brand fs-2" href="/">Фотон</a>
        <div>
          <Link className='btn btn-outline-dark me-2' to='/cart'>Корзина</Link>
          <Link className='btn btn-outline-dark' to='/dashboard'>Панель администратора</Link>
        </div>
      </div>
    </nav>
  )
}
