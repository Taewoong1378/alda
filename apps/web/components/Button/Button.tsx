import React from 'react';

import classNames from 'classnames';

import { Icon } from '@components';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className='disabled:bg-grey-1 disabled:border-grey-1 mt-27 mr-27 text-AX1-Subhead enabled:border-grey-6 enabled:text-grey-6 pr-34 rounded-[50px] border-[2px] bg-white py-9 pl-40 disabled:border-opacity-0 disabled:bg-opacity-30'>
      <div className='flex flex-row items-center'>
        <div className={classNames(props.disabled ? 'text-primary-bg' : 'text-grey-6')}>
          {props.text}
        </div>
        <Icon icon='RightDirection' size={40} color={props.disabled ? 'primary-bg' : 'grey-6'} />
      </div>
    </button>
  );
};
