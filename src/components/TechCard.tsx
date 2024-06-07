import { useState } from "react";

interface TechCardProps {
  imgSrc: string;
  altText: string;
  techName: string;
}

const TechCard: React.FC<TechCardProps> = ({ imgSrc, altText, techName }) => {
  const [isTechSelected, setIsTechSelected] = useState(false);

  return (
    <div className="flex flex-col items-center justify-between bg-primary-300 p-2 rounded-lg w-[150px] h-[200px] ">
      <div className="w-20 h-20 rounded-full flex items-center justify-center">
        <img src={imgSrc} alt={altText} className="w-22 h-20" />
      </div>
      <span className="mt-2 mb-1 text-center">{techName}</span>
      <label
        className={`border-2 border-primary-200 active:scale-50 transition-all duration-200 ease-in-out ${
          isTechSelected ? "bg-accent-200" : ""
        } w-full flex items-center justify-center rounded-md p-1 cursor-pointer`}
      >
        <input
          type="checkbox"
          checked={isTechSelected}
          onChange={() => setIsTechSelected(!isTechSelected)}
          className="hidden"
        />
        {isTechSelected ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
          </svg>
        )}
      </label>
    </div>
  );
};

export default TechCard;
