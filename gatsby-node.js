const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPages } = actions

  const result = await graphql(`
    query {
      posts: allStoryblokEntry(
        filter: {
          field_component: {
            eq: "post"
          }
        }
      ) {
        total: totalCount
      }
    }
  `)

  if(result.error) {
    reporter.panicOnBuild('Error in pagination query')
    return
  }

  if(result.data.posts.total === 0) {
    const pages = 0

    actions.createPage({
      path: '/',
      component: path.resolve('./src/templates/index.js'),
      context: {
        limit: 10,
        skip: 0,
        pages,
        currentPage: 1
      }
    })
  }
  else {
    const pages = Math.ceil(result.data.posts.total / 10)
    Array.from({ length: pages }).forEach((_, i) => {
      const currentPage = i + 1

      actions.createPage({
        path: i === 0 ? '/' : `/page/${currentPage}`,
        component: path.resolve('./src/templates/index.js'),
        context: {
          limit: 10,
          skip: i * 10,
          pages,
          currentPage: currentPage
        }
      })
    })
  }
}
