// import { useMutation } from "@tanstack/react-query";
// import React from "react";

// function AppUseMutationReturns() {
//   const { mutate, mutateAsync, data, error, reset, status, isPaused } =
//     useMutation({
//       mutationFn: async () => {},
//     });
//   return <div></div>;
// }

// import axios from "axios";
// import { useMutation } from "@tanstack/react-query";
// import { useState } from "react";

// const createUser = async (user) => {
//   return axios.post(`https://danieljcafonso.builtwithdark.com/name-api`, user);
// };

// const SimpleMutation = () => {
//   const [name, setName] = useState("");
//   const { mutate } = useMutation({
//     mutationFn: createUser,
//   });

//   const submitForm = (e) => {
//     e.preventDefault();
//     mutate({ name });
//   };

//   return (
//     <div>
//       <form>
//         <input
//           name='name'
//           type={"text"}
//           onChange={(e) => setName(e.target.value)}
//           value={name}
//         />
//         <button onClick={submitForm}>Add</button>
//       </form>
//     </div>
//   );
// };

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

// Define the actual createUser and registerUser functions
const createUser = (userData) => {
  // Perform mutation logic here
};

const registerUser = (userData) => {
  // Perform mutation logic here
};

const ConcurrentMutations = () => {
  const [name, setName] = useState("");
  const { mutateAsync: mutateAsyncOne } = useMutation({
    mutationFn: createUser,
  });
  const { mutateAsync: mutateAsyncTwo } = useMutation({
    mutationFn: registerUser,
  });

  const submitForm = async (e) => {
    e.preventDefault();
    const mutationOne = mutateAsyncOne({ name });
    const mutationTwo = mutateAsyncTwo({ name });
    try {
      const data = await Promise.all([mutationOne, mutationTwo]);
      // Handle the data from mutations
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        {" "}
        {/* Use onSubmit event for form submission */}
        <input
          name='name'
          type='text'
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};
