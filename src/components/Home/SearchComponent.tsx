import {useState} from 'react';

import {FiSearch} from 'react-icons/fi'; // Make sure to install react-icons using `npm install react-icons`
import styled from 'styled-components';

import {EdgioAnswersInput, edgioAnswersUrl} from 'components/EdgioAnswers';
import AlgoliaSearch from 'components/Layout/Header/AlgoliaSearch';
import NoSSRWrapper from 'components/Layout/NoSSRWrapper';
import Link from 'components/MDX/Link';
import {ContextType, useAppContext} from 'contexts/AppContext';
import {useTheme} from 'contexts/ThemeContext';

const searchButtons = [
  {
    id: 'applications',
    label: 'Applications',
  },
  {
    id: 'uplynk',
    label: 'Uplynk',
  },
];

const SearchContainer = styled.div<{active?: string}>`
  display: flex;
  flex-direction: column;
  align-items: center;

  .search-buttons {
    display: flex;
    gap: 15px;
    margin-bottom: 2px;
    width: 100%;
  }

  .search-button {
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    font-size: 16px;
    padding: 0 10px 5px 10px;
    position: relative;
    text-decoration: none;

    ::after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 2px;
      left: 0;
      background: #2993e0;
      width: 0;
      transform: translateY(2px);
      transition: width 0.2s ease-in-out;
    }

    &:hover::after,
    &.active::after {
      width: 100%;
    }
  }

  .separator {
    height: 1px;
    background-color: var(--border-primary);
    width: 640px;
    margin-bottom: 10px;
  }

  .search-box {
    display: flex;
    align-items: center;
    background: var(--search-input-bg);
    padding: 10px;
    width: 640px;
    height: 40px;
    border: 1px solid var(--border-primary);

    .search-input {
      color: var(--text-primary);
      outline: none;
      padding-left: 10px;
      font-size: 16px;

      width: 100%;
      height: auto;
      //opacity: ${({active}) => (active === 'applications' ? '0' : '1')};
      //cursor: ${({active}) =>
        active === 'applications' ? 'pointer' : 'auto'};

      .DocSearch-Button {
        width: 100%;
      }
    }

    .search-icon {
      color: var(--search-input-icon);
    }
  }
`;

const KeyboardButton = styled.kbd`
  border: 1px solid var(--search-input-icon);
  border-radius: 5px;
  color: var(--search-input-icon);
  padding: 2px 5px;
  white-space: nowrap;
`;

const NewIcon = styled.div<{children: React.ReactNode}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  background: #812991;
  border-radius: 9px;
  color: white;
  font-size: 11px;
  font-family: Inter, sans-serif;
  font-weight: 500;
  line-height: 20px;
  margin-left: 8px;
`;

const SparkleSvg = styled.svg`
  margin-left: 4px;
`;

const KeywordSearchButton = styled.div``;
const EdgioAnswersButton = styled(Link)`;
  display: flex;
  gap; 4px
`;

const NewIconWithSparkle: React.FC<{children: React.ReactNode}> = ({
  children,
}) => (
  <NewIcon>
    {children}
    <SparkleSvg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1760_2063)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.00809 11.1328H8.91869C8.91869 10.4138 8.64412 9.78597 8.09679 9.24849C7.54947 8.7119 6.90819 8.44271 6.17477 8.44271V8.35506C6.90819 8.35506 7.54947 8.08587 8.09679 7.54839C8.64412 7.00912 8.91869 6.38041 8.91869 5.66406H9.00809C9.00809 6.38309 9.28266 7.0118 9.82998 7.54839C10.3773 8.08498 11.0186 8.35417 11.752 8.35417V8.44181C11.0186 8.44181 10.3773 8.711 9.82998 9.24759C9.28266 9.78597 9.00809 10.4138 9.00809 11.1328Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.19937 8.88672H4.06687C4.06687 7.82101 3.65992 6.89051 2.8487 6.09388C2.03749 5.29857 1.08702 4.8996 0 4.8996V4.7697C1.08702 4.7697 2.03749 4.37072 2.8487 3.57409C3.65992 2.77481 4.06687 1.84298 4.06687 0.78125H4.19937C4.19937 1.84696 4.60633 2.77879 5.41754 3.57409C6.22875 4.36939 7.17922 4.76837 8.26624 4.76837V4.89827C7.17922 4.89827 6.22875 5.29725 5.41754 6.09255C4.60633 6.89051 4.19937 7.82101 4.19937 8.88672Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_1760_2063">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </SparkleSvg>
  </NewIcon>
);

const UplynkSearch = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  color: var(--text-primary);
  font-size: 16px;
  outline: none;
`;

const StyledEdgioAnswersInput = styled.div`
  input {
    color: var(--text-primary);
    width: 100%;
    border: none;
    background: transparent;
  }
`;

function HomeSearchComponent() {
  const [active, setActive] = useState('applications');
  const {isClient} = useTheme();

  const isApplicationsActive = active === 'applications';
  const isUplynkActive = active === 'uplynk';

  return (
    <SearchContainer active={active}>
      <div className="search-buttons">
        {searchButtons.map((button) => (
          <button
            key={button.id}
            className={`search-button ${active === button.id ? 'active' : ''}`}
            onClick={() => setActive(button.id)}>
            {button.label}
          </button>
        ))}
      </div>
      <div className="separator"></div>
      <div className="search-box">
        <FiSearch className="search-icon" />
        <div className="search-input">
          {isApplicationsActive && <EdgioAnswersContainer />}
          {isUplynkActive && (
            <UplynkSearch
              placeholder="Search Uplynk documentation..."
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  handleUplynkSearch(event.currentTarget.value);
                }
              }}
            />
          )}
        </div>
      </div>
    </SearchContainer>
  );
}

function ProductSearchComponent() {
  return (
    <SearchContainer>
      <div className="search-buttons">
        {
          <>
            <EdgioAnswersButton
              className="search-button active"
              href={edgioAnswersUrl}>
              Edgio Answers <NewIconWithSparkle>New</NewIconWithSparkle>
            </EdgioAnswersButton>
          </>
        }
      </div>
      <div className="separator"></div>
      <div className="search-box">
        <FiSearch className="search-icon" />
        <div className="search-input">
          <EdgioAnswersContainer />
        </div>
      </div>
    </SearchContainer>
  );
}

function EdgioAnswersContainer() {
  return (
    <StyledEdgioAnswersInput>
      <EdgioAnswersInput />
    </StyledEdgioAnswersInput>
  );
}

export default function SearchComponent() {
  const {context} = useAppContext();

  return (
    <NoSSRWrapper>
      {context === ContextType.HOME ? (
        <HomeSearchComponent />
      ) : (
        <ProductSearchComponent />
      )}
    </NoSSRWrapper>
  );
}

function handleUplynkSearch(inputValue: string) {
  const encodedQuery = encodeURIComponent(inputValue);
  const searchUrl = `https://docs.edgecast.com/video/index.html#search-${encodedQuery}`;
  window.open(searchUrl, '_blank');
}
