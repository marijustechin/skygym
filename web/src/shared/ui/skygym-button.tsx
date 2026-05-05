import { cn } from '../lib/utils';

interface SkyGymButtonProps {
  icon?: React.ReactNode;
  buttonText: string;
  buttonClass?: string;
}

export const SkyGymButton = ({
  icon,
  buttonText,
  buttonClass,
}: SkyGymButtonProps) => {
  return (
    <button
      className={cn(
        'flex items-center justify-center gap-4 cursor-pointer',
        buttonClass,
      )}
    >
      {icon}
      <span className="uppercase text-lg">{buttonText}</span>
    </button>
  );
};
