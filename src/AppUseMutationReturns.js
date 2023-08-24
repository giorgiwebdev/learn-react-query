import { useMutation } from "@tanstack/react-query";
import React from "react";

function AppUseMutationReturns() {
  const { mutate, mutateAsync, data, error, reset, status, isPaused } =
    useMutation({
      mutationFn: async () => {},
    });
  return <div></div>;
}
