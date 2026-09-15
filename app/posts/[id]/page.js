import Image from "next/image"
import { getAllPostIds, getPostData } from '../../../lib/posts'
import Date from '../../../components/date'
import Layout from '../../../components/layout'

import postStyles from '../../../styles/post.module.css'
import utilStyles from '../../../styles/utils.module.css'

export function generateStaticParams() {
  return getAllPostIds().map(({ params }) => params)
}

export const dynamicParams = false

export async function generateMetadata({ params }) {
  const { id } = await params
  const postData = await getPostData(id)
  return {
    title: postData.title,
    description: postData.description,
    openGraph: {
      title: postData.title,
      description: postData.description,
      images: [postData.image],
    },
  }
}

const FIXED_WIDTH = 520;

export default async function Post({ params }) {
  const { id } = await params
  const postData = await getPostData(id)
  const correctionRatio = FIXED_WIDTH / postData.imageWidth;

  const embedSrc = postData.codepenEmbed
    ? `https://codepen.io/${postData.codepenEmbed}`
    : null

  return (
    <Layout>
      <article className={`${postStyles.article} ${postData.layout === 'stacked' ? postStyles.stacked : ''}`}>
        {embedSrc ? (
          <div className={postStyles.embedWrapper}>
            <iframe
              scrolling="no"
              title={postData.title}
              src={embedSrc}
              frameBorder="no"
              loading="lazy"
              allowTransparency="true"
              allowFullScreen="true"
            />
            {!!postData.codepenLink && <a href={postData.codepenLink} target="_blank" className={postStyles.externalLink}>View on CodePen ↗</a>}
          </div>
        ) : (
          <div>
            <Image
              src={postData.image}
              alt={`Preview of ${postData.title}`}
              width={FIXED_WIDTH}
              height={Math.floor(correctionRatio * postData.imageHeight)}
            />
            {!!postData.codepenLink && <a href={postData.codepenLink} target="_blank" className={postStyles.externalLink}>View on CodePen ↗</a>}
            {!!postData.githubLink && <a href={postData.githubLink} target="_blank" className={postStyles.externalLink}>View on GitHub ↗</a>}
            {!!postData.externalLink && <a href={postData.externalLink} target="_blank" className={postStyles.externalLink}>{postData.externalLinkText || 'View'} ↗</a>}
          </div>
        )}
        <div>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <br />
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </div>
      </article>
    </Layout>
  )
}
