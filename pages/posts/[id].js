import Link from 'next/link';
import Head from 'next/head';

import { getAllPostIds, getPostData } from '../../lib/posts'
import Layout from '../../components/layout'
import Date from '../../components/Date'

import utilStyles from '../../styles/utils.module.css'

const Post = (props) => {
  return (
    <Layout>

      <Head>
        <title>{props.postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{props.postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={props.postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: props.postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export default Post

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id

  const postData = await getPostData(params.id)

  return {
    props: {
      postData
    }
  }
}