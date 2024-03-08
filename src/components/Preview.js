import * as React from 'react'
import * as styles from './preview.module.css'

const Preview = ({
  preview: {
    alt,
    filename
  },
  label
}) => {
  if(filename) {
    return (
      <div className={styles.preview}>
        <img src={filename} alt={alt || label} height="auto" width="318" />
      </div>
    )
  }
}

export default Preview
