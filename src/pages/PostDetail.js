import CommentForm from "components/CommentForm";
import CommentList from "components/CommentList";
import Post from "components/Post";
import DeleteButton from "components/shared/DeleteButton";
import Empty from "components/shared/Empty";
import LoadingIndicatorBox from "components/shared/LoadingIndicator/Box";
import { deletePost, getCommentsByPostId, getPost } from "lib/firebase";
import { usePostViewCount } from "lib/hooks";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router";
import useStore from "store";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  display: flex;
  margin-top: -1px;
  border: 1px solid ${(props) => props.theme.border};
  ${(props) => props.round && "border-radius: 0 0 2px 2px"};
  padding: 8px;
  background-color: ${(props) => props.theme.foreground};
  font-size: 13px;
  color: ${(props) => props.theme.mutedText};

  @media (max-width: 768px) {
    border-left: none;
    border-right: none;
  }
`;

const PostWrapper = styled.div`
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 2px 2px 0 0;

  @media (max-width: 768px) {
    margin-bottom: 0;
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
`;

export default function PostDetail() {
  const { postId } = useParams();
  usePostViewCount(postId);
  const user = useStore((s) => s.user);
  const { data: post, isLoading } = useQuery(["post", postId], () =>
    getPost(postId)
  );

  if (isLoading) return <LoadingIndicatorBox />;
  if (!post) return <Empty />;

  return (
    <>
      <PostDetailPost post={post} />
      <PostDetailInfoBar postId={postId} post={post} user={user} />
      {user && <CommentForm postId={postId} />}
      <PostDetailCommentSection postId={postId} />
    </>
  );
}

function PostDetailInfoBar({ user, postId, post }) {
  const { author, views, upvotePercentage } = post;
  const history = useHistory();
  const mutation = useMutation(deletePost, {
    onSuccess: () => {
      history.push("/");
      toast.success("Post deleted");
    },
  });
  const isAuthor = author.uid === user?.uid;
  return (
    <Wrapper round={!user}>
      <span>{views} views</span>
      <span>&nbsp; | &nbsp;</span>
      <span>{upvotePercentage}% upvoted</span>
      {isAuthor && <DeleteButton onClick={() => mutation.mutate(postId)} />}
    </Wrapper>
  );
}

function PostDetailCommentSection({ postId }) {
  const { data: comments, isLoading } = useQuery(["comments", postId], () =>
    getCommentsByPostId(postId)
  );

  if (isLoading || !comments?.length) return <Empty comments />;

  return <CommentList comments={comments} />;
}

function PostDetailPost({ post }) {
  return (
    <PostWrapper>
      <Post post={post} full />
    </PostWrapper>
  );
}
