import {useState} from 'react';
import {FiSearch} from 'react-icons/fi'; // Make sure to install react-icons using `npm install react-icons`
import styled from 'styled-components';

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

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;

  .search-buttons {
    display: flex;
    gap: 15px;
    margin-bottom: 2px;
    width: 100%;
  }

  .search-button {
    background: transparent;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    font-size: 16px;
    padding: 5px 10px;
    transition: color 0.2s ease-out, border-bottom 0.2s ease-out;

    &:hover,
    &.active {
      color: var(--colors-blue0);
      border-bottom: 2px solid var(--colors-blue0);
    }
    &.active {
      transition: color 0.2s ease-in, border-bottom 0.2s ease-in;
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

    input {
      background: var(--search-input-bg);
      border: none;
      color: var(--text-primary);
      outline: none;
      padding-left: 10px;
      font-size: 16px;
      width: 100%;
    }

    .search-icon {
      color: var(--search-input-icon);
    }
  }
`;

export default function SearchComponent() {
  const [active, setActive] = useState('applications');

  return (
    <SearchContainer>
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
        <input type="text" placeholder="" />
      </div>
    </SearchContainer>
  );
}
