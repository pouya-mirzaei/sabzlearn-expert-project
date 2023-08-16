const getTopBarItems = async () => {
  let res = await fetch('http://localhost:4000/v1/menus/topbar');

  return await res.json();
};

const getAllCourses = async () => {
  const res = await fetch('http://localhost:4000/v1/courses');

  return await res.json();
};

export { getTopBarItems, getAllCourses };
