/* eslint-disable consistent-return */
import axiosInstance, { endpoints } from 'src/utils/axios';

export const getPublications = async () => {
  try {
    const res = await axiosInstance.get(endpoints.publication.list);

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export type PublicationName = {
  path: string;
  title: string;
};

export const getPublicationNameList = async () => {
  try {
    const res = await axiosInstance.get(endpoints.publication.nameList);

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
