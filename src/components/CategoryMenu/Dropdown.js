import categories from "categories";
import SelectWrapper from "components/shared/form/SelectWrapper";
import styled from "styled-components/macro";

const Dropdown = styled.select`
  border: none;
  border-radius: 0;
  width: 100%;
  padding: 8px 16px;
  background-color: ${(props) => props.theme.foreground};
  font-size: 15px;
  color: ${(props) => props.theme.normalText};
  appearance: none;
`;

export default function CategoryMenuDropdown({ category, history }) {
  function onChange(event) {
    const selected = event.target.value;

    if (selected !== category) {
      const url = selected === "all" ? "/" : `/a/${selected}`;
      history.push(url);
    }
  }

  return (
    <SelectWrapper flex>
      <Dropdown value={category} onChange={onChange}>
        {["all", ...categories].map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </Dropdown>
    </SelectWrapper>
  );
}
