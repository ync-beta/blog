import type { NextPage, NextComponentType, NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient'
import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"
import AccessDenied from '../components/sys/access-denied'

import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'

type AppAuthProps = AppProps & {
  Component: NextComponentType<NextPageContext, any, {}> & {auth: boolean};
};

const App: NextPage<AppAuthProps> = ({ 
  Component, 
  pageProps: { session, ...pageProps },
}) => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={session} refetchInterval={0}>
        <ChakraProvider theme={theme}>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </ChakraProvider>
      </SessionProvider>
    </ApolloProvider>
  );
};

function Auth({ children }: any) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return children
}
export default App;
