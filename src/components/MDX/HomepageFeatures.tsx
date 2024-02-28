import styled from 'styled-components';

import Container from '../Layout/Container';

import SectionContainer from 'components/Home/SectionContainer';
import {sections} from 'config/homepage';
import {HomepageSectionGroup} from 'utils/Types';

const StyledHomepageFeatures = styled.div`
  .grouped-sections {
    display: flex;
    gap: 2%;
    align-items: stretch;

    @media (max-width: 1086px) {
      flex-direction: column;
    }
  }
`;

export default function HomepageFeatures() {
  return (
    <StyledHomepageFeatures>
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
    </StyledHomepageFeatures>
  );
}
