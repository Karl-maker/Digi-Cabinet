import { useRouter } from "next/router";
import Head from "next/head";
import { fetchAPI } from "../../../api/connect";
import { createContext, useEffect, useState } from "react";
import getConfig from "../../../config/config";
import { MdVerified } from "react-icons/md";
import DotLoader from "react-spinners/DotLoader";

const config = getConfig();

const Student = () => {
  const router = useRouter();
  const { id } = router.query;

  const [student, setStudent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});

  useEffect(async () => {
    const results = await fetchAPI(`api/student/${id}`, { method: "get" })
      .then((results) => {
        return results;
      })
      .catch((error) => {
        setError(error);
      });

    if ((await results.status) !== 200) {
      setError(await results.json());
    } else {
      var res = await results.json();
      res.student.created_at = new Date(res.student.created_at);
      setStudent(res.student);
      setIsLoading(false);
    }
  }, []);

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
                <h3
                  style={{ marginRight: "0.8em" }}
                >{`${student.first_name} ${student.last_name}`}</h3>
              </div>
            </div>
            <hr></hr>
            <div>
              <div style={{ display: "flex" }}>
                <p
                  style={{ fontSize: "0.7em", marginRight: "1em" }}
                >{`House: ${student.house}`}</p>
                <p
                  style={{ fontSize: "0.7em", marginRight: "1em" }}
                >{`Profile Created: ${
                  student.created_at.getMonth() +
                  "/" +
                  student.created_at.getDate() +
                  "/" +
                  student.created_at.getFullYear()
                }`}</p>
              </div>
              {Object.keys(student.contact_info).map((key) => {
                return <p>{`${key}: ${student.contact_info[key]}`}</p>;
              })}
              <div className="container secondary">
                <h4>Guardian Information</h4>
                {student.guardian_info.map(
                  ({ name, number, email, relation }) => (
                    <div>
                      <p
                        style={{ fontSize: "1em" }}
                        key={relation}
                      >{`Relation: ${relation || "N/A"}`}</p>
                      <p style={{ fontSize: "1em" }} key={name}>{`Name: ${
                        name || "N/A"
                      }`}</p>
                      <p
                        style={{ fontSize: "1em" }}
                        key={number}
                      >{`Phone Number: ${number || "N/A"}`}</p>
                      <p style={{ fontSize: "1em" }} key={email}>{`Email: ${
                        email || "N/A"
                      }`}</p>
                      <hr></hr>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="container secondary">
              {student.info ? (
                <>
                  <h4>More Information</h4>
                  {Object.keys(student.info).map((key) => {
                    return <p>{`${key}: ${student.info[key]}`}</p>;
                  })}
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
                <DotLoader color="#ffff" loading={isLoading} size={100} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;
