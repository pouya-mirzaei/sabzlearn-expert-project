const getTopBarItems = async () => {
  let res = await fetch('http://localhost:4000/v1/menus/topbar');

  return await res.json();
};

export { getTopBarItems };
