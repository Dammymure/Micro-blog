import React, { useState, useContext } from 'react';

const RegisterUser = () => {
 return (
  <div className="main-form">

   <div id='main'>
    <div class="container">
     <form class="form" id="form">
           <h2 className="sign-header">Register With Twitter</h2>
      <div class="form-control ">
       <label for="username">Username</label>
       <input type="text" id="username" placeholder="enter Username" />
       <small>Error Message</small>
      </div>
      <div class="form-control">
       <label for="Email">Email</label>
       <input type="text" id="Email" placeholder="enter Email" />
       <small>Error Message</small>
      </div>
      <div class="form-control">
       <label for="password">Password</label>
       <input type="password" id="password" placeholder="enter password" />
       <small>Error Message</small>
      </div>
      <div class="form-control">
       <label for="password2">Profile Picture</label>
       <input type="file" />
       <small>Error Message</small>
      </div>
      <button className='register-btn'>Submit</button>
     </form>
    </div>

   </div>
  </div>)
}



export default RegisterUser;