import * as React from 'react'
import Markdown from 'react-markdown'
import * as styles from './content.module.css'

const Content = ({ content }) => {
  return (
    <div className={styles.content}>
      <Markdown>{content}</Markdown>
    </div>
  )
}

export default Content
