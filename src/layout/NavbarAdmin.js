import React from 'react'
import { Link } from 'react-router-dom';

export default function NavbarAdmin() {
  return (
    <nav className="navbar fixed-top bg-body-tertiary shadow border py-2">
      <div className="container">
        <p className="navbar-brand fs-2 m-0">Фотон</p>
        <div>
          <Link className='btn btn-outline-dark px-5' to='/logout'>Выйти</Link>
        </div>
      </div>
    </nav>
  )
}
