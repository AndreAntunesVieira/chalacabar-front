import React from 'react'
import Link from 'next/link'
import { isExternalUrl } from 'helpers/UrlHelpers'

export default function A({ href, prefetch = false, ...props }) {
  if (isExternalUrl(href) || props.target) return <a href={href} {...props} />
  return (
    <Link href={href} prefetch={prefetch}>
      <a {...props} />
    </Link>
  )
}

A.defaultProps = {
  href: '/',
}
