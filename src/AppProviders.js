import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, useHistory } from "react-router-dom";
import useStore from "store";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "styles/globalStyle";
import theme from "theme";

export default function AppProviders({ children }) {
  const history = useHistory();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: process.env.NODE_ENV === "production",
      },
    },
  });

  const isDarkTheme = useStore((state) => state.isDarkTheme);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Toaster position="top-center" />
      <ThemeProvider theme={theme(isDarkTheme)}>
        <GlobalStyle />
        <BrowserRouter history={history}>{children}</BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
