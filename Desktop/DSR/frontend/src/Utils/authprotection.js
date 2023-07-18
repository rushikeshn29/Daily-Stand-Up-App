import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { DEFAULT_TL_ID } from './Constants';
import { useNavigate } from 'react-router-dom';

export default function AuthProtection(props) {
  const { Component } = props;
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem("user");
    if (!login) {
      setFlag(true);
    } else {
      jwtDecode(login).Tl === DEFAULT_TL_ID ? navigate("/dashboard") : navigate(`/dashboard/report/${jwtDecode(login).userID}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>{flag && <Component />}</div>
  )
}
