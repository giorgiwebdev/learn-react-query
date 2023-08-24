import { useMutation } from "@tanstack/react-query";

const createUserFetch = async (user) => {
  return fetch(`https://danieljcafonso.builtwithdark.com/name-api`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

function AppUseMutationExample1() {
  const mutation = useMutation({
    mutationFn: createUserFetch,
  });
  return <div></div>;
}

// import axios from "axios";
// import { useMutation } from "@tanstack/react-query";

// const createUser = async (user) => {
//   return axios.post(`https://danieljcafonso.builtwithdark.com/name-api`, user);
// };

// function AppUseMutationExample2() {
//   const mutation = useMutation({
//     mutationFn: createUser,
//   });
//   return <div></div>;
// }

// import { useMutation } from "@tanstack/react-query";
// import { gql, GraphQLClient } from "graphql-request";
// const customMutation = gql`
//   mutation AddUser($user: String!, $age: Int!) {
//     insert_user(object: { user: $user, age: $age }) {
//       user
//       age
//     }
//   }
// `;
// const createUserGQL = async (user) => {
//   const endpoint = "endpoint here";
//   const client = new GraphQLClient(endpoint);
//   return client.request(customMutation, user);
//   return data;
// };

// function AppUseMutationExample3() {
//   const mutation = useMutation({
//     mutationFn: createUserGQL,
//   });

//   return <div></div>;
// }
