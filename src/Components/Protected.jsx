import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected(props) {
  const { Component } = props;
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem("user");
    if (!login) {
      navigate("/");
    } else {
      setFlag(true);
    }
  });

  return <div>{flag && <Component />}</div>;
}
