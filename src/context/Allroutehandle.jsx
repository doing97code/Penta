import React from 'react'
import Signup from './Signup'
import DataView from './DataView'
import { Routes , Route } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Bdofbb from './Bdofbb'
import EmailSender from './EmailSender'
import New_password_fill from './New_password_fill'


function Allroutehandle() {
  return (
    <div >
         
      <Routes>
        <Route path='/' element={< Home/>} />
        <Route path='/signup' element={< Signup/>} />
        <Route path='/about' element={< DataView/>} />
        <Route path='/login' element={< Login/>} />
        <Route path='/special' element={<Bdofbb/>} />
        <Route path='/email' element={<EmailSender/>} />
        <Route path='/recover_password' element={<New_password_fill/>} />

        

        {/* <Route path='/*' element={<HandleRoute />}></Route> */}
      </Routes>
    </div>
  )
}

export default Allroutehandle
