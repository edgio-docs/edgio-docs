import React, { createContext, useState, useMemo } from 'react'

export const MenuContext = createContext()

export default function MenuProvider({ children }) {
  const [open, setOpen] = useState(false)
  const context = useMemo(() => ({ open, setOpen }), [open])
  return <MenuContext.Provider value={context}>{children}</MenuContext.Provider>
}
