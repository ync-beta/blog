import App from '../components/App'
import InfoBox from '../components/InfoBox'
import Header from '../components/Header'
import Submit from '../components/Submit'
import UserList from '../components/UserList'
import { initializeApollo, addApolloState } from '../lib/apolloClient'
import { UsersDocument } from '../types/graphql_generated'
import { DEFAULT_PAGE_TAKE } from '../types/app_types'  

const SSRPage = () => (
  <App>
    <Header />
    <InfoBox>ℹ️ This page shows how to use SSR with Apollo.</InfoBox>
    <Submit />
    <UserList />
  </App>
)

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: UsersDocument,
    variables: { take: DEFAULT_PAGE_TAKE },
  })

  return addApolloState(apolloClient, {
    props: {},
  })
}

export default SSRPage
