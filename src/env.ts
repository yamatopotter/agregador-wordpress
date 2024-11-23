import { z } from 'zod'

const blogSchema = z.object({
  posts: z.string(),
  api_url: z.string(),
  theme: z.string(),
})

const envSchema = z.object({
  BASE_URL: z.string().url(),
  BLOG_URL: z.array(blogSchema),
  BANNER_COLOR: z.string(),
  BANNER_LOGO: z.object({
    file: z.string(),
    alt: z.string(),
  }),
  COLUNAS: z.array(
    z.object({
      button_text: z.string(),
      url: z.string().url(),
    })
  ),
})

type envType = z.infer<typeof envSchema>

const blogUrlParsed = JSON.parse(import.meta.env.VITE_BLOG_URL)
const colunasProps = JSON.parse(import.meta.env.VITE_COLUNAS)
const bannerProps = JSON.parse(import.meta.env.VITE_BANNER_LOGO)

export const env: envType = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
  BLOG_URL: blogUrlParsed,
  BANNER_COLOR: import.meta.env.VITE_BANNER_COLOR,
  BANNER_LOGO: bannerProps,
  COLUNAS: colunasProps,
}
