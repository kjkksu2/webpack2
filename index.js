const user = {
  name: "nico",
  age: 24,
  password: 12345,
};

const setCountry = ({ country = "KR", ...rest }) => ({ country, ...rest });
console.log(setCountry(user));
