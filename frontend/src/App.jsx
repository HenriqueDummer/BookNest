import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import {useQuery, QueryClientProvider} from "@tanstack/react-query"


import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import Home from './pages/Home'

import { getMe } from './util/http'

function App() {
  const navigate = useNavigate()
  const {data: authUser, isLoading} = useQuery({
    queryFn: getMe,
    queryKey: ['authUser'],
    retry: false
  })

  return (
    <>
     <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />}  />
        <Route path='/login' element={<LogIn />}/>
        <Route path='/signup' element={<SignUp />}/>
     </Routes>
    </>
  )
}

export default App
