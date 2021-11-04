import useStore from "store";
import styled from "styled-components/macro";
import CategoryMenuCreatePostButton from "./CreatePostButton";
import CategoryMenuDropdown from "./Dropdown";

const Menu = styled.nav`
  display: none;
  border: 1px solid ${(props) => props.theme.border};
  border-left: none;
  border-right: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

export default function CategoryMenu() {
  const user = useStore(s => s.user);
  return (
    <Menu>
      <CategoryMenuDropdown />
      {user && <CategoryMenuCreatePostButton />}
    </Menu>
  );
}
