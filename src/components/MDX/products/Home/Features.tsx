import styled from 'styled-components';

import SectionContainer from 'components/Home/SectionContainer';
import {sections} from 'config/home/sections';
import {HomepageSectionGroup} from 'utils/Types';

import Container from '../../../Layout/Container';

const StyledFeatures = styled.div`
  .grouped-sections {
    display: grid;
    gap: 20px;

    /* Start with 1 column layout */
    grid-template-columns: 1fr;

    /* At widths where 2 columns of minimum 500px can fit, use 2 columns */
    @media (min-width: 1024px) {
      grid-template-columns: repeat(2, minmax(500px, 1fr));
    }
  }
`;

export function HomeFeatures() {
  return (
    <StyledFeatures>
      <Container>
        <div className="grouped-sections">
          {(sections as HomepageSectionGroup[]).map((section) => (
            <SectionContainer
              key={section.heading}
              className={section.className}
              icon={section.icon}
              heading={section.heading}
              subheading={section.subheading}
              href={section.href}
              sections={section.sections}
            />
          ))}
        </div>
      </Container>
    </StyledFeatures>
  );
}
