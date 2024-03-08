'use client'

import * as React from 'react'
import { storyblokInit, apiPlugin } from 'gatsby-source-storyblok'
import * as styles from './layout.module.css'

storyblokInit({
  accessToken: process.env.GATSBY_PREVIEW_STORYBLOK,
  use: [apiPlugin],
})

const Layout = ({ children }) => {
  const currentYear = (new Date()).getFullYear()
  const year = currentYear !== 2023 ? `2023-${currentYear}` : currentYear

  return (
    <div className={styles.body}>
      <header className={styles.branding}>calliander.net</header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.info}>
        <div className={styles.copyright}>&copy; {year} calliander.net</div>
        <div className={styles.cookies}>This site doesn't use cookies or tracking scripts.</div>
      </footer>

      <div hidden>
        <span id="label-external">Opens an external link in a new tab</span>
      </div>
    </div>
  )
}

export default Layout
