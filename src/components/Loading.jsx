import React from "react";
import { ClipLoader } from "react-spinners";

const Spinner = ({ loading }) => {
  return <ClipLoader color="#09f" loading={loading} size={36} />;
};

export default Spinner;
