import React from "react";
import axios from "axios";
import { useQuery, useQueries, useQueryClient } from "@tanstack/react-query";

// //Fetching a Book (Data)
// //Shelf (Cache) and Book (Data)
// //Invalidation is Like Marking a Book Old
// //Invalidate Queries Like Taking the Old Book Off
// //Updating the Book (Refetching)
// //New Book (Fresh Data) on the Shelf (Cache)
// const QueryInvalidation = () => {
//   const { data } = useQuery({
//     queryKey: [{ queryIdentifier: "api", username: "userOne" }],
//     queryFn: fetchData,
//   });
//   const queryClient = useQueryClient();
//   return (
//     <div>
//       <p>{data?.hello}</p>
//       <button
//         onClick={() =>
//           queryClient.invalidateQueries({
//             queryKey: [{ queryIdentifier: "api" }],
//           })
//         }
//       >
//         Invalidate Query
//       </button>
//     </div>
//   );
// };

// //prefetching
// const ExamplePrefetching = () => {
//   const [renderComponent, setRenderComponent] = React.useState(false);
//   const queryClient = useQueryClient();
//   const prefetchData = async () => {
//     await queryClient.prefetchQuery({
//       queryKey: [{ queryIdentifier: "api", username: "userOne" }],
//       queryFn: fetchData,
//       staleTime: 60000,
//     });
//   };
//   return (
//     <div>
//       <button
//         onMouseEnter={prefetchData}
//         onClick={() => setRenderComponent(true)}
//       >
//         {" "}
//         Render Component{" "}
//       </button>
//       {renderComponent ? <PrefetchedDataComponent /> : null}
//     </div>
//   );
// };

// const PrefetchedDataComponent = () => {
//   const { data } = useQuery({
//     queryKey: [{ queryIdentifier: "api", username: "userOne" }],
//     queryFn: fetchData,
//   });
//   return <div>{data?.hello}</div>;
// };
// //flow the above code :
// // 1.ExamplePrefetching is rendered.
// // 2.The user will see a button saying Render Component.
// // 3.The user puts their mouse over the button to click on it. At this time, we predict that the user will click on the button, so we trigger the data prefetching. Once the data has been prefetched, it is cached under the [{ queryIdentifier: "api", username: "userOne" }] query key.
// // 4.The user clicks on the button.
// // 5.PrefetchedDataComponent is rendered.
// // 6.The useQuery hook that is identified by the [{ queryIdentifier: "api", username: "userOne" }] query key will already have the data cached and marked as fresh for one minute, so it doesn’t need to trigger data-fetching.
// // 7.The user sees the prefetched data rendered.

// //how we can leverage AbortSignal with axios
// const fetchDataSecondFunction = async ({ queryKey, signal }) => {
//   const { username } = queryKey[0];
//   const { data } = await axios.get(
//     `https://danieljcafonso.builtwithdark.com/
//       react-query-api/${username}`,
//     { signal }
//   );
//   return data;
// };

// //how we can leverage AbortSignal with fetch
// const fetchDataWithFetch = async ({ queryKey, signal }) => {
//   const { username } = queryKey[0];
//   const response = await fetch(
//     `https://danieljcafonso.builtwithdark.com/
//       react-query-api/${username}`,
//     { signal }
//   );
//   if (!response.ok) throw new Error("Something failed in your request");
//   return response.json();
// };

// //how we can leverage AbortSignal with graphql-request
// // const fetchGQL = async ({signal}) => {
// //   const endpoint = <Add_Endpoint_here>;
// //   const client = new GraphQLClient(endpoint)
// //   const {
// //     posts: { data },
// //   } = await client.request({document: customQuery, signal});
// //   return data;
// // };

// //manual cancelation of data fetching after passing the signal to our clients
// queryClient.cancelQueries({ queryKey: ["api"] });

// //automatic cancelation of data fetching after passing the signal to our clients
// const fetchDataThree = async ({ queryKey, signal }) => {
//   const { username } = queryKey[0];
//   const { data } = await axios.get(
//     `https://danieljcafonso.builtwithdark.com/
//       react-query-api/${username}`,
//     { signal }
//   );
//   return data;
// };

// const ExampleQueryCancelation = () => {
//   const [renderComponent, setRenderComponent] = React.useState(false);
//   return (
//     <div>
//       <button onClick={() => setRenderComponent(!renderComponent)}>
//         Render Component
//       </button>
//       {renderComponent ? <QueryCancelation /> : null}
//     </div>
//   );
// };

// const QueryCancelation = () => {
//   const { data } = useQuery({
//     queryKey: [{ queryIdentifier: "api", username: "userOne" }],
//     queryFn: fetchData,
//   });
//   const queryClient = useQueryClient();
//   return (
//     <div>
//       <p>{data?.hello}</p>
//       <button
//         onClick={() =>
//           queryClient.cancelQueries({
//             queryKey: [{ queryIdentifier: "api" }],
//           })
//         }
//       >
//         Cancel Query
//       </button>
//     </div>
//   );
// };

//
const fetchData = async ({ queryKey }) => {
  const { page } = queryKey[0];
  const { data } = await axios.get(
    `https://danieljcafonso.builtwithdark.com/
      react-query-paginated?page=${page}&results=10`
  );
  return data;
};

const PaginatedQuery = () => {
  const [page, setPage] = React.useState(0);
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery({
      queryKey: [{ queryIdentifier: "api", page }],
      queryFn: fetchData,
      keepPreviousData: true,
    });
  if (isLoading) {
    return <h2>Loading initial data...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <div>
        {data.results.map((user) => (
          <div key={user.email}>
            {user.name.first}
            {user.name.last}
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() =>
            setPage((oldValue) => (oldValue === 0 ? 0 : oldValue - 1))
          }
          disabled={page === 0}
        >
          Previous Page
        </button>
        <button
          disabled={isPreviousData}
          onClick={() => {
            if (!isPreviousData) setPage((old) => old + 1);
          }}
        >
          Next Page
        </button>
      </div>
      {isFetching ? <span> Loading...</span> : null}
    </>
  );
};
