import useSWR, { useSWRConfig } from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    const response = await res.json();
    error.info = response.error.message;
    error.status = res.status;
    throw error;
  }
  const data = await res.json();
  return data;
};

export const useBuilds = (userId) => {
  const { data, error } = useSWR(`/api/builds?userId=${userId}`, fetcher);
  const { mutate } = useSWRConfig();

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};
