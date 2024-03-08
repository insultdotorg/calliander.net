import * as React from 'react'
import PaginationLink from './PaginationLink'
import Chevron from './Chevron'
import PageLabel from './PageLabel'
import * as styles from './pagination.module.css'

const Pagination = ({
  pagination: {
    currentPage,
    hasNextPage,
    hasPreviousPage,
    pageCount,
  }
}) => {
  if(pageCount > 1) {
    return (
      <nav aria-label="Pages of posts" className={styles.pagination}>
        <PaginationLink isLink={hasPreviousPage} toPage={currentPage - 1}>
          <Chevron />
          <span className={styles.sr}>Previous</span>
        </PaginationLink>

        <PageLabel currentPage={currentPage} pageCount={pageCount} />

        <PaginationLink isLink={hasNextPage} toPage={currentPage + 1}>
          <span className={styles.sr}>Next</span>
          <Chevron right={true} />
        </PaginationLink>
      </nav>
    )
  }
}

export default Pagination
