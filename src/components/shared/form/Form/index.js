import { transition } from "components/shared/helpers";
import LoadingIndicatorSpinner from "components/shared/LoadingIndicator/Spinner";
import styled from "styled-components/macro";
import FormWrapper from "./Wrapper";

const StyledForm = styled.form`
  ${transition("filter")};

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${(props) =>
    props.loading &&
    "filter: grayscale(0.5) blur(5px) opacity(0.6); pointer-events: none"};
`;

const Form = ({ className, wide, ...props }) => (
  <FormWrapper className={className} wide={wide}>
    <StyledForm {...props} />
    {props.loading && <LoadingIndicatorSpinner />}
  </FormWrapper>
);

export default Form;
