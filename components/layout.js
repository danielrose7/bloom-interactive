import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Head from "next/head"
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const siteTitle = 'Bloom Interactive';
const name = 'Bloom Interactive'
const description = "Strategy, design, and engineering for founder-led companies."

export default function Layout({ children, home }) {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('bloom-theme')
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    const initialTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : systemTheme
    setTheme(initialTheme)
    document.documentElement.dataset.theme = initialTheme
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    document.documentElement.dataset.theme = nextTheme
    window.localStorage.setItem('bloom-theme', nextTheme)
  }

  const themeToggle = (
    <button className={styles.themeToggle} type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
      <span aria-hidden="true">{theme === 'dark' ? '☼' : '◐'}</span>
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )

  return (
    <>
      <div className={`${styles.container} ${home ? '' : styles.innerPage}`}>
        <Head>
          <link rel="icon" href="/images/bloom-logo.png" />
          <meta name="description" content={description} />
          <meta property="og:type" content="website" />
          <meta name="og:title" content={siteTitle} />
          <meta name="og:description" content={description} />
          <meta property="og:image" content="/images/bloom-logo.png" />
        </Head>
        <header className={`${styles.header} ${home ? styles.homeHeader : ''}`}>
          {home ? (
            <div className={styles.headerBrand}>
              <img
                src="/images/bloom-logo.png"
                className={styles.headerHomeImage}
                alt={name}
              />
              <strong className={styles.brandName}>{name}</strong>
              <nav className={styles.homeNav} aria-label="Main navigation">
                <a href="#work">Work</a>
                <Link href="/portfolio">Portfolio</Link>
                <a className={styles.navCta} href="#contact">Contact</a>
              </nav>
            </div>
          ) : (
            <>
              <Link href="/">
                <img
                  src="/images/bloom-logo.png"
                  className={styles.headerImage}
                  alt={name}
                />
              </Link>
              <h2 className={utilStyles.headingLg}>
                <Link href="/" className={utilStyles.colorInherit}>{name}</Link>
              </h2>
              <Link href="/">← Back to home</Link>
            </>
          )}
        </header>
        <main>{children}</main>
      </div>
    <footer className={`${styles.footer} ${home ? styles.homeFooter : styles.innerFooter}`}>
      <span className={styles.footerCopyright}>&copy; {new Date().getFullYear()} Bloom Interactive</span>
      <a
        href="https://gobloom.io"
        className={styles.mountainLink}
      >
        <span className={styles.mountainLabel}>Made in Silverton, CO</span>
      </a>
      <nav className={styles.footerNav}>
        <Link href="/portfolio">Portfolio</Link>
        <Link href="/playground">Playground</Link>
        {themeToggle}
      </nav>
    </footer>
    </>
  )
}
