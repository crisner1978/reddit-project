import categories from "categories";
import styled from "styled-components/macro";
import SidebarCategoryListHeader from "./Header";
import SidebarCategoryListItem from "./Item";

const CategoryList = styled.nav`
  display: flex;
  flex-direction: column;
`;

export default function SidebarCategoryList() {
  return (
    <CategoryList>
      <SidebarCategoryListHeader />
      {["all", ...categories].map((category, index) => (
        <SidebarCategoryListItem key={index} category={category} />
      ))}
    </CategoryList>
  );
}
