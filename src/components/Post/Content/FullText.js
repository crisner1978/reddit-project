import Markdown from "components/shared/Markdown";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  margin: 8px -8px;
  border: 1px solid ${(props) => props.theme.border};
  border-left: none;
  border-right: none;
  padding: 8px;
  background-color: ${(props) => props.theme.inputBackground};
`;

const PostContentFullText = (props) => (
  <Wrapper>
    <Markdown>{props.children}</Markdown>
  </Wrapper>
);

export default PostContentFullText;
