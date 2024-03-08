import * as React from 'react'
import * as styles from './description.module.css'

const Description = ({ description }) => {
  if(description) {
    return <div className={styles.description}>{description}</div>
  }
}

export default Description
