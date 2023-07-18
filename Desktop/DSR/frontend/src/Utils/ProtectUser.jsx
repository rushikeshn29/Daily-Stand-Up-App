import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import jwtdecode from "jwt-decode";
import { DEFAULT_TL_ID } from './Constants';
import { useNavigate } from 'react-router-dom';
import NotFound from '../Pages/ErrorPage/NotFound';

export const ProtectUser = (props) => {
  const { Component } = props;
  const navigate = useNavigate()

  // States
  const [flag, setFlag] = useState(false);
  const [isTlLoggeIn, setIsTlLoggedIn] = useState(false);

  useEffect(() => {
    let login = localStorage.getItem("user");
    if (!login) {
      navigate("/");
    } else if (jwtdecode(login).Tl === DEFAULT_TL_ID) {
      setIsTlLoggedIn(true);

    } else {
      setFlag(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>{isTlLoggeIn && <Component />}
      {flag && <NotFound />}
    </div>
  )

}
