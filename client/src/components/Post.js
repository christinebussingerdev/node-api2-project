import React from 'react';
import { Card } from 'semantic-ui-react';

const Post = props => {

  return (
    <>
      <Card 
      header={props.post.title}
      description={props.post.contents}
      meta={props.post.created_at}
      />

      {/* <h3>{props.post.title}</h3>
      <p>{props.post.created_at}</p>
      <p>{props.post.contents}</p>
      <br /> */}
    </>
  )
}

export default Post;