import React, {useState} from 'react';

import useCollapse from 'react-collapsed';
import {GoChevronRight} from 'react-icons/go';
import styled from 'styled-components';

import Link from 'components/MDX/Link';

const StyledChevron = styled.div`
  width: 14px;
  height: 14px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 100ms ease-in-out;
  transform: translateX(-4px);

  &:hover {
      border: 1px solid var(--colors-blue0);
`;

const StyledContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;

  [aria-expanded='true'] {
    ${StyledChevron} {
      transform: translateX(-4px) rotate(90deg);
    }
  }
`;

const StyledItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  justify-items: start;
  align-items: center;
  width: 100%;
  padding: 0 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;

  &:hover {
    color: var(--colors-blue0);
  }
`;

const StyledItemText = styled.div`
  font-size: 14px;
  word-wrap: break-word;
`;

const StyledDivider = styled.div`
  height: 1px;
  background-color: var(--border-primary);
  width: 100%;
`;

const StyledSubItems = styled.div`
  padding-left: 16px;
  width: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--sidebar-link-primary);
`;

export interface AccordionItem {
  title: string;
  url?: string;
  useNextLink?: boolean;
  items?: (AccordionItem | null)[];
}

interface AccordionProps {
  items: (AccordionItem | null)[];
}

const Accordion: React.FC<AccordionProps> = ({items}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <StyledContainer>
      {items.map((item, index) => {
        if (item === null) {
          return (
            <StyledItem key={index}>
              <StyledDivider />
            </StyledItem>
          );
        }
        return (
          <SingleAccordion
            key={index}
            item={item}
            isExpanded={expandedIndex === index}
            onToggle={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          />
        );
      })}
    </StyledContainer>
  );
};

const SingleAccordion: React.FC<{
  item: AccordionItem;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({item, isExpanded, onToggle}) => {
  const {getCollapseProps, getToggleProps} = useCollapse({isExpanded});
  const {url, useNextLink} = item;

  let textCmp = <StyledItemText>{item.title}</StyledItemText>;

  if (url) {
    textCmp = (
      <StyledLink
        href={url}
        useNextLink={useNextLink}
        versioned={false}
        className="sidenav-link">
        {textCmp}
      </StyledLink>
    );
  }

  return (
    <>
      <StyledItem
        {...getToggleProps({onClick: onToggle})}
        data-expanded={isExpanded}>
        {textCmp}
        {item.items && item.items.length > 0 && (
          <StyledChevron>
            <GoChevronRight />
          </StyledChevron>
        )}
      </StyledItem>
      {item.items && (
        <StyledSubItems {...getCollapseProps()}>
          <Accordion items={item.items} />
        </StyledSubItems>
      )}
    </>
  );
};

export default Accordion;
