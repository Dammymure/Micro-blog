import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Star from "../images/Twitter_star.png"
import Upload from "../images/upload_image.png"
import AllTweets from './AllTweets';


// import LeftSide from '../components/LeftSide';
// import Post from '../Post';

const IndexPage = () => {
  const [tweet, setTweet] = useState('')
  const [files, setFiles] = useState('')
  const [redirect, setRedirect] = useState(false)

  async function createNewTweet(ev) {
    const data = new FormData()
    data.set('tweet', tweet)
    data.set('file', files[0])
    ev.preventDefault()

    const response = await fetch('http://localhost:7000/api/tweet', {
      method: 'POST',
      body: data,
      credentials: 'include',
    })

    if (response.ok) {
      setRedirect(true)
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

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
                <img src="" alt='' className='tweet-img' />
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
        Hello
        <AllTweets />
      </div>
    </div>
  )
}

export default IndexPage;