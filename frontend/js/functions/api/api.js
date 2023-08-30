import { getCurretUserToken } from '../utilities.js';

const connectionTest = async () => {
  let res = await fetch('http://localhost:4000/v1/articles')
    .then((res) => true)
    .catch((err) => false);
  return res;
};

const getTopBarItems = async () => {
  let res = await fetch('http://localhost:4000/v1/menus/topbar');

  return await res.json();
};

const getAllCourses = async () => {
  const res = await fetch('http://localhost:4000/v1/courses');

  return await res.json();
};

const getPopularCourses = async () => {
  const res = await fetch('http://localhost:4000/v1/courses/popular');

  return await res.json();
};

const getPresellCourses = async () => {
  const res = await fetch('http://localhost:4000/v1/courses/presell');

  return await res.json();
};

const getAllArticles = async () => {
  let token = await getCurretUserToken();

  const res = await fetch('http://localhost:4000/v1/articles', {
    headers: {
      Authorazation: `Bearer ${token}`,
    },
  });

  return await res.json();
};

const getAllMenus = async () => {
  const res = await fetch('http://localhost:4000/v1/menus');
  return await res.json();
};

export {
  getTopBarItems,
  getAllCourses,
  getPopularCourses,
  getPresellCourses,
  getAllArticles,
  getAllMenus,
  connectionTest,
};
