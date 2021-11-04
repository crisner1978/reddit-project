import styled from "styled-components/macro";
import PostContentDetail from "./Detail";
import PostContentFullText from "./FullText";
import PostContentPreview from "./Preview";
import PostContentTitle from "./Title";

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-left: 1px solid ${(props) => props.theme.border};
  padding: 8px;
  min-width: 0;
`;

export default function PostContent({ post, full }) {
  return (
    <Wrapper>
      <PostContentTitle post={post} full={full} />
      {renderContent(post, full)}
      <PostContentDetail post={post} />
    </Wrapper>
  );
}

function renderContent(post, full) {
  const { type, url, text } = post;

  switch (type) {
    case "link":
      return <PostContentPreview>{url}</PostContentPreview>;
    case "text":
      if (full) {
        return <PostContentFullText>{text}</PostContentFullText>;
      }
      return <PostContentPreview>{text}</PostContentPreview>;
    default:
      return;
  }
}
