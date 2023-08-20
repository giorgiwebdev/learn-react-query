import { useQuery, useQueries, useQueryClient } from "@tanstack/react-query";

const fetchData = () => [];

//Manual parallel queries
const ExampleOne = () => {
  const { data: queryOneData } = useQuery({
    queryKey: [{ queryIdentifier: "api", username: "userOne" }],
    queryFn: fetchData,
  });
  const { data: queryTwoData } = useQuery({
    queryKey: [{ queryIdentifier: "api", username: "userTwo" }],
    queryFn: fetchData,
  });
  const { data: queryThreeData } = useQuery({
    queryKey: [{ queryIdentifier: "api", username: "userThree" }],
    queryFn: fetchData,
  });
  return (
    <div>
      <p>{queryOneData?.hello}</p>
      <p>{queryTwoData?.hello}</p>
      <p>{queryThreeData?.hello}</p>
    </div>
  );
};

//Dynamic parallel queries
const usernameList = ["userOne", "userTwo", "userThree"];

const ExampleTwo = () => {
  const multipleQueries = useQueries({
    queries: usernameList.map((username) => {
      return {
        queryKey: [{ queryIdentifier: "api", username }],
        queryFn: fetchData,
      };
    }),
  });
  return (
    <div>
      {multipleQueries.map(({ data, isFetching }) => (
        <p>{isFetching ? "Fetching data..." : data.hello}</p>
      ))}
    </div>
  );
};

const ExampleThree = () => {
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

//Fetching a Book (Data)
//Shelf (Cache) and Book (Data)
//Invalidation is Like Marking a Book Old
//Invalidate Queries Like Taking the Old Book Off
//Updating the Book (Refetching)
//New Book (Fresh Data) on the Shelf (Cache)
const QueryInvalidation = () => {
  const { data } = useQuery({
    queryKey: [{ queryIdentifier: "api", username: "userOne" }],
    queryFn: fetchData,
  });
  const queryClient = useQueryClient();
  return (
    <div>
      <p>{data?.hello}</p>
      <button
        onClick={() =>
          queryClient.invalidateQueries({
            queryKey: [{ queryIdentifier: "api" }],
          })
        }
      >
        Invalidate Query
      </button>
    </div>
  );
};
