// 用到JSON.parse的地方最好try catch
export const getJson = (val: string | null) => {
  let obj = '';
  if (typeof val === 'string') {
    try {
      obj = JSON.parse(val);
    } catch (e) {
      console.error('非法JSON');
    }
  }
  return obj
};
export const getStorage = (key: string, defaultValue: any) => {
  const value = getJson(window.localStorage.getItem(key));
  return value === '' ? defaultValue : value;
};
export const setStorage = (key: string, value: any) => {
  return value === undefined
    ? window.localStorage.removeItem(key)
    : window.localStorage.setItem(key, JSON.stringify(value));
};
export const removeStorage = (key: string) => {
  return window.localStorage.removeItem(key);
};
