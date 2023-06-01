import { LazyImage } from "./components/LazyImage";

export const getLocation = ({ location: { street, ...rest } }) => {
  const myStreetName = street.name;
  const myStreetNumber = street.number;
  const myPostcode = rest.postcode;

  return (
    <>
      Address: {myStreetName + " " + myStreetNumber}
      <br></br>
      <br></br>
      Postcode: {myPostcode}
    </>
  );
};

export const getNames = (names) => {
  let formattedNames = [];
  if (names.name) {
    for (const [key, value] of Object.entries(names.name)) {
      if (Array.isArray(names)) {
        formattedNames += key + value;
      } else if (typeof yourVariable === 'object') {
        formattedNames += value;
      }
    }
    return formattedNames;
  } else {
    return "No name";
  }
};

export const getPicture = (todo) => {
  return <LazyImage src={todo.picture.large} alt={todo.picture.large} />;
};