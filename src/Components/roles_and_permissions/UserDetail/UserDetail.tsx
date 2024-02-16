import React, { FC } from "react";
import { UserCard } from "./UserCard";
import { UserServices } from "./UserServices/UserServices";

export const UserDetail: FC = () => {
  return (
    <>
      <UserCard />
      <UserServices />
      <UserServices />
      <UserServices />
    </>
  );
};
