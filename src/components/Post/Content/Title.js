import { link, overflow } from "components/shared/helpers";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  display: flex;

  * {
    ${overflow};

    display: block;
    font-size: 15px;
    line-height: 21px;
    font-weight: 500;
    text-decoration: none;
    color: ${(props) => props.theme.normalText};
    ${(props) => props.full && "white-space: unset"};
  }

  a {
    ${link({ underline: true })};
  }
`;

export default function PostContentTitle({ post, full }) {
  return <Wrapper full={full}>{renderTitle(post, full)}</Wrapper>;
}

function renderTitle(post, full) {
  const { type, url, title, id, category } = post;

  switch (type) {
    case "link":
      return <a href={url}>{title}</a>;
    case "text":
      if (full) return <span>{title}</span>;
      return <Link to={`/a/${category}/${id}`}>{title}</Link>;
    default:
      break;
  }
}
