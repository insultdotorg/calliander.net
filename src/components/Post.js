import * as React from 'react'
import Time from './Time'
import Link from './Link'
import Content from './Content'
import * as styles from './post.module.css'

const Post = ({
  post: {
    date,
    body
  }
}) => {
  const {
    content,
    linkBlock: {
      0: link
    }
  } = JSON.parse(body);

  return (
    <li className={styles.post}>
      <Time date={date} />
      <Link link={link} />     
      <Content content={content} />
    </li>
  )
}

export default Post
