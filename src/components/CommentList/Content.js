import styled from "styled-components/macro";
import Markdown from "components/shared/Markdown";

const Content = styled.div`
  padding: 12px;
`;

export default function CommentContent({ children }) {
  return (
    <Content>
      <Markdown>{children}</Markdown>
    </Content>
  );
}
