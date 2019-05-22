import React from 'react'
import { Link } from '_routes'
import { isExternalUrl } from 'helpers/UrlHelpers'

export default function A({ href, ...props }) {
  if(isExternalUrl(href) || props.target) return <a href={href} {...props} />
  return (
    <Link route={ href }>
      <a { ...props } />
    </Link>
  )
}

A.defaultProps = {
  href: '/'
}
