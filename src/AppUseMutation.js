// import axios from "axios";
// import { useMutation } from "@tanstack/react-query";

// const createUser = async (user) => {
//   return axios.post(`https://danieljcafonso.builtwithdark.com/name-api`, user);
// };

// function AppUseMutation() {
//   const mutation = useMutation({
//     mutationFn: createUser,
//   });
//   return <div></div>;
// }

import { useMutation } from "@tanstack/react-query";
import { gql, GraphQLClient } from "graphql-request";
const customMutation = gql`
  mutation AddUser($user: String!, $age: Int!) {
    insert_user(object: { user: $user, age: $age }) {
      user
      age
    }
  }
`;
const createUserGQL = async (user) => {
  const endpoint = "endpoint here";
  const client = new GraphQLClient(endpoint);
  return client.request(customMutation, user);
  return data;
};

function AppUseMutation() {
  const mutation = useMutation({
    mutationFn: createUserGQL,
  });

  return <div></div>;
}
