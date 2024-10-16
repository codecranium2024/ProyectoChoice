import React from 'react'
import Pic from './../../img/logo_text.png'
import LogoU from './../../img/logoUMG.png'
import { IonRow } from '@ionic/react'
import './style.css'
export const Logo = () => {
  return (
    <IonRow className='LogoPanel'>
        <img src={Pic} alt="" className='LogoImg'/>
        <img src={LogoU} alt="" style={{width: '40%', height: '40%', paddingBottom:'20px'}}/>
    </IonRow>
  )
}
export default Logo