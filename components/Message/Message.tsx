import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

type IconConfig = {
  iconProps: FontAwesomeIconProps;
  iconColor?: string;
};

type MessageProps = {
  title?: string;
  subtitle?: string;
  iconConfig?: IconConfig;
};

export const Message = ({ title, subtitle, iconConfig }: MessageProps) => {
  return (
    <div className="message flex flex-col items-center justify-center h-full">
      {title && <p className="text-2xl font-bold">{title}</p>}
      {subtitle && <p className="text-lg">{subtitle}</p>}
      {iconConfig && (
        <FontAwesomeIcon
          {...iconConfig.iconProps}
          className={`text-6xl mt-4 ${iconConfig.iconColor}`}
        />
      )}
    </div>
  );
};
