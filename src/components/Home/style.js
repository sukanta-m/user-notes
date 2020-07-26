import styled from "styled-components";
import { Form } from "antd";

export const StyledCreateWrapper = styled.div`
display: flex;
justify-content: space-between;
margin-top: 10px;
.anticon {
  margin-left: 5px;
}

input {
  max-width: 500px;
}
`;

export const StyledActionsWrapper = styled.div`
isplay: flex;
align-items: center;
a, span {
  margin-right: 5px;
}
`;

export const StyledForm = styled(Form)`
.ant-input-number {
  width: 100%;
}
`;