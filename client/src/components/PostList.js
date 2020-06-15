import React, { useState, useEffect } from 'react';
import axios from 'axios';

// imp comps
import Post from './Post'
import { Card } from 'semantic-ui-react';

const PostList = () => {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    axios
      .get('http://localhost:5000/posts')
      .then(res => {
        console.log(res.data)
        setPosts(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  return(
    <div>
      {posts.map(post => {
        return (
          <Post post={post} />
          // <Card.Group items={posts} />
        )
      })}
    </div>
  )
}

export default PostList;