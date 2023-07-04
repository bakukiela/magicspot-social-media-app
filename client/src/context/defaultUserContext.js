import React, { createContext } from "react";

export const DefaultUserContext = createContext();

export const DefaultUserProvider = ({ children }) => {

  const defaultUser = {
    city: "N/A",
    coverPic: "https://cdn.pixabay.com/photo/2019/08/06/15/50/fantasy-4388628_1280.jpg",
    profilePic: "https://as2.ftcdn.net/v2/jpg/03/32/59/65/1000_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg",
    lang: "N/A",
  };


  return (
    <DefaultUserContext.Provider value={defaultUser}>
      {children}
    </DefaultUserContext.Provider>
  );
};
