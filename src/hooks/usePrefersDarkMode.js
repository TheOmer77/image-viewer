import useMedia from './useMedia';

/**
 * Source: https://usehooks.com/useDarkMode/
 */
const usePrefersDarkMode = () =>
  useMedia(['(prefers-color-scheme: dark)'], [true], false);

export default usePrefersDarkMode;
