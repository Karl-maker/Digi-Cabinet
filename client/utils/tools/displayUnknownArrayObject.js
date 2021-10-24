import DisplayUnknownObject from "./displayUnknownObject";

const DisplayUnknownArrayObject = ({ object, displayId }) => {
  return object.map((d) => (
    <ul className="container tertiary">
      <DisplayUnknownObject object={d} displayId={displayId} />
    </ul>
  ));
};

export default DisplayUnknownArrayObject;
