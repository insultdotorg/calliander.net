import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Listing from '../components/Listing'
import Pagination from '../components/Pagination'

const IndexPage = ({
  data: {
    pages: {
      pagination,
      posts
    }
  }
}) => {
  return (
    <Layout>
      <Listing posts={posts} />
      <Pagination pagination={pagination} />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
query ($skip: Int!) {
  pages: allStoryblokEntry(
    limit: 10
    skip: $skip
    sort: {created_at: DESC}
    filter: {field_component: {eq: "post"}}
  ) {
    pagination: pageInfo {
      currentPage
      hasNextPage
      hasPreviousPage
      itemCount
      pageCount
      perPage
      totalCount
    }
    posts: nodes {
      id: internalId
      date: created_at
      body: content
    }
  }
}
`

export const Head = () => <title>calliander.net</title>
