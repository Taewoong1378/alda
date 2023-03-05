import { DetailedHTMLProps, LegacyRef } from 'react';

import classNames from 'classnames';

interface InputProps
  extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  inputRef?: LegacyRef<HTMLInputElement> | null;
  label?: string | React.ReactNode;
  message?: string | React.ReactNode;
  hasError?: boolean;
}

export const Input = ({
  label,
  className,
  inputRef,
  value,
  message,
  hasError,
  ...inputProps
}: InputProps) => {
  return (
    <div>
      {label && typeof label === 'string' ? (
        <div className='text-AX1-Headline mb-7 text-gray-600'>{label}</div>
      ) : (
        label
      )}
      <div
        className={classNames(
          'flex w-full flex-row items-center rounded-lg border-[2px] border-black bg-white',
          // value ? 'border-b-yellow' : 'border-b-gray-400',
          // hasError && 'border-b-red',
        )}>
        <input
          className={classNames(
            'text-T4 pr-13 pl-13 text-AX1-Caption1 placeholder:text-AX1-Caption1 w-full rounded-lg bg-white py-5 placeholder-gray-400 outline-none',
            className,
          )}
          value={value}
          ref={inputRef}
          autoCapitalize='none'
          autoCorrect='off'
          {...inputProps}
        />
      </div>
      {message && <div className=' ml-8 mt-8'>{message}</div>}
    </div>
  );
};
