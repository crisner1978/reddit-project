import Author from "components/shared/Author";
import DeleteButton from "components/shared/DeleteButton";
import dayjs from "dayjs";
import { deleteComment } from "lib/firebase";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router";
import useStore from "store";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.border};
  padding: 8px;
  font-size: 13px;
`;

const Timestamp = styled.span`
  margin-left: 4px;
  color: ${(props) => props.theme.mutedText};
`;

export default function CommentDetail({ id, author, created }) {
  const user = useStore(s => s.user)
  const isAuthor = user?.uid === author.uid;
  const { postId } = useParams()
  const queryClient = useQueryClient()
  const mutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId])
      toast.success("Comment deleted")
    }
  })

  return (
    <Wrapper>
      <Author username={author.username} />
      <Timestamp>{dayjs(created.toDate()).fromNow()}</Timestamp>
      {isAuthor && <DeleteButton onClick={() => mutation.mutate({
        postId, commentId: id
      })} />}
    </Wrapper>
  );
}
