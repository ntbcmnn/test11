import React from 'react';
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner.tsx';

interface Props {
  isLoading?: boolean;
  text: string;
  isDisabled?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

const ButtonLoading: React.FC<Props> = ({
  isDisabled = false,
  isLoading = false,
  text,
  type = 'submit',
  onClick,
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        type={type}
        disabled={isDisabled}
        className="text-center btn btn-dark w-100 d-flex align-items-center justify-content-center gap-3"
      >
        <span className="me-2">{text}</span>
        {isLoading ? <ButtonSpinner/> : null}
      </button>
    </div>
  );
};

export default ButtonLoading;