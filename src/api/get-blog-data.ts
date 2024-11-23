import { type GetPostData } from '@/api/common-type-get-post.ts'
import { env } from '@/env.ts'
import { api } from '@/lib/axios.ts'

export async function getBlogData(): Promise<GetPostData> {
  // await getAuthorizationToken()

  // Base URL
  // const url = "entretenimento/pedro-permuy/wp-json/wp/v2"

  // Lista com respostas personalizadas
  const response = []
  // Pegando os posts
  for (const blog of env.BLOG_URL) {
    const postsResponse = await api.get(blog.posts, {
      params: {
        per_page: 8,
      },
    })

    console.log(postsResponse)
    // Iterando sobre os posts para capturar o autor e thumbnail
    for (let i = 0; i < postsResponse.data.length; i++) {
      // capturando o id do autor
      const postAuthor = postsResponse.data[i].author
      // capturando o id da imagem em destaque
      const featuredImage = postsResponse.data[i].featured_media
      // Pegando os dados do autor
      const authorResponse = await api.get(
        `${blog.api_url}/users/${postAuthor}`
      )
      // Pegando os dados da imagem de destaque
      const featuredImageResponse = await api.get(
        `${blog.api_url}/media/${featuredImage}`
      )
      // Montando o objeto
      response.push({
        title: postsResponse.data[i].title.rendered,
        link: postsResponse.data[i].link,
        author: authorResponse.data.name,
        thumbnail_medium:
          featuredImageResponse.data.media_details.sizes.medium.source_url,
        thumbnail_large: featuredImageResponse.data.media_details.sizes.large
          ? featuredImageResponse.data.media_details.sizes.large.source_url
          : featuredImageResponse.data.media_details.sizes.medium.source_url,
      })
    }
  }

  return response
}
