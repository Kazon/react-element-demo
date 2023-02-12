import { useRoutes } from "react-router-dom";
import React, { memo } from 'react'
import City from "../pages/city/city";
import Address from "../pages/city/address";
import Home from "../pages/home/home";

const DefineRoutes = memo(() => {
  const routes = useRoutes(
    [
      {
        path: '/',
        element: <City></City>
        // element: () => import('../pages/city/city')
      },
      {
        path: '/address/:id',
        element: <Address></Address>
        // element: () => import('../pages/city/address')
      },
      {
        path: '/home',
        element: <Home></Home>
        // element: () => import('../pages/city/address')
      },
    ]
  )
  return routes
})

export default DefineRoutes