import React, { useState } from "react";

const LaFeContext = React.createContext([{}, () => {}]);

const LaFeProvider = (props) => {
  const [auth, setAuth] = useState({
    access_token: localStorage.getItem("access_token") || "",
    auth: false,
    rol: "",
  });

  return (
    <LaFeContext.Provider value={[auth, setAuth]}>
      {props.children}
    </LaFeContext.Provider>
  );
};

export { LaFeContext, LaFeProvider };
