import React from 'react'
import './footer.css'
import yt_icon from "../../assets/youtube_icon.png"
import twi_icon from "../../assets/twitter_icon.png"
import insta_icon from "../../assets/instagram_icon.png"
import fb_icon from "../../assets/facebook_icon.png"





const footer = () => {
  return (
    <div className='footer' >
      <div className="footer-icons">
      <img src={fb_icon} alt="" />
      <img src={insta_icon} alt="" />
      <img src={twi_icon} alt="" />
      <img src={yt_icon} alt="" />
      </div>

    <div>
    <ul>
      <li>Audio Description</li>
      <li>Help Centre</li>
      <li>Gift Cards</li>
      <li>Media Centre</li>
      <li>Investor Relations</li>
      <li>Jobs</li>
      <li>Terms of Use</li>
      <li>Privacy</li>
      <li>Legal Notices</li>
      <li>Cookie Preferences</li>
      <li>Corporate Information</li>
      <li>Contact Us</li>
    </ul>
    <p className='copyright-text'> © 1997-2025 Netflix, Inc.    </p>

    </div>



    </div>
  )
}

export default footer
