import { createContext, useState, useMemo, useEffect } from 'react'
import Router from 'next/router'

export const MenuContext = createContext()

export default function MenuProvider({ children }) {
  const [open, setOpen] = useState(false)
  const context = useMemo(() => ({ open, setOpen }), [open])

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setOpen(false)
    })
  }, [])

  return <MenuContext.Provider value={context}>{children}</MenuContext.Provider>
}
