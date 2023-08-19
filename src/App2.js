//To do manual refetching using QueryClient
//we need access to QueryClient, which is provided by
//the useQueryClient hook.
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchData = async ({ queryKey }) => {
  const { apiName } = queryKey[0];
  const response = await fetch(
    `https://danieljcafonso.builtwithdark.com/${apiName}`
  );

  if (!response.ok) throw new Error("Something failed in your request");

  return response.json();
};

const apiA = "react-query-api";
const apiB = "react-query-api-two";

// 1.We import our useQuery and useQueryClient custom hooks from the React Query package to use in our components that will be defined in the next few snippets
// 2.We create a fetchData function that will receive our QueryFunctionContext. We then destructure our queryKey from it. Inside this function, we do the following:
//  a)We will be using an object as our query key in these examples so that we know that the first position of the array will have our query key properties, so we destructure our apiName from it
//  b)We use fetch to trigger a GET request to our URL and use apiName to help define the route.
//  g)Because we are using fetch and not axios, we need to manually handle the scenario where our request failed. If our response is not OK, then we need to throw an error so that useQuery will be able to handle error scenarios.
//  d)If our response is valid, then we can return our response data.
// 3.We then create two API constant values called apiA and apiB that define the route our components will use.

const ComponentA = () => {
  const { data, error, isLoading, isError, isFetching } = useQuery({
    queryKey: [{ queryIdentifier: "api", apiName: apiA }],
    queryFn: fetchData,
    retry: 1,
  });

  if (isLoading) return <div> Loading data... </div>;

  if (isError)
    return (
      <div>
        {" "}
        Something went wrong... Here is the error:
        {error.message}
      </div>
    );

  return (
    <div>
      <p>{isFetching ? "Fetching Component A..." : data.hello} </p>
      <ComponentB />
    </div>
  );
};

// 1.We start by creating our query by using the useQuery hook:
//   a)This query is identified with an object as the query key. This object has api as the queryIdentifier property and apiA as the apiName property.
//   b)This query has the fetchData function as the query function.
//   g)By using the retry option, we also specify that if this query fails to fetch, then the hook will only retry the request one time.
//   d)We also destructure data, isLoading, isError, and isFetching from the hook.
// 2.If no query attempt has finished and there is still no cached data, we want to render to the user that we are loading data. We use isLoading with an If check to do this.
// 3.If there was an error, we want to display it. We use isError to check if there was any error. If so, we render that error.
// 4.If our query is not loading or has an error, then we can assume it was successful. We then render a div with the following:
//   a)A p tag that will check if our hook isFetching. If it is fetching, it will display Fetching Component A. If not, it will display the fetched data.
//   b)Our ComponentB.

const ComponentB = () => {
  const { data } = useQuery({
    queryKey: [{ queryIdentifier: "api", apiName: apiB }],
    queryFn: fetchData,
    onSuccess: (data) => console.log("Component B fetched data", data),
  });

  return (
    <div>
      <span>{data?.hello}</span>
      <ComponentC parentData={data} />
    </div>
  );
};

// 1.This query is identified with an object as the query key. This object has api as the queryIdentifier property and apiB as the apiName property.
//   a)This query has the fetchData function as the query function.
//   b)We use the onSuccess option and pass it a function that will receive our data and log it on our console, as well as an indication that this component has fetched the data.
//   g)We also destructure data from the hook.
// 2.Our ComponentC. This component will receive our ComponentB data as its parentData prop.

const ComponentC = ({ parentData }) => {
  const { data, isFetching } = useQuery({
    queryKey: [{ queryIdentifier: "api", apiName: apiA }],
    queryFn: fetchData,
    enabled: parentData !== undefined,
  });

  const queryClient = useQueryClient();

  return (
    <div>
      <p>{isFetching ? "Fetching Component C..." : data.hello} </p>
      <button
        onClick={() =>
          queryClient.refetchQueries({
            queryKey: [{ queryIdentifier: "api", apiName: apiA }],
          })
        }
      >
        Refetch Parent Data
      </button>
    </div>
  );
};

export default ComponentA;

// 1.We start by creating our query by using the useQuery hook:
//   a) This query is identified with an object as the query key. This object has api as the queryIdentifier property and apiA as the apiName property.
//   b)This query has the fetchData function as the query function.
//   g)We use the enabled option to make this query depend on parentData; therefore, this query will only run after the query in ComponentB finishes and resolves data.
//   d)We destructure data and isFetching from the hook.
// 2.We use the useQueryClient hook to get access to our QueryClient.
// 3.Finally, we return a div that will be rendered with the following:
//   a) A p tag that will check if our hook isFetching. If it is fetching, it displays Fetching Component C. If not, it displays the fetched data.
//   b)A button that, when clicked, will use queryClient to refetch the query whose query key has api as the queryIdentifier property and apiA as the apiName property. This means that on this button click, both useQuery in ComponentA and useQuery in ComponentC will refetch some data.
// 4.Also, in the preceding snippet, we do a default export of our ComponentA, so it is the entry point in this file.

// >>> let’s review the life cycle of the hooks and understand what is happening in the background:
// 1.When ComponentA renders, the following occurs
//   1.1.An instance of useQuery with the [{ queryIdentifier: "api", apiName: apiA }] query key mounts:
//       a) Since this is the first mount, there is no cache nor previous requests, so our query will start fetching our data, and its status will be loading. Also, our query function will receive our query key as part of QueryFunctionContext.
//       b)When our data fetching succeeds, the data will be cached under the [{ queryIdentifier: "api", apiName: apiA }] query key.
//       g)Since we are assuming the default staleTime, which is 0, the hook will mark its data as stale.
// 2.When ComponentA renders ComponentB, the following occurs:
//    2.1.An instance of useQuery with the [{ queryIdentifier: "api", apiName: apiB }] query key mounts:
//       a)Since this is the first mount, there is no cache nor previous requests, so our query will start fetching our data, and its status will be loading. Also, our query function will receive our query key as part of QueryFunctionContext.
//       b)When our data fetching succeeds, the data will be cached under the [{ queryIdentifier: "api", apiName: apiB }] query key and the hook will call the onSuccess function.
//       g)Since we are assuming the default staleTime, which is 0, the hook will mark its data as stale.
// 3.When ComponentB renders ComponentC, the following occurs:
//     3.1.An instance of useQuery with the [{ queryIdentifier: "api", apiName: apiA }] query key mounts:
//       a)As this hook has the same query key as the hook in ComponentA, the hook will already have cached data under it, so the data is immediately accessible.
//       b)Since this query was marked as stale after the previous fetch, this hook needs to refetch it, but it needs to wait for the query to be enabled first since this query depends on us having the data of ComponentB first.
//       g)Once it’s been enabled, the query will trigger a refetch. This makes isFetching on both ComponentA and ComponentC to be true.
//       d)Once the fetch request succeeds, the data will be cached under the [{ queryIdentifier: "api", apiName: apiA }] query key, and the query is marked as stale again.
// 4.Now, considering it is the parent component, let’s picture a scenario where ComponentA unmounts:
//     a)Since there is no longer any instance of the query with the [{ queryIdentifier: "api", apiName: apiA }] query key active, the default cache timeout of 5 minutes is set
//     b)Once 5 minutes pass, the data under this query is deleted and garbage collected
//     g)Since there is no longer any instance of the query with the [{ queryIdentifier: "api", apiName: apiB }] query key active, the default cache timeout of 5 minutes is set
//     d)Once 5 minutes pass, the data under this query is deleted and garbage collected
