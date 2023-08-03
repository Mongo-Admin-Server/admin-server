import instance from "./axios";

const getDatabase = async () => {
  const response = await instance.get('/database');
  return response.data;
};

export default getDatabase;