import { useQueryClient, useQuery } from "@tanstack/react-query";

const fetchData = () => [];

function AppRefetchQueries() {
  const {} = useQuery({
    queryKey: ["api"],
    queryFn: fetchData,

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
  return <div></div>;
}

const AppRefetchQueriesExample = () => {
  const queryClient = useQueryClient();

  //refetch all the queries that either match or start with the query key, ["api"], Query key
  queryClient.refetchQueries({ queryKey: ["api"] });

  //refetch all the queries that are currently active, Query type
  queryClient.refetchQueries({ type: "active" });

  //refetch all the queries whose staleTime has elapsed and are now considered stale, Whether the query is stale or fresh
  queryClient.refetchQueries({ stale: true });

  //refetch all the queries that are currently not fetching anything, fetchStatus
  queryClient.refetchQueries({ fetchStatus: "idle" });

  //all queries whose status is currently an error will refetch, A predicate function
  queryClient.refetchQueries({
    predicate: (query) => query.state.status === "error",
  });

  //send a combination of filters
  queryClient.refetchQueries({ queryKey: ["api"], stale: true });
};
