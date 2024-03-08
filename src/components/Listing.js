import * as React from 'react'
import Post from './Post'
import Empty from './Empty'
import * as styles from './listing.module.css'

const Listing = ({ posts }) => {
  if(posts.length) {
    return (
      <ul className={styles.listing}>
        {posts.map(post => <Post key={post.id} post={post} />)}
      </ul>
    )
  }

  return <Empty />
}

export default Listing
