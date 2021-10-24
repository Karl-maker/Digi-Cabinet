import { useRouter } from "next/router";
import Head from "next/head";
import { fetchAPI } from "../../../api/connect";
import { createContext, useEffect, useState } from "react";
import getConfig from "../../../config/config";
import { MdVerified } from "react-icons/md";

const config = getConfig();

const Institution = () => {
  const router = useRouter();
  const { id } = router.query;

  const [institution, setInstitution] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    await fetchAPI(`api/institution/${id}`, { method: "get" })
      .then((results) => {
        console.log(results);
        results.institution.registered_date = new Date(
          results.institution.registered_date
        );
        setInstitution(results.institution);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  }, []);

  return (
    <div>
      <Head>
        <title>Digi Cabinet | Institution</title>
      </Head>
      <div className="main-container">
        <h2>Institution</h2>
        {!isLoading ? (
          <div className="container primary">
            <div className="institution-header">
              <img src={`${config.api.BASE_URL}${institution.school_logo}`} />
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <h3 style={{ marginRight: "0.8em" }}>{institution.name}</h3>
                  {institution.verified ? (
                    <MdVerified style={{ color: "#74b9ff" }} />
                  ) : (
                    <div></div>
                  )}
                </div>
                <p>{institution.description}</p>
              </div>
            </div>
            <hr></hr>
            <div>
              <p style={{ fontSize: "0.7em" }}>{`Id: ${id}`}</p>
              <div style={{ display: "flex" }}>
                <p
                  style={{ fontSize: "0.7em", marginRight: "1em" }}
                >{`Country: ${institution.country}`}</p>
                <p
                  style={{ fontSize: "0.7em", marginRight: "1em" }}
                >{`Type: ${institution.type}`}</p>
                <p
                  style={{ fontSize: "0.7em", marginRight: "1em" }}
                >{`Level: ${institution.level}`}</p>
                <p
                  style={{ fontSize: "0.7em", marginRight: "1em" }}
                >{`Profile Created: ${
                  institution.registered_date.getMonth() +
                  "/" +
                  institution.registered_date.getDate() +
                  "/" +
                  institution.registered_date.getFullYear()
                }`}</p>
              </div>
            </div>
            <div className="container secondary">
              <h5>More Info</h5>
              {Object.keys(institution.info).map((key) => {
                return <p>{`${key}: ${institution.info[key]}`}</p>;
              })}
            </div>
          </div>
        ) : (
          <div className="container primary">
            <h3>Nothing To Show Here :/</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Institution;
