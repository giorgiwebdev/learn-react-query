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

    //options related to data refetching
    refetchOnMount: "always", // refetch even if the cached data is not stale (whenever any component using it mounts)
    refetchOnReconnect: true, // refetch only if our data is stale(not fresh) (after regain connection after being offlin)
    refetchOnWindowFocus: false, // never refetch (on window focus)

    //force our hook to refetch
    refetchInterval: 2000, //refetch every 2 seconds
    refetchIntervalInBackground: true, //keep refetching, even if your window or tab is in the background. ( "Keep checking for updates, even if you're not looking at the weather.")
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
