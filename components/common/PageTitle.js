import React from 'react'
import Head from 'next/head'

const PageTitle = ({ children }) => (
  <Head>
    <title>{children}</title>
  </Head>
)

export default PageTitle
