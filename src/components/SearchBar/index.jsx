import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

import classes from './index.module.css';

/**
 * @param {{
 *  value: string;
 *  onSubmit: React.InputHTMLAttributes<HTMLInputElement>.onChange?: React.ChangeEventHandler<HTMLInputElement>;
 * }} props
 */
const SearchBar = ({ value, onChange }) => {
  return (
    <div className={classes['searchbar-container']}>
      <SearchIcon className='input-start-icon' />
      <input
        type='text'
        placeholder='Search photos...'
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
