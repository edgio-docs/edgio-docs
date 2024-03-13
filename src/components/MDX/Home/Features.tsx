import styled from 'styled-components';

import SectionContainer from 'components/Home/SectionContainer';
import {sections} from 'config/home/sections';
import {HomepageSectionGroup} from 'utils/Types';

import Container from '../../Layout/Container';

const StyledFeatures = styled.div`
  .grouped-sections {
    display: flex;
    gap: 2%;
    align-items: stretch;

    @media (max-width: 1086px) {
      flex-direction: column;
    }
  }
`;

export default function HomeFeatures() {
  return (
    <StyledFeatures>
      <Container>
        <div className="grouped-sections">
          {(sections as HomepageSectionGroup[]).map((section) => (
            <SectionContainer
              key={section.heading}
              className={section.className}
              icon={section.icon}
              title={section.heading}
              subtitle={section.subheading}
              href={section.path}
              sections={section.sections}
              viewMoreText={'View more'}
            />
          ))}
        </div>
      </Container>
    </StyledFeatures>
  );
}
