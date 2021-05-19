import React from "react";

const Error = ({ label, value, setValue }) => {

  return (
    <>
    <h1>Ops!</h1>
    <p>It appears that the movie you are searching for does not exist.
        <br/>Try another search phrase!</p>
    </>
  );
};

export default Error;
