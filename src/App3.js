import React from "react";
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

//prefetching
const ExamplePrefetching = () => {
  const [renderComponent, setRenderComponent] = React.useState(false);
  const queryClient = useQueryClient();
  const prefetchData = async () => {
    await queryClient.prefetchQuery({
      queryKey: [{ queryIdentifier: "api", username: "userOne" }],
      queryFn: fetchData,
      staleTime: 60000,
    });
  };
  return (
    <div>
      <button
        onMouseEnter={prefetchData}
        onClick={() => setRenderComponent(true)}
      >
        {" "}
        Render Component{" "}
      </button>
      {renderComponent ? <PrefetchedDataComponent /> : null}
    </div>
  );
};

const PrefetchedDataComponent = () => {
  const { data } = useQuery({
    queryKey: [{ queryIdentifier: "api", username: "userOne" }],
    queryFn: fetchData,
  });
  return <div>{data?.hello}</div>;
};
//flow the above code :
// 1.ExamplePrefetching is rendered.
// 2.The user will see a button saying Render Component.
// 3.The user puts their mouse over the button to click on it. At this time, we predict that the user will click on the button, so we trigger the data prefetching. Once the data has been prefetched, it is cached under the [{ queryIdentifier: "api", username: "userOne" }] query key.
// 4.The user clicks on the button.
// 5.PrefetchedDataComponent is rendered.
// 6.The useQuery hook that is identified by the [{ queryIdentifier: "api", username: "userOne" }] query key will already have the data cached and marked as fresh for one minute, so it doesn’t need to trigger data-fetching.
// 7.The user sees the prefetched data rendered.

//how we can leverage AbortSignal with axios
const fetchDataSecondFunction = async ({ queryKey, signal }) => {
  const { username } = queryKey[0];
  const { data } = await axios.get(
    `https://danieljcafonso.builtwithdark.com/
      react-query-api/${username}`,
    { signal }
  );
  return data;
};

//how we can leverage AbortSignal with fetch
const fetchDataWithFetch = async ({ queryKey, signal }) => {
  const { username } = queryKey[0];
  const response = await fetch(
    `https://danieljcafonso.builtwithdark.com/
      react-query-api/${username}`,
    { signal }
  );
  if (!response.ok) throw new Error("Something failed in your request");
  return response.json();
};
