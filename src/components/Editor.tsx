import { useLocation } from "react-router-dom";
import { Textarea, Tooltip } from "@nextui-org/react";
import { Kbd } from "@nextui-org/react";
import { TechStack, socials } from "../utils";
import { useState } from "react";
import TechCard from "./TechCard";

const Editor = () => {
  const location = useLocation();
  const { username, photo } = location.state || { username: "", photo: "" };
  const bgImageUrl = location.state?.photo;


  const [currentStep, setCurrentStep] = useState(0);
  

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  

  return (
    <div>
      {bgImageUrl && (
        <div
          className="absolute inset-0 z-[-1] bg-cover bg-center filter blur-lg"
          style={{ backgroundImage: `url(${bgImageUrl})` }}
        ></div>
      )}
      <div className="relative flex">
        {currentStep === 0 && (
          <AboutPage username={username} photo={photo} onNext={handleNext} />
        )}
        {currentStep === 1 && (
          <SocialsPage onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 2 && (
          <SelectTech onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 3 && <SelectGif onBack={handleBack} />}
      </div>
    </div>
  );
};

export default Editor;

interface AboutPageProps {
  username: string;
  photo: string;
  onNext: () => void;
}

const AboutPage = ({ username, photo, onNext }: AboutPageProps) => {
  return (
    <div className="min-w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl Caf">Hi, I'm {username}!</h1>
      <img src={photo} alt={username} className="w-20 h-20 rounded-full mt-4" />
      <div className=" w-1/3 mt-5 ">
        <Textarea
          placeholder="A little about myself"
          className="w-full font-Mont text-sm outline-none"
        />
        <div className="flex justify-end items-center mt-2">
          <Tooltip
            content="Generate Idea"
            placement="bottom"
            className="text-xs font-Mont"
          >
            <button className="mr-2 p-2 text-text-200 hover:text-primary-200 transition-colors duration-200 ease-in-out">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z"></path>
              </svg>
            </button>
          </Tooltip>
          <button
            onClick={onNext}
            className="bg-accent-200 w-1/2 text-bg-50 py-2 px-4 rounded-xl font-Mont flex items-center justify-center"
          >
            <span className="w-full text-sm">Next</span>
            <Kbd
              className="bg-primary-300 text-bg-200 w-1/4 flex items-center justify-center space-x-2"
              keys={["shift", "enter"]}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

interface SocialsPageProps {
  onNext: () => void;
  onBack: () => void;
}

const SocialsPage = ({ onNext, onBack }: SocialsPageProps) => {
  return (
    <div className="min-w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold Caf bg-[#ffffff46] p-1 rounded-lg">
        Add Your Socials
      </h1>
      <div className="w-1/2 flex justify-between flex-wrap">
        {socials.map((social) => (
          <div
            className="flex items-center justify-center mt-5"
            key={social.name}
          >
            <div className="flex flex-col">
              <label htmlFor={`${social.name}-username`} className="sr-only">
                {social.name} username
              </label>
              <input
                type="text"
                id={`${social.name}-username`}
                className="bg-transparent outline-none w-full text-gray-700 text-2xl px-2 py-1"
                placeholder={`${social.name} username`}
                aria-label={`${social.name} username`}
              />
              <span className="p-0.5 bg-accent-100"></span>
            </div>
            <img
              src={social.image}
              alt={`${social.name} logo`}
              className="w-9 h-9 object-cover ml-2"
            />
          </div>
        ))}
        <div className="w-full mt-10 flex">
          <button
            onClick={onBack}
            className="border-3 border-accent-200 hover:bg-accent-100 hover:text-white w-1/2 text-accent-100 transition-colors duration-200 ease-in-out py-2 px-4 rounded-xl flex items-center justify-center mr-10"
            aria-label="Go Back"
          >
            <span className="w-full text-sm">Go Back</span>
          </button>
          <button
            onClick={onNext}
            className="bg-accent-200 hover:bg-primary-300 transition-colors duration-200 ease-in-out w-1/2 text-white py-2 px-4 rounded-xl flex items-center justify-center"
            aria-label="Next"
          >
            <span className="w-full text-sm">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface SelectTechProps {
  onNext: () => void;
  onBack: () => void;
}

const SelectTech = ({ onNext, onBack }: SelectTechProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleItemClick = (label: string) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(label)
        ? prevSelectedItems.filter((item) => item !== label)
        : [...prevSelectedItems, label]
    );
  };

  const filteredTechStack = TechStack.map((category) => ({
    ...category,
    Options: category.Options.filter((option) =>
      option.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  const selectedOptions = filteredTechStack.flatMap((category) =>
    selectedItems.length === 0
      ? category.Options
      : category.Options.filter((option) =>
          selectedItems.includes(category.Title)
        )
  );

  return (
    <div className="min-w-full h-screen flex flex-col items-center justify-center pb-5">
      <h1 className="text-3xl Caf bg-[#ffffff46] p-1 rounded-lg">
        Add Your Tech Stack
      </h1>
      <div className="border-3 border-bg-100 w-[95%] rounded-xl h-[80%] mt-5 flex overflow-hidden">
        <div className="border-r-3 border-bg-100 w-1/5 py-5 px-2 flex flex-col overflow-x-auto custom-scroll">
          <div className="mb-2">
            <Tooltip content="Clear Selection" placement="right">
              <button
                onClick={() => setSelectedItems([])}
                className="bg-[#ffffff46] p-1 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M235.5,216.81c-22.56-11-35.5-34.58-35.5-64.8V134.73a15.94,15.94,0,0,0-10.09-14.87L165,110a8,8,0,0,1-4.48-10.34l21.32-53a28,28,0,0,0-16.1-37,28.14,28.14,0,0,0-35.82,16,.61.61,0,0,0,0,.12L108.9,79a8,8,0,0,1-10.37,4.49L73.11,73.14A15.89,15.89,0,0,0,55.74,76.8C34.68,98.45,24,123.75,24,152a111.45,111.45,0,0,0,31.18,77.53A8,8,0,0,0,61,232H232a8,8,0,0,0,3.5-15.19ZM67.14,88l25.41,10.3a24,24,0,0,0,31.23-13.45l21-53c2.56-6.11,9.47-9.27,15.43-7a12,12,0,0,1,6.88,15.92L145.69,93.76a24,24,0,0,0,13.43,31.14L184,134.73V152c0,.33,0,.66,0,1L55.77,101.71A108.84,108.84,0,0,1,67.14,88Zm48,128a87.53,87.53,0,0,1-24.34-42,8,8,0,0,0-15.49,4,105.16,105.16,0,0,0,18.36,38H64.44A95.54,95.54,0,0,1,40,152a85.9,85.9,0,0,1,7.73-36.29l137.8,55.12c3,18,10.56,33.48,21.89,45.16Z"></path>
                </svg>
              </button>
            </Tooltip>
          </div>
          {TechStack.map((tech) => (
            <SelectableItem
              key={tech.Title}
              label={tech.Title}
              isSelected={selectedItems.includes(tech.Title)}
              onClick={() => handleItemClick(tech.Title)}
            />
          ))}
        </div>
        <div className="flex flex-col w-full">
          <div className="p-5 border-b-3 border-b-bg-100 flex items-center bg-[#ffffff46]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
            </svg>
            <input
              type="search"
              name="Search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-full text-bg-50 text-2xl font-Mont px-2 py-1 border-b-2 ml-2 border-b-bg-100"
            />
          </div>
          <div className="p-5 flex flex-wrap gap-2 overflow-x-auto custom-scroll">
            <div className="flex items-center w-full flex-wrap gap-2 justify-center">
              {selectedOptions.length > 0 ? (
                selectedOptions.map((option, index) => (
                  <TechCard
                    key={`${option.title}-${index}`}
                    imgSrc={option.logo}
                    altText={option.title}
                    techName={option.title}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center bg-[#ffffff46] p-3 rounded-lg font-Mont">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="102"
                    height="102"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <path d="M176,140a12,12,0,1,1-12-12A12,12,0,0,1,176,140ZM128,92a12,12,0,1,0-12,12A12,12,0,0,0,128,92Zm73-38A104,104,0,0,0,50.48,197.33,8,8,0,1,0,62.4,186.66a88,88,0,1,1,131.19,0,8,8,0,0,0,11.93,10.67A104,104,0,0,0,201,54ZM152,168H136c-21.74,0-48-17.84-48-40a41.33,41.33,0,0,1,.55-6.68,8,8,0,1,0-15.78-2.64A56.9,56.9,0,0,0,72,128c0,14.88,7.46,29.13,21,40.15C105.4,178.22,121.07,184,136,184h16a8,8,0,0,1,0,16H96a24,24,0,0,0,0,48,8,8,0,0,0,0-16,8,8,0,0,1,0-16h56a24,24,0,0,0,0-48Z"></path>
                  </svg>
                  <p>It looks like we don't have that yet.</p>
                  <p>Care to give a feedback?</p>
                  <button
                    onClick={() => alert("Feedback button clicked")}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Give Feedback
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 mt-10 flex">
        <button
          onClick={onBack}
          className="border-3 border-accent-200 hover:bg-accent-100 hover:text-white w-1/2 text-accent-100 transition-colors duration-200 ease-in-out py-2 px-4 rounded-xl flex items-center justify-center mr-10"
          aria-label="Go Back"
        >
          <span className="w-full text-sm">Go Back</span>
        </button>
        <button
          onClick={onNext}
          className="bg-accent-200 hover:bg-primary-300 transition-colors duration-200 ease-in-out w-1/2 text-white py-2 px-4 rounded-xl flex items-center justify-center"
          aria-label="Next"
        >
          <span className="w-full text-sm">Next</span>
        </button>
      </div>
    </div>
  );
};

interface SelectableItemProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function SelectableItem({ label, isSelected, onClick }: SelectableItemProps) {
  return (
    <span
      onClick={onClick}
      className={`border-2 border-accent-200 hover:bg-accent-200 active:bg-primary-300  ${
        isSelected ? "bg-accent-200" : "bg-[#ffffff46]"
      } p-2 rounded-lg mb-2`}
    >
      {label}
    </span>
  );
}

interface SelectGifProps {
  onBack: () => void;
}

const SelectGif = ({ onBack }: SelectGifProps) => {
  return (
    <div className="min-w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl Caf bg-[#ffffff46] p-1 rounded-lg">
        A Gify a day, makes a developer... <br /> procrastinate in a delightful
        way.
      </h1>
      <div className="flex items-center mt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
        </svg>
        <input
          type="text"
          name="Search"
          placeholder="Search GIFs"
          className="bg-transparent outline-none w-full text-bg-50 text-2xl font-Mont px-2 py-1 border-b-2 ml-2 border-b-bg-100"
        />
      </div>
      <div className="w-[80%] p-5 border-2 border-bg-50 rounded-xl mt-5"></div>
      <div className="w-1/2 mt-10 flex">
        <button
          onClick={onBack}
          className="border-3 border-accent-200 hover:bg-accent-100 hover:text-white w-1/2 text-accent-100 transition-colors duration-200 ease-in-out py-2 px-4 rounded-xl flex items-center justify-center mr-10"
          aria-label="Go Back"
        >
          <span className="w-full text-sm">Go Back</span>
        </button>
        <button
          className="bg-accent-200 hover:bg-primary-300 transition-colors duration-200 ease-in-out w-1/2 text-white py-2 px-4 rounded-xl flex items-center justify-center"
          aria-label="Create"
        >
          <span className="w-full text-sm">Create</span>
        </button>
      </div>
    </div>
  );
};
