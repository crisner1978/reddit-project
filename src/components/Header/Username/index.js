import styled from "styled-components/macro";
import HeaderNavLink from "../NavLink";
import HeaderUsernameText from "./Text";

const Wrapper = styled(HeaderNavLink)`
  flex-shrink: 1;
  border-left: 1px solid ${(props) => props.theme.border};
  border-right: 1px solid ${(props) => props.theme.border};
  min-width: 0;
`;

export default function HeaderUsername({username}) {
  return (
    <Wrapper to={`/u/${username}`}>
      <HeaderUsernameText>{username}</HeaderUsernameText>
    </Wrapper>
  );
}
