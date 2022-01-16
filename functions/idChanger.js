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
