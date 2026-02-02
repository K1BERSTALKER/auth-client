import React from "react";
import {
  FaGooglePlusG,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

interface SocialIconsProps {
  className?: string;
}

const SocialIcons: React.FC<SocialIconsProps> = ({ className }) => {
  const icons = [
    { icon: <FaGooglePlusG />, href: "#" },
    { icon: <FaFacebookF />, href: "#" },
    { icon: <FaGithub />, href: "#" },
    { icon: <FaLinkedinIn />, href: "#" },
  ];

  return (
    <div className={`flex justify-center space-x-3 my-5 ${className}`}>
      {icons.map((item, idx) => (
        <a
          key={idx}
          href={item.href}
          className="w-10 h-10 flex items-center justify-center border rounded-lg border-gray-300 hover:bg-gray-100 transition"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
