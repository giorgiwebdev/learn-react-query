import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const createUser = async (user) => {
  return axios.post(`https://danieljcafonso.builtwithdark.com/name-api`, user);
};

function AppUseMutation() {
  const mutation = useMutation({
    mutationFn: createUser,
  });
  return <div></div>;
}
