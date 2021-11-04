import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { link } from "./helpers";

const StyledLink = styled(Link)`
  ${link};

  font-weight: 500;
  color: ${(props) => props.theme.normalText};
`;

export default function Author({ username }) {
  return <StyledLink to={`/u/${username}`}>{username}</StyledLink>;
}
