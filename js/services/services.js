const postData = async (URL, data) => {
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: data,
  });
  return await res.json();
};
const getResource = async (url) => {
  return await axios.get(url);
};
export { postData, getResource };
