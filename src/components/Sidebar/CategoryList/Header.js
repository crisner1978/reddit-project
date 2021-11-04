import { wideFont } from "components/shared/helpers";
import styled from "styled-components/macro";

const Header = styled.span`
  ${wideFont};

  display: block;
  padding: 12px;
  text-align: center;
  color: ${(props) => props.theme.mutedText};
`;

export default function SidebarCategoryListHeader() {
  return <Header>categories</Header>;
}
