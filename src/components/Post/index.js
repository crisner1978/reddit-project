import styled from "styled-components/macro";
import PostContent from "./Content";
import PostVote from "./Vote";

const Wrapper = styled.div`
  display: flex;
  height: auto;
  background-color: ${(props) => props.theme.foreground};
`;

export default function Post({ post, full }) {
  return (
    <Wrapper>
      <PostVote post={post} />
      <PostContent post={post} full={full} />
    </Wrapper>
  );
}
