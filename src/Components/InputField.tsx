import { InputTag, InputContainer, InputLabel } from "@/styles/Input.style";
import { Label } from "@/styles/Label.styled";
import Image from "next/image";
import { useRef, useState } from "react";
import styled from "styled-components";

export default function InputField({
  onChange = () => {},
  label = "",
  passwordLabel = "Please enter your password",
  placeholder = "Please enter",
  indicateIcon = "",
  required = false,
  isPasswordField = false,
  type = "text",
  message = "",
  width,
  widthInput,
  backgroundColor = "red",
}: {
  label?: string;
  onChange?: any;
  passwordLabel?: string;
  placeholder: string;
  indicateIcon: string;
  required?: boolean;
  width?: string;
  isPasswordField?: boolean;
  type?: string;
  message?: string;
  widthInput?: string;
  backgroundColor?: string;
}) {
  const [passwordIcon, setPasswordIcon] = useState(false);
  const ref: any = useRef();
  const passwordViewHandle = () => {
    setPasswordIcon(!passwordIcon);
    !passwordIcon
      ? (ref.current.type = "text")
      : (ref.current.type = "password");
  };
  // const InputLabel = styled.div``;
  return (
    <>
      <div
        style={{
          margin: "auto",
          display: "block",
          width: width ? width : "340px",
          position: "relative",
        }}
      >
        <Label style={{ margin: 0 }}>{passwordLabel} </Label>
        <InputContainer>
          <InputLabel>{label}</InputLabel>
          <InputTag
            width={widthInput}
            padding="2.5rem 0 1.2rem 1rem"
            ref={ref}
            backgroundColor={backgroundColor}
            placeholder={placeholder}
            type={type}
            onChange={onChange}
            required={required}
            name="login-password"
            className="login-password"
            id="login-password"
          />
        </InputContainer>

        {message && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              color: "red",
              fontSize: "12px",
              paddingTop: "4px",
            }}
          >
            {message}
          </div>
        )}
        {isPasswordField && (
          <>
            {passwordIcon && (
              <Image
                alt=""
                src="https://1864597015.rsc.cdn77.org/newexpertpreprod/icons/password-show.svg"
                onClick={passwordViewHandle}
                width={16}
                height={16}
                style={{
                  position: "absolute",
                  right: "15px",
                  bottom: "17px",
                  cursor: "pointer",
                }}
              />
            )}
            {!passwordIcon && (
              <Image
                alt=""
                src="https://1864597015.rsc.cdn77.org/newexpertpreprod/icons/password-hide.svg"
                onClick={passwordViewHandle}
                height={16}
                width={16}
                style={{
                  position: "absolute",
                  right: "15px",
                  bottom: "17px",
                  cursor: "pointer",
                }}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
