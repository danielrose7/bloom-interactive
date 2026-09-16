"use client";

import styles from './layout.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, ViewTransition } from 'react'
import ContactPopover from './contact-popover'

export const siteTitle = 'Bloom Interactive';
const name = 'Bloom Interactive'

export default function Layout({ children, home }) {
  const [theme, setTheme] = useState('dark')
  const [navVisible, setNavVisible] = useState(true)
  const pathname = usePathname()
  const previousPathname = useRef(pathname)

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('bloom-theme')
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    const initialTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : systemTheme
    setTheme(initialTheme)
    document.documentElement.dataset.theme = initialTheme
  }, [])

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      setNavVisible(true)
      previousPathname.current = pathname
    }
  }, [pathname])

  useEffect(() => {
    let lastY = Math.max(window.scrollY, 0)
    let upwardTravel = 0

    const handleScroll = () => {
      const currentY = Math.max(window.scrollY, 0)
      const delta = currentY - lastY

      if (currentY < 24) {
        setNavVisible(true)
        upwardTravel = 0
      } else if (delta > 4) {
        setNavVisible(false)
        upwardTravel = 0
      } else if (delta < 0) {
        upwardTravel += Math.abs(delta)
        if (upwardTravel >= 24) setNavVisible(true)
      }

      lastY = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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

  const brand = (
    <div className={styles.headerBrand}>
      <ViewTransition name="bloom-logo" share="bloom-logo-share" default="none">
        <Link href="/" className={styles.logoLink} aria-label="Bloom Interactive home" transitionTypes={["bloom-navigation"]}>
          <img src="/images/bloom-logo.png" className={styles.headerHomeImage} alt="" />
        </Link>
      </ViewTransition>
      <ViewTransition name="bloom-wordmark" share="bloom-wordmark-share" default="none">
        <Link href="/" className={styles.brandName} transitionTypes={["bloom-navigation"]}>{name}</Link>
      </ViewTransition>
      {home ? (
        <nav className={styles.homeNav} aria-label="Main navigation">
          <a href="#work">Work</a>
          <Link href="/portfolio" transitionTypes={["bloom-navigation"]}>Portfolio</Link>
          <a className={styles.navCta} href="#contact" onClick={(event) => {
            event.preventDefault()
            window.dispatchEvent(new Event('bloom:open-contact'))
          }}>Contact</a>
        </nav>
      ) : (
        <nav className={styles.homeNav} aria-label="Main navigation">
          <Link href="/portfolio" transitionTypes={["bloom-navigation"]}>Portfolio</Link>
          <Link href="/playground" transitionTypes={["bloom-navigation"]}>Playground</Link>
          <a className={styles.navCta} href="/#contact" onClick={(event) => {
            event.preventDefault()
            window.dispatchEvent(new Event('bloom:open-contact'))
          }}>Contact</a>
        </nav>
      )}
    </div>
  )

  return (
    <>
      <div className={`${styles.container} ${home ? '' : styles.innerPage}`}>
        <header className={`${styles.header} ${styles.homeHeader} ${navVisible ? '' : styles.mobileNavHidden}`}>
          {brand}
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
        <Link href="/portfolio" transitionTypes={["bloom-navigation"]}>Portfolio</Link>
        <Link href="/playground" transitionTypes={["bloom-navigation"]}>Playground</Link>
        {themeToggle}
      </nav>
    </footer>
    <ContactPopover />
    </>
  )
}
