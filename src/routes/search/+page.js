export const load = async ({ url: { searchParams } }) => {
  return {
    term: searchParams.get('term')
  }
}
