import NavLink from "components/shared/NavLink";
import styled from "styled-components/macro";

const Item = styled(NavLink)`
  padding: 12px;
  font-size: 15px;
  text-decoration: none;
  color: ${(props) => props.theme.normalText};

  ::after {
    left: -1px;
    top: 0;
    bottom: 0;
    border-left: 3px solid ${(props) => props.theme.accent};
  }
`;

export default function SidebarCategoryListItem({ category }) {
  const isAll = category === "all";

  return (
    <Item exact={isAll} to={isAll ? "/" : `/a/${category}`}>
      {category}
    </Item>
  );
}
