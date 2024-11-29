import { useQuery } from 'react-query';
import axios from 'axios';

const fetchNews = async ({ page = 1, query = 'technology' }) => {
  const response = await axios.get(
    `https://newsapi.org/v2/everything?q=${query}&pageSize=12&page=${page}&apiKey=41e7a44e41ca4fcf8d61176c3977b176`
  );
  return response.data;
};

const useFetchNews = (page, query) => {
  return useQuery(['news', page, query], () => fetchNews({ page, query }), {
    keepPreviousData: true,
  });
};

export default useFetchNews;
