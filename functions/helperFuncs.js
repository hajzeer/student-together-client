/** @format */

export const idChanger = (node1, node2) => {
  node1.forEach((element) => {
    for (let i = 0; i < node2.length; i++) {
      if (element.userId === node2[i]._id) {
        element.userId = node2[i].username;
      }
    }
  });
};

export const byDate = (a, b) => {
  let dateFirst = new Date(a.createdAt).getTime();
  let dateSecond = new Date(b.createdAt).getTime();
  return dateSecond - dateFirst;
};
