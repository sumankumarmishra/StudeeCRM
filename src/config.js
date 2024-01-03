const token = localStorage.getItem("ieodkvToken");

export const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
