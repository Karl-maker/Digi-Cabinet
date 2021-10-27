import { useRouter } from "next/router";
import Head from "next/head";
import { fetchAPI } from "../../../api/connect";
import { createContext, useEffect, useState } from "react";
import getConfig from "../../../config/config";
import { MdVerified } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader";
import DisplayUnknownObject from "../../../utils/tools/displayUnknownObject";
import DisplayUnknownArrayObject from "../../../utils/tools/displayUnknownArrayObject";
import { capitalizeFirstLetter } from "../../../utils/tools/characterManipulation";

const config = getConfig();

const Student = () => {
  const router = useRouter();
  const { id } = router.query;

  const [student, setStudent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});

  useEffect(async () => {
    if (!id) {
      return;
    }
    const results = await fetchAPI(`api/student/${id}`, {
      method: "get",
      header: { "Context-Type": "application/json" },
    })
      .then((results) => {
        return results;
      })
      .catch((error) => {
        setError(error);
      });

    if ((await results.status) !== 200) {
      setError(await results.json());
    } else {
      var response = await results.json();
      var res = response.results[0];
      res.created_at = new Date(res.created_at);
      setStudent(res);
      setIsLoading(false);
    }
  }, [id]);

  return (
    <div>
      <Head>
        <title>Digi Cabinet | Student</title>
      </Head>
      <div className="main-container">
        <h2>Student</h2>
        {!isLoading ? (
          <div className="container primary">
            <div className="institution-header">
              <img src={`${config.api.BASE_URL}${student.profile_picture}`} />
              <div>
                <h3 style={{ marginRight: "0.8em" }}>{`${capitalizeFirstLetter(
                  student.first_name
                )} ${capitalizeFirstLetter(student.last_name)}`}</h3>
              </div>
            </div>
            <hr></hr>
            <div>
              <ul style={{ display: "flex", marginLeft: "-2.5em" }}>
                <li
                  style={{ fontSize: "0.7em", marginRight: "1em" }}
                >{`House: ${student.house}`}</li>
                <li
                  style={{ fontSize: "0.7em", marginRight: "1em" }}
                >{`Profile Created: ${
                  student.created_at.getMonth() +
                  "/" +
                  student.created_at.getDate() +
                  "/" +
                  student.created_at.getFullYear()
                }`}</li>
              </ul>
              <DisplayUnknownObject object={student.contact_info} />
              <div className="container secondary">
                <h4>Guardian Information</h4>
                <DisplayUnknownArrayObject object={student.guardian_info} />
              </div>
            </div>
            <div className="container secondary">
              {student.info ? (
                <>
                  <h4>More Information</h4>
                  <DisplayUnknownObject object={student.info} />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <div>
            {error.message ? (
              <div className="container primary">
                <p>{error.message}</p>
              </div>
            ) : (
              <div
                style={{
                  margin: "0 auto",
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <ClipLoader color="#ffff" loading={isLoading} size={100} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;
