import Button from "components/shared/Button";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const CreatePostButton = styled(Button)`
  display: flex;
  align-items: center;
  border-radius: 0;
  padding: 0 16px;
  text-decoration: none;
`;

export default function CategoryMenuCreatePostButton() {
  return (
    <CreatePostButton as={Link} to="/createpost">
      create post
    </CreatePostButton>
  );
}
