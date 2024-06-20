import React from 'react'
import "./Appdownload.css"
import { assets } from '../../assets/frontend_assets/assets'
function Appdownload() {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br/>Tomata App </p>
        <div className="app-downnload-platforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default Appdownload