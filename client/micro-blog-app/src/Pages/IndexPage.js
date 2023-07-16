import React, { useState, useEffect, useContext } from 'react';
import swal from "sweetalert"
// import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import Star from "../images/Twitter_star.png"
import Upload from "../images/upload_image.png"
import AllTweets from './AllTweets';
import { UserContext } from '../UserContext';
// import { UserContextProvider } from "../UserContext";


// import LeftSide from '../components/LeftSide';
// import Post from '../Post';

const IndexPage = (id) => {
  // const { id } = useParams()
  console.log(id.id);
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [tweet, setTweet] = useState('')
  const [files, setFiles] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [userDetails, setUserDetails] = useState('')

  useEffect(() => {
    fetch('http://localhost:7000/api/create/user/' + id.id)
      .then(response => {
        response.json().then(postInfo => {
          setUserDetails(postInfo)
          setUserInfo(postInfo)
          console.log(postInfo);
        })
      })
  }, [])

  async function createNewTweet(ev) {
    ev.preventDefault()
    const data = new FormData()
    data.set('tweet', tweet)
    data.set('file', files[0])

    const response = await fetch('http://localhost:7000/api/tweet', {
      method: 'POST',
      body: data,
      credentials: 'include',
    })

    if (response.ok) {
      setRedirect(true)
      swal("Tweet Sent Successfully", "Success", "Success")
    }
  }

  if (redirect) {
    // return <Navigate to={'/'} />
  }

  // console.log(userID.id);
  // Fetch data for single product


  return (
    <div>
      <div>
        <div className="header-container">
          <div className="home-header">
            <h2>Home</h2>
            <img src={Star} alt='' className='star' />
          </div>
        </div>

        <div>

          <div className='tweet'>

            <form onSubmit={createNewTweet}>
              <div className='tweet-img-text'>
                <img src={userDetails.imageURL} alt='' className='tweet-img' />
                {/* <h1>{userDetails.username}</h1> */}
                <input
                  type="text"
                  placeholder="What's happening?" className='tweet-area'
                  value={tweet}
                  onChange={ev => setTweet(ev.target.value)}
                />
              </div>

              <div className='tweet-icons'>
                <label for='upload-img'><img src={Upload} alt="" className='upload-img' /></label>
                <input type="file"
                  id='upload-img'
                  className='image-upload'
                  style={{ display: "none", visibility: "none" }} accept="image/*"
                  onChange={ev => setFiles(ev.target.files)}
                />
                <button type='submit' className='tweet-submit'>Tweet</button>
              </div>
            </form>
          </div>

        </div>

      </div>
      <div>
        <AllTweets />
      </div>
    </div>
  )
}

export default IndexPage;

