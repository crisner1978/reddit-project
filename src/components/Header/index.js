import { logOut } from "lib/firebase";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import useStore from "store";
import styled from "styled-components/macro";
import shallow from "zustand/shallow";
import HeaderDarkButton from "./DarkButton";
import HeaderLogo from "./Logo";
import HeaderNavLink from "./NavLink";
import HeaderUsername from "./Username";

const Wrapper = styled.header`
  position: sticky;
  z-index: 10;
  top: 0;
  display: flex;
  align-items: stretch;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px ${(props) => props.theme.shadow};
  border-bottom: 1px solid ${(props) => props.theme.border};
  height: 48px;
  padding: 0 10vw;
  background-color: ${(props) => props.theme.foreground};
  user-select: none;

  @media (max-width: 425px) {
    margin-bottom: 16px;
    height: 40px;
  }

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export default function Header({history}) {
  const [user, resetUser] = useStore(s => [s.user, s.resetUser], shallow);

  const mutation = useMutation(logOut, {
    onSuccess: () => {
      resetUser();
      history.push("/login");
      toast("Logged out", {
        icon: "👋"
      })
    },
    onError: () => {
      toast.error("Error logging out")
    }
  })

  return <Wrapper>
    <HeaderLogo />
    <HeaderDarkButton />
    {user ? (
      <>
    <HeaderUsername username={user.username} />
    <HeaderNavLink onClick={mutation.mutate} to="/">log out</HeaderNavLink>
      </>
    ) : (
      <>
    <HeaderNavLink to="/login">log in</HeaderNavLink>
    <HeaderNavLink to="/signup">sign up</HeaderNavLink>
      </>
    )}

  </Wrapper>;
}
