import React from 'react'
import CustomInput from '../Input/input_field';

const UpdateEmailAndPhoneInputs = (props:any) => {
  return (
    <>
    <CustomInput
        label={props.label}
        inputValue={props.inputValue}
        handleInputValue={() => {}}
      />
    </>
  );
}
export default UpdateEmailAndPhoneInputs;


const EmailUpdateInputFields = ({
  label,
  inputValue,
  onChangeHandler,
}: {
  label: any;
  inputValue:any;
  onChangeHandler: any;
}) => {
  return (
    <div className="px-3">
        <div
          style={{
            color: "grey",
            fontSize: "0.8rem",
          }}
        >
          {label}
        </div>
        <input
            type="email"
            id={label}
            value={inputValue}
            onChange={onChangeHandler}
            placeholder="Please Enter Email"
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "black",
              width: "100%",
              fontWeight: "500",
              fontSize: "1.2rem",
            }}
          />
    </div>
  );
};
