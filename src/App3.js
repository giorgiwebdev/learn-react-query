import { useQuery } from "@tanstack/react-query";

const fetchData = () => [];

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
