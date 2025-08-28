import React from 'react'

const Header = () => {
  return (
    <div>
       <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-semibold">Recipe Ideas</h1>
          <p className="text-xs text-slate-400">Powered by TheMealDB</p>
        </div>
      </header>
    </div>
  )
}

export default Header
