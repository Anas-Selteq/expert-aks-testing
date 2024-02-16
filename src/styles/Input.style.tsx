import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputLabel = styled.label`
  position: absolute;
  color: #AAA;
  font-family: Roboto;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  top: 40%;
  left: 5%;
  z-index: 1000;
  transform: translateY(-50%);
`;

export const InputTag = styled.input<{
  placeholder: string;
  padding?: string;
  width?: string;
  backgroundColor?: string;
}>`
  placeholder: ${({ placeholder }: { placeholder: string }) =>
    placeholder || "Please insert"};
  padding: ${({ padding }) => padding || "6.9px 10px 6px 54.5px;"};
  ::placeholder {
    font-size: 14px;
  }
  border-radius: 8px;
  background-color: #ffffff !important;
  border: 0.8px solid #dcdcdc;
  outline: none;
  width: ${({ width }) => width || "340px"};
  height: 3.5rem;
  position: relative;
  @media screen and (max-width: 600px) {
    font-size: 14px;

    ::after {
      --size: 6rem;
    }
  }
`;
