import logo from "./logo.svg";
import React from "react";
import "./App.css";
import {
  QueryClient,
  QueryCache,
  MutationCache,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import {
  // floating mode
  ReactQueryDevtools,
  //embeded mode
  // ReactQueryDevtoolsPanel
} from "@tanstack/react-query-devtools";

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
  const fetchData = () => data;
  const arrayVariable = [];

  const {
    data,
    error,
    status,
    isLoading,
    isSuccess,
    isError,
    fetchStatus,
    isFetching,
    isPaused,
  } = useQuery({
    queryKey: ["api"],
    queryFn: fetchData,
    staleTime: 60000, //default : 0
    cacheTime: 60000, //default: 5 minutes
    retry: false, //default: queries that are failing will be retried three times.
    retryDelay: (attempt) => attempt * 2000, //default : an exponential backoff delay algorithm
    enabled: arrayVariable.length > 0, //default: true
    onSuccess: (data) => console.log("query was successful", data),
    onError: (error) => console.log("query was unsuccessful", error.message),
  });

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
