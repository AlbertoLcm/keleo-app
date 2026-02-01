import React from "react";

type AvatarProps = {
  name: string;
  src?: string;
  size?: number; // tamaño en px (default 40)
};

const Avatar: React.FC<AvatarProps> = ({ name, src, size = 40 }) => {
  const initials = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <div
      className="select-none flex items-center justify-center rounded-full bg-gray-300 text-white font-semibold overflow-hidden p-0 m-0"
      style={{
        width: size,
        height: size,
        fontSize: size / 2,
        minHeight: size,
        minWidth: size,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="w-full h-full flex items-center justify-center m-0 p-0">{initials}</span>
      )}
    </div>
  );
};

export default Avatar;
