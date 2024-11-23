import { getBlogData } from '@/api/get-blog-data.ts'
import { Container } from '@/components/ui/container.tsx'
import { env } from '@/env.ts'
import { useQuery } from '@tanstack/react-query'

function App() {
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: getBlogData,
    staleTime: 1000 * 60,
  })

  if (!data) return null

  const destaque = data.slice(0, 2)
  const noticias = data.slice(2, 8)
  const bgColor = env.BANNER_COLOR.toLowerCase()
  const logoProps = env.BANNER_LOGO
  const linkButtonsProps = env.COLUNAS

  return (
    <>
      <div
        className={`flex items-center justify-center gap-6 py-12 mb-12 bg-[${bgColor}] font-montserrat`}
      >
        <img src={logoProps.file} alt={logoProps.alt} />
      </div>
      <Container className={'items-center font-montserrat'}>
        <div className={'flex flex-wrap gap-6'} id={'latest'}>
          {destaque.map(post => {
            return (
              <article className={'flex flex-row gap-6 w-full'} key={post.link}>
                <img
                  src={post.thumbnail_large}
                  alt={'post-thumbnail'}
                  className={'max-w-xl'}
                />
                <div className={'flex flex-col gap-6 justify-center w-full'}>
                  <h1 className={'text-4xl'}>
                    <a href={post.link} target={'_blank'} rel={'noreferrer'}>
                      {post.title}
                    </a>
                  </h1>
                  <hr />
                  <span className={'text-right'}>{post.author}</span>
                </div>
              </article>
            )
          })}
        </div>

        <div
          className={
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6'
          }
        >
          {noticias.map(post => {
            return (
              <article
                className={'flex flex-col gap-6 justify-between'}
                key={post.link}
              >
                <img
                  src={post.thumbnail_medium}
                  alt={'post-thumbnail'}
                  className={'max-w-xl'}
                />
                <div className={'flex flex-col gap-6 justify-center w-full'}>
                  <h1 className={'text-4xl'}>
                    <a href={post.link} target={'_blank'} rel={'noreferrer'}>
                      {post.title}
                    </a>
                  </h1>
                  <hr />
                  <span className={'text-right'}>{post.author}</span>
                </div>
              </article>
            )
          })}
        </div>

        <div className={'mt-12 flex justify-between gap-6'}>
          {linkButtonsProps.map(item => {
            return (
              <a
                className={
                  'p-6 bg-white uppercase shadow-md hover:shadow-lg animate duration-300 ease-in-out border-2 border-zinc-50'
                }
                href={item.url}
                target={'_blank'}
                rel={'noreferrer'}
                key={item.url}
              >
                {item.button_text}
              </a>
            )
          })}
        </div>

        <img
          src={'https://placehold.co/720x90'}
          className={'mx-auto my-12'}
          alt={'Logo'}
        />
      </Container>
    </>
  )
}

export default App
