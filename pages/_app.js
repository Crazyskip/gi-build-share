import Layout from "../components/Layout";
import { createGlobalStyle } from "styled-components";
import { paleGrey, veryDarkNavy } from "../utils/colors";
import { ProvideAuth } from "../hooks/useAuth";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background-color: ${veryDarkNavy};
    color: ${paleGrey};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ProvideAuth>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProvideAuth>
    </>
  );
}

export default MyApp;
