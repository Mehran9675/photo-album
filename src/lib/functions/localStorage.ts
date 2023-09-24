export const writeToLS = (key: string, data: any) => {
  const json = JSON.stringify(data);
  return localStorage.setItem(key, json);
};
export const readFromLS = (key: string) => {
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  return null;
};
