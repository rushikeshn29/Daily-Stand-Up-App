import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();

  // States
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    let login = localStorage.getItem("user");
    if (!login) {
      navigate("/");
    } else {
      setFlag(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{flag && <Component />}</div>;
}
