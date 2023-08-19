import logo from "./logo.svg";
import React from "react";
import "./App.css";
import {
  QueryClient,
  useQueryClient,
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
  const fetchDependentData = () => dependentData;
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

  //Manual refetching using QueryClient
  const queryClientHook = useQueryClient(); //Using the useQueryClient hook to get access to our QueryClient.
  queryClientHook.refetchQueries({ queryKey: ["api"] }); //we are triggering a request for all queries that have the ["api"] query key.

  //Manual refetching using refetch function
  const { refetch } = useQuery({
    queryKey: ["api"],
    queryFn: fetchData,
  });
  //This function will allow you to trigger a refetch for just that query.
  ////we can call that function whenever we want to force that query to refetch.
  refetch();

  //Fetching dependent queries with useQuery, enabled option.
  const { data: firstQueryData } = useQuery({
    queryKey: ["api"],
    queryFn: fetchData,
  });

  //check if our previous query has the data we need.
  //This Boolean variable will help us decide if our next query can fetch
  const canThisDependentQueryFetch = firstQueryData?.hello !== undefined;

  //When the previous query finishes fetching the data,
  //the canThisDependentQueryFetch Boolean will be set to true
  //and enable this dependent query to run.
  const { data: dependentData } = useQuery({
    queryKey: ["dependentApi", firstQueryData?.hello],
    queryFn: fetchDependentData,
    enabled: canThisDependentQueryFetch, //React Query allows you to make a query depend on others via the enabled option.
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
