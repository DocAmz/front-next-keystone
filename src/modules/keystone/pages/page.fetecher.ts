import keystoneFetcher from "../utils/fetcher"

export const PageFetcher = async (query: string) => {
  const res = keystoneFetcher('/pages', query, {})

  return res
}