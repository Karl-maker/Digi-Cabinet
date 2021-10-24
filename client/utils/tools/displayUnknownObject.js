import {
  capitalizeFirstLetter,
  replaceUnderScoreWithSpace,
} from "./characterManipulation";

const DisplayUnknownObject = ({ object, displayId }) => {
  return Object.keys(object).map((key) => {
    return (
      <>
        {key === "_id" && !displayId ? (
          <></>
        ) : (
          <li>{`${replaceUnderScoreWithSpace(capitalizeFirstLetter(key))}: ${
            object[key]
          }`}</li>
        )}
      </>
    );
  });
};

export default DisplayUnknownObject;
