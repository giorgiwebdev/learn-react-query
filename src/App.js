import logo from "./logo.svg";
import React from "react";
import "./App.css";
import {
  QueryClient,
  QueryCache,
  MutationCache,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  // floating mode
  ReactQueryDevtools,
  //embeded mode
  // ReactQueryDevtoolsPanel
} from "@tanstack/react-query-devtools";

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import("@tanstack/react-query-devtools/build/lib/index.prod.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);

const queryCache = new QueryCache({
  onError: (error) => {
    //do something on error
  },
  onSuccess: (data) => {
    //do something on success
  },
});

const mutationCache = new MutationCache({
  onError: (error) => {
    //do something on error
  },
  onSuccess: (data) => {
    //do something on success
  },
  onMutate: (newData) => {
    //do something behore the mutation
  },
});

const logger = {
  log: (...args) => {
    // here you call your custom log function
  },
  warn: (...args) => {
    // here you call your custom warn function
  },
  error: (...args) => {
    // here you call your custom error function
  },
};

const defaultOptions = {
  queries: {
    staleTime: Infinity,
  },
};

const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  logger,
  defaultOptions,
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* floating mode */}
      <ReactQueryDevtools initialIsOpen={false} />
      {/* embeded mode */}
      {/* <ReactQueryDevtoolsPanel /> */}
      some component
    </QueryClientProvider>
  );
}

export default App;
