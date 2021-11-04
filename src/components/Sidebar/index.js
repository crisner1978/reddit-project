import useStore from "store";
import styled from "styled-components/macro";
import SidebarCategoryList from "./CategoryList";
import SidebarCreatePostButton from "./CreatePostButton";

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  flex-basis: 240px;
  margin-left: 24px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 2px;
  background-color: ${(props) => props.theme.foreground};

  @media (max-width: 768px) {
    display: none;
  }
`;

export default function Sidebar() {
  const user = useStore((s) => s.user);
  return (
    <Wrapper>
      {user && <SidebarCreatePostButton />}
      <SidebarCategoryList />
    </Wrapper>
  );
}
