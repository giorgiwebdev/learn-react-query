// import { useMutation } from "@tanstack/react-query";
// import React from "react";

// function AppUseMutationReturns() {
//   const { mutate, mutateAsync, data, error, reset, status, isPaused } =
//     useMutation({
//       mutationFn: async () => {},
//     });
//   return <div></div>;
// }

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const createUser = async (user) => {
  return axios.post(`https://danieljcafonso.builtwithdark.com/name-api`, user);
};

const SimpleMutation = () => {
  const [name, setName] = useState("");
  const { mutate } = useMutation({
    mutationFn: createUser,
  });

  const submitForm = (e) => {
    e.preventDefault();
    mutate({ name });
  };

  return (
    <div>
      <form>
        <input
          name='name'
          type={"text"}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button onClick={submitForm}>Add</button>
      </form>
    </div>
  );
};
