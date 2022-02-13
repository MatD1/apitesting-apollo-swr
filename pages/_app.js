import { ChakraProvider } from '@chakra-ui/react'
import { setContext } from '@apollo/client/link/context';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink
  } from "@apollo/client";

  const httpLink = createHttpLink({
    uri: 'http://localhost:1337/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    // sending authorization header with Bearer Token stored in environment variable
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}` || null,
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });




function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <ApolloProvider client={client}>
                <Component {...pageProps} />
            </ApolloProvider>
        </ChakraProvider>
    )
}

export default MyApp