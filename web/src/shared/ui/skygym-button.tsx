import { cn } from '../lib/utils';
import { type ButtonHTMLAttributes } from 'react';

interface SkyGymButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  buttonText: string;
  buttonClass?: string;
  isLoading?: boolean;
}

export const SkyGymButton = ({
  icon,
  buttonText,
  buttonClass,
  isLoading,
  disabled,
  ...props
}: SkyGymButtonProps) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      disabled={isDisabled}
      className={cn(
        'flex items-center justify-center gap-4 cursor-pointer',
        isDisabled && 'opacity-50 cursor-not-allowed',
        buttonClass,
      )}
      {...props}
    >
      {icon}
      <span className="uppercase text-lg">
        {isLoading ? '...' : buttonText}
      </span>
    </button>
  );
};
