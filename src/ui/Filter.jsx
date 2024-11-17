// Keep the imports as they are
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

// Define StyledFilter as it is
const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

// Modify FilterButton to avoid passing `active` as a DOM attribute
const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${({ active }) =>
    active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleFilter(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          onClick={() => handleFilter(option?.value)}
          key={option?.value}
          active={currentFilter === option?.value ? true : false} // active is handled only in styled component logic
        >
          {option?.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
