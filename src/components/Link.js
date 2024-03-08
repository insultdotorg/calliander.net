import * as React from 'react'
import Preview from './Preview'
import Label from './Label'
import Description from './Description'
import * as styles from './link.module.css'

const Link = ({ link }) => {
  if(link) {
    const { url, preview, label, description } = link

    return (
      <a href={url} target="_blank" aria-describedby="label-external" className={styles.link}>
        <Preview preview={preview} label={label} />
        <Label label={label} />
        <Description description={description} />
      </a>
    )
  }
}

export default Link
