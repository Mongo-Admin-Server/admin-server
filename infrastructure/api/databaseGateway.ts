import instance from "../axios";

const getAllDatabase = async () => {
  const response = await instance.get('/database');
  return response.data;
};

export const api = { getAllDatabase };