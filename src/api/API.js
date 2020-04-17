import axios from 'axios';

// Your web app's Firebase configuration
var apiUrl = process.env.REACT_APP_API_URL;

export const getCourses = (pagesize, source) => {
  return axios.get(
    apiUrl + '/courses?pagesize=' + pagesize + '&source=' + source
  );
};

export const getCoursesAfter = async (pagesize, source, cursor) => {
  return await axios.get(
    apiUrl +
      '/courses?pagesize=' +
      pagesize +
      '&cursor=' +
      cursor +
      '&source=' +
      source
  );
};
