import Error from "components/shared/form/Error";
import Form from "components/shared/form/Form";
import Input from "components/shared/form/Input";
import { transition } from "components/shared/helpers";
import { createComment, getTimestamp } from "lib/firebase";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import useStore from "store";
import styled from "styled-components/macro";
import CommentFormSubmitButton from "./SubmitButton";

const StyledForm = styled(Form)`
  ${transition("border", "box-shadow")};

  margin-top: -1px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 0 0 2px 2px;
  max-width: none;
  padding: 0;

  @media (hover: hover) {
    :hover {
      border: 1px solid ${(props) => props.theme.accent};
    }
  }

  :focus-within {
    border: 1px solid ${(props) => props.theme.accent};
    box-shadow: 0 0 0 2px ${(props) => props.theme.accent + "4d"};
  }

  @media (max-width: 768px) {
    margin-top: -1px;
    border-radius: 0;
    border-left: none;
    border-right: none;

    :hover,
    :focus-within {
      border-left: none;
      border-right: none;
    }
  }
`;

const CommentFormTextArea = styled(Input)`
  margin: 0;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.border};
  border-radius: 0;
  resize: none;

  :hover,
  :focus {
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.border};
    box-shadow: none;
  }
`;

export default function CommentForm({ postId }) {
  const user = useStore((s) => s.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const queryClient = useQueryClient()

  const mutation = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId])
      toast.success("Comment created");
      reset()
    }
  });

  const onSubmit = ({ commentText }) => {
    mutation.mutate({
      postId,
      body: commentText,
      created: getTimestamp(),
      author: {
        username: user.username,
        uid: user.uid,
      },
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <CommentFormTextArea
        {...register("commentText", {
          required: "Comment text is required",
          minLength: {
            value: 5,
            message: "Must be at least 5 characters",
          },
          maxLength: {
            value: 10000,
            message: "Must be less than 10,000 characters",
          },
        })}
        as="textarea"
        placeholder="enter your comment"
        rows="6"
      />
      <Error>{errors.commentText?.message}</Error>
      <CommentFormSubmitButton />
    </StyledForm>
  );
}
