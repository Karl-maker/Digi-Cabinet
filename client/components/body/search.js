import { useState } from "react";
import { useMachine } from "@xstate/react";
import { searchTargetMachine } from "../state-machines/searchTargetMachine";
import { searchQueryMachine } from "../state-machines/searchQueryMachine";
import { fetchAPI } from "../../api/connect";
import ListUserProfiles from "../user/listUserProfiles";
import ListInstitutionProfiles from "../institution/listInstitutionProfiles";
import ListStudentProfiles from "../student/listStudentProfiles";
import {
  capitalizeFirstLetter,
  replaceUnderScoreWithSpace,
} from "../../utils/tools/characterManipulation";
import {
  FaSchool,
  FaUserAlt,
  FaUserGraduate,
  FaAddressCard,
  FaQuestion,
} from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";

const LIST_STYLE = {
  marginRight: "2em",
  fontSize: "0.8em",
};

const LIST_DISABLE = {
  opacity: 0.2,
  ...LIST_STYLE,
};

export default () => {
  const [searchField, setSearchField] = useState("");
  const [studentList, setStudentList] = useState();
  const [instituteList, setInstituteList] = useState();
  const [userList, setUserList] = useState();
  const [targetState, targetSend] = useMachine(searchTargetMachine);
  const [queryState, querySend] = useMachine(searchQueryMachine);
  const PAGESIZE = 10;
  const PAGENUMBER = 0;

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const fetchSearch = async () => {
    var query;
    if (targetState.value === "institutions") {
      if (queryState.value === "by_id") {
        query = `api/institution/${searchField}`;
      } else {
        query = `api/institutions?page_size=${PAGESIZE}&page_number=${PAGENUMBER}&q=${searchField}`;
      }

      setInstituteList(await getData(query));
    } else if (targetState.value === "students") {
      if (queryState.value === "by_id") {
        query = `api/student/${searchField}`;
      } else {
        query = `api/students?page_size=${PAGESIZE}&page_number=${PAGENUMBER}&q=${searchField}`;
      }

      setStudentList(await getData(query));
    } else if (targetState.value === "users") {
      if (queryState.value === "by_id") {
        query = `api/user/${searchField}`;
      } else {
        query = `api/users?page_size=${PAGESIZE}&page_number=${PAGENUMBER}&q=${searchField}`;
      }

      setUserList(await getData(query));
    }
  };

  const getData = async (query) => {
    return await fetchAPI(query, {
      method: "get",
      header: { "Content-Type": "application/json" },
      body: null,
    })
      .then(async (results) => {
        const res = await results.json();
        return res.results;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  };

  const searchList = () => {
    return (
      <>
        {userList && targetState.value === "users" ? (
          <ul className="scroll-list">
            <ListUserProfiles object={userList} />
          </ul>
        ) : (
          <></>
        )}
        {studentList && targetState.value === "students" ? (
          <ul className="scroll-list">
            <ListStudentProfiles object={studentList} />
          </ul>
        ) : (
          <></>
        )}
        {instituteList && targetState.value === "institutions" ? (
          <ul className="scroll-list">
            <ListInstitutionProfiles object={instituteList} />
          </ul>
        ) : (
          <></>
        )}
      </>
    );
  };

  function selectionField() {
    return (
      <nav>
        <ul style={{ display: "flex" }}>
          {targetState.value === "institutions" ? (
            <li style={LIST_DISABLE}>
              <FaSchool />
            </li>
          ) : (
            <li
              onClick={() => {
                targetSend("INSTITUTIONS");
              }}
              style={LIST_STYLE}
            >
              <FaSchool />
            </li>
          )}
          {targetState.value === "students" ? (
            <li style={LIST_DISABLE}>
              <FaUserGraduate />
            </li>
          ) : (
            <li
              onClick={() => {
                targetSend("STUDENTS");
              }}
              style={LIST_STYLE}
            >
              <FaUserGraduate />
            </li>
          )}
          {targetState.value === "users" ? (
            <li style={LIST_DISABLE}>
              <FaUserAlt />
            </li>
          ) : (
            <li
              onClick={() => {
                targetSend("USERS");
              }}
              style={LIST_STYLE}
            >
              <FaUserAlt />
            </li>
          )}
        </ul>
      </nav>
    );
  }

  return (
    <div>
      <h1>Search Digi Cabinet</h1>
      <div className="search">
        <div style={{ display: "flex" }}>
          <input
            className="searchbar"
            value={searchField}
            type="search"
            placeholder={`search ${
              targetState.value
            } ${replaceUnderScoreWithSpace(queryState.value)}...`}
            onChange={(e) => {
              {
                handleChange(e);
                fetchSearch();
              }
            }}
          />
          <div
            className="toggle"
            onClick={() => {
              querySend("TOGGLE");
            }}
            style={{ fontSize: "0.8em", color: "white" }}
          >
            {queryState.value === "by_id" ? <FaAddressCard /> : <FaQuestion />}
          </div>
        </div>
        {selectionField()}
        {searchList()}
      </div>
    </div>
  );
};
