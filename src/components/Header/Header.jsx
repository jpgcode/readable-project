import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <h1 className="blog__title"><Link title="Go back to home" to="/">React blog</Link></h1>
  )
}
