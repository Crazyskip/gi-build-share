import useSWR from "swr";

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

export const useBuild = (userId, buildId) => {
  const { data, error } = useSWR(
    `/api/build?userId=${userId}&buildId=${buildId}`,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
