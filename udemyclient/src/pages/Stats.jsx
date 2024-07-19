import React from "react";
import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { QueryClient, useQuery } from "@tanstack/react-query";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  },
};

export const loader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(statsQuery);
  return data;
};

//  >>>>>>>> below was before video #186 <<<<<<<<<
// export const loader = async () => {
//   try {
//     const response = await customFetch.get("/jobs/stats");
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };
// <<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>

const Stats = () => {
  // >>>>>>> useLoaderData was removed at video #187 with addition of useQuery <<<<<<<<<<
  // const { defaultStats, monthlyApplications } = useLoaderData();

  const { data } = useQuery(statsQuery);
  const { defaultStats, monthlyApplications } = data;

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
