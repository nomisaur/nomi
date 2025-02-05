export const isFunction = (thing) => thing instanceof Function;

export const list = (num, arg = (a) => a) => {
  const func = isFunction(arg) ? arg : () => arg;
  return [...Array(num)].map((_, i) => func(i));
};

export const gcd = (a, b) => (b ? gcd(b, a % b) : a);
export const reduceFraction = ([a, b]) => {
  const reducer = gcd(a, b);
  return [a / reducer, b / reducer];
};

export const includeIf = (condition, item) =>
  condition && item != null ? [item] : [];

export const arrayToObject = (list, getKey) =>
  list.reduce((grow, feed) => ({ ...grow, [getKey(feed)]: feed }), {});

export const displayNumber = (num) => {
  const string = num.toFixed(1);
  const [whole, decimal] = string.split(".");
  return decimal === "0" ? whole : string;
};
