import React from 'react'
import SearchBar from './SearchBar'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto">
        <SearchBar/>
      </div>
    </header>
  )
}

export default Header