import React, {useState} from 'react';

import useCollapse from 'react-collapsed';
import {GoChevronRight} from 'react-icons/go';
import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

const Chevron = styled.div`
  width: 14px;
  height: 14px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  transition: 100ms ease-in-out;

  &:hover {
    border: 1px solid var(--colors-blue0);
  }
`;

const MenuItem = styled.div<{['data-expanded']?: boolean}>`
  display: grid;
  grid-template-columns: 1fr auto;
  justify-items: start;
  align-items: center;
  width: 100%;
  padding: 0 16px;

  ${Chevron} {
    transform: ${(props) =>
      props['data-expanded'] ? 'rotate(90deg)' : 'rotate(0deg)'};
  }
`;

const MenuText = styled.div`
  color: var(--text-primary);
  font-size: 14px;
  word-wrap: break-word;
`;

const MenuDivider = styled.div`
  height: 1px;
  background-color: var(--border-primary);
  width: 100%;
  padding: 2px auto;
`;

const SubItems = styled.div`
  padding-left: 16px;
  width: 100%;

  ${Container} {
    &:before {
      content: '';
      position: absolute;
      height: calc(100% - 10px);
      top: 5px;
      width: 1px;
      background-color: var(--sidebar-line);
      left: 8px;
    }
  }
`;

type AccordionItemOrDivider = AccordionItem | null;

export interface AccordionItem {
  title: string;
  url?: string;
  items?: AccordionItemOrDivider[];
  useNextLink?: boolean;
}

interface AccordionProps {
  items: AccordionItemOrDivider[];
}

const Accordion: React.FC<AccordionProps> = ({items}) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  if (!items) {
    console.warn('Accordion component requires `items` prop');
    return null;
  }

  return (
    <Container>
      {items.map((item, index) => {
        const isExpanded = expanded === index;
        const hasItems = item?.items?.length;

        return (
          <React.Fragment key={index}>
            {item === null ? (
              <MenuItem>
                <MenuDivider />
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() => toggleExpand(index)}
                data-expanded={isExpanded}>
                <MenuText>{item.title}</MenuText>
                {hasItems && (
                  <Chevron>
                    <GoChevronRight />
                  </Chevron>
                )}
              </MenuItem>
            )}
            {isExpanded && item?.items && (
              <SubItems>
                <Accordion items={item.items} />
              </SubItems>
            )}
          </React.Fragment>
        );
      })}
    </Container>
  );
};

export default Accordion;
