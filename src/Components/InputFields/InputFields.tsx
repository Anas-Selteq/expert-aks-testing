import React, { FC } from "react";
import Styles from "./InputFields.module.css";

interface InputFieldsProps {
  name: string;
  placeholder: string;
}

export const InputFields: FC<InputFieldsProps> = ({ name, placeholder }) => {
  return (
    <>
      <div className={Styles.inputFieldBox}>
        <p>{name}</p>
        <input type="text" placeholder={placeholder} />
      </div>
    </>
  );
};
