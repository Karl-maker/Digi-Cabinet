import getConfig from "../../config/config";
import Link from "next/link";
import { capitalizeEveryFirstLetter } from "../../utils/tools/characterManipulation";

const config = getConfig();

const ListInstitutionProfiles = ({ object, displayId }) => {
  return object.map((d) => (
    <Link href={`/institution/${d._id}`}>
      <li
        className="container primary list-profile"
        style={{ width: "90%", margin: "0", marginTop: "5%" }}
      >
        <div style={{ display: "flex" }}>
          <img src={`${config.api.BASE_URL}${d.school_logo} `} />
          <div className="info">
            <h4>{`${capitalizeEveryFirstLetter(d.name)}`}</h4>
          </div>
        </div>
      </li>
    </Link>
  ));
};

export default ListInstitutionProfiles;
