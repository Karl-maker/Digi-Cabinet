import getConfig from "../../config/config";
import Link from "next/link";

const config = getConfig();

const ListStudentProfiles = ({ object, displayId }) => {
  return object.map((d) => (
    <Link href={`/student/${d._id}`}>
      <li
        className="container primary list-profile"
        style={{ width: "90%", margin: "0", marginTop: "5%" }}
      >
        <div style={{ display: "flex" }}>
          <img src={`${config.api.BASE_URL}${d.profile_picture} `} />
          <div className="info">
            <h4>{`${d.first_name} ${d.last_name}`}</h4>
          </div>
        </div>
      </li>
    </Link>
  ));
};

export default ListStudentProfiles;
