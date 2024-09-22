import React from 'react'
import Pic from './../../img/logo_text.png'
import './style.css'
export const Logo = () => {
  return (
    <div className='LogoPanel'>
      <img src={Pic} alt="" className='LogoImg'/>
    </div>
  )
}
export default Logo