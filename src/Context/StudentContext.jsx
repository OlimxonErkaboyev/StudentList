import React from "react";

const Context = React.createContext();

const Provider = ({ children }) => {
  const [modal, setModal] = React.useState(false);

  return (
    <Context.Provider value={{ modal, setModal }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
