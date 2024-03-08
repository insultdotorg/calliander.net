import * as React from 'react'
import * as styles from './pagination-link.module.css'

const PaginationLink = ({
  isLink,
  toPage,
  children
}) => {
  if(isLink) {
    return <span className={styles.link}><a href={toPage === 1 ? '/' : `/page/${toPage}`}>{children}</a></span>
  }
  
  return <span disabled className={styles.disabled}>{children}</span>
}

export default PaginationLink
