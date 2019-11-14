import { useEffect, RefObject } from 'react';
export const useOutsideClick = (ref: RefObject<HTMLDivElement>, callback: () => void): void => {
  const handleClick = (e: MouseEvent): void => {
    if (ref.current && !ref.current.contains(e.target as HTMLInputElement)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return (): void => {
      document.removeEventListener('click', handleClick);
    };
  });
};
