import SubmitButton from "components/shared/form/SubmitButton";
import styled from "styled-components/macro";

const StyledSubmitButton = styled(SubmitButton)`
  margin: 4px;
  padding: 4px 12px;
`;

export default function CommentFormSubmitButton() {
  return <StyledSubmitButton type="submit">submit</StyledSubmitButton>;
}
