import React, { useState, useEffect } from 'react';
import { formatDistanceToNowStrict } from "date-fns"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
// import {  } from 'react-router-dom';
import { FaThumbsDown } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa6";
import { VscAdd } from "react-icons/vsc";

const AllTweets = () => {
  const [tweets, setTweets] = useState([])
  useEffect(() => {
    fetch('http://localhost:7000/api/tweet/home').then(response => {
      response.json().then(posts => {
        console.log(posts);
        setTweets(posts);
      })
    })
  }, [])
  return (
    <>
      {tweets.length > 0 && tweets.map(tweet => (
        <div className='tweet-layout'>
          <div className='image-contain'>
            <img src={tweet.postedBy.imageURL} className='tweet-img' />
          </div>

          <div className='tweet-text-img'>
            <div style={{ display: "flex" }}>
              <p className='tweet-username'>{tweet.postedBy.username}</p>
              <time className='tweet-time'>-{formatDistanceToNowStrict(new Date(tweet.createdAt))}</time>

            </div>
            <p className='tweet-tweet'>{tweet.tweet}</p>
            <img src={'http://localhost:7000/' + tweet.photo} alt="" className='tweet-image' />
          </div>
          <div>
            <button><FaThumbsUp /></button>
            <button><FaThumbsDown /></button>

          </div>
        </div>
      ))}
    </>
  )
}




export default AllTweets;