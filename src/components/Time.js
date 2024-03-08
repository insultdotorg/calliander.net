import * as React from 'react'
import { format } from 'date-fns'
import * as styles from './time.module.css'

const Time = ({ date }) => {
  const prettyDate = format(new Date(date), 'E, MMM do, yyyy @ h:mma')

  return <time className={styles.date} dateTime={date}>{prettyDate}</time>
}

export default Time
