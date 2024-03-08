import * as React from 'react'
import * as styles from './page-label.module.css'

const PageLabel = ({
  currentPage,
  pageCount
}) => <div className={styles.label}>Page {currentPage} of {pageCount}</div>

export default PageLabel
