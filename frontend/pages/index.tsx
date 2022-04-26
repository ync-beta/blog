import { useState, useEffect } from "react";
import { GetStaticPropsContext } from "next";
import { initializeApollo, addApolloState } from '../lib/apolloClient'
import { DEFAULT_PAGE_TAKE } from '../types/app_types'  
import { PostsDocument, usePostsLazyQuery, Post } from '../types/graphql_generated'
import { NetworkStatus } from "@apollo/client"; 
import InfoBox from '../components/etc/InfoBox'
import ErrorMessage from '../components/etc/error-message'
import Layout from "../components/sys/Layout"
import PostList from "../components/post/List";
import Search from "../components/post/SearchPosts";

export default function Home(){
  const [searchString, setSearchString] = useState<string>('')

  const handleSearchstring = (e: any) => {
    setSearchString(e.target.value)
  }
  useEffect(() => {
    loadPosts({variables: { searchString, take: DEFAULT_PAGE_TAKE}})
  }, [searchString])

  const [loadPosts, { loading, error, data, networkStatus, fetchMore }] = usePostsLazyQuery({
      variables: {
      take: DEFAULT_PAGE_TAKE,
      after: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  const loadingMore = networkStatus === NetworkStatus.fetchMore
  if (error) return <ErrorMessage message="Error loading posts." />
  if (!data) return <div>Loading</div>

  const {pageInfo, edges} = data?.posts!
  const posts = edges.map((edge) => (edge.node as Post)) || [];
    
  const loadMore = () => {
    fetchMore({
      variables: {
        after: pageInfo.endCursor
      },
    })
  }
  return (
    <Layout>
        <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
        <Search handleSearchstring={handleSearchstring} 
              searchString={searchString} />
        {posts &&
          <PostList posts={posts} loadMore={loadMore} loadingMore={loadingMore} 
                  {...pageInfo} />}
    </Layout>
  )    
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: PostsDocument,
    variables: {
      take: DEFAULT_PAGE_TAKE,
      after: null,
    }
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 10,
  });
}

