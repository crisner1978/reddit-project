import Button from "components/shared/Button";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const CreatePostButton = styled(Button)`
  border-radius: 2px 2px 0 0;
  padding: 16px;
  text-decoration: none;
  text-align: center;
`;

export default function SidebarCreatePostButton() {
  return (
    <CreatePostButton as={Link} to="/createpost">
      create post
    </CreatePostButton>
  );
}
