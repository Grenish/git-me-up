import { useLocation } from "react-router-dom";
import { Textarea, Tooltip } from "@nextui-org/react";
import { Kbd } from "@nextui-org/react";
import { TechStack, socials } from "../utils";
import React, { useState } from "react";
import TechCard from "./TechCard";

const Editor = () => {
  const location = useLocation();
  const { username, photo } = location.state || { username: "", photo: "" };
  const bgImageUrl = location.state?.photo;

  const [currentStep, setCurrentStep] = useState(0);
  const [aboutText, setAboutText] = useState("");
  const [socialsText, setSocialsText] = useState("");
  const [selectedTech, setSelectedTech] = React.useState<string[]>([]);

  const FinalData = [aboutText, socialsText, selectedTech];

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
          <AboutPage
            username={username}
            photo={photo}
            onNext={handleNext}
            setAboutText={setAboutText}
          />
        )}
        {currentStep === 1 && (
          <SocialsPage
            onNext={handleNext}
            onBack={handleBack}
            setSocialsText={setSocialsText}
          />
        )}
        {currentStep === 2 && (
          <SelectTech
            onNext={handleNext}
            onBack={handleBack}
            setSelectedTech={setSelectedTech}
          />
        )}
        {currentStep === 3 && <SelectGif onBack={handleBack} />}
      </div>
      <button onClick={() => console.log(FinalData)}>See</button>
    </div>
  );
};

export default Editor;

interface AboutPageProps {
  username: string;
  photo: string;
  onNext: () => void;
  setAboutText: (text: string) => void;
}

const AboutPage = ({
  username,
  photo,
  onNext,
  setAboutText,
}: AboutPageProps) => {
  return (
    <div className="min-w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl Caf">Hi, I'm {username}!</h1>
      <img src={photo} alt={username} className="w-20 h-20 rounded-full mt-4" />
      <div className=" w-1/3 mt-5 ">
        <Textarea
          placeholder="A little about myself"
          className="w-full font-Mont text-sm outline-none"
          onChange={(e) => {
            setAboutText(e.target.value);
            console.log(e.target.value);
          }}
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
  setSocialsText: (name: string, value: string) => void;
}

const SocialsPage = ({ onNext, onBack, setSocialsText }: SocialsPageProps) => {
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
                onChange={(e) => setSocialsText(social.name, e.target.value)}
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
  setSelectedTech: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectTech = ({ onNext, onBack, setSelectedTech }: SelectTechProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

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
      : category.Options.filter(() => selectedItems.includes(category.Title))
  );

  const handleCheckboxChange = (label: string) => {
    setCheckedItems((prevItems) => {
      if (prevItems.includes(label)) {
        console.log(`TechCard unchecked: ${label}`);
        return prevItems.filter((item) => item !== label);
      } else {
        console.log(`TechCard checked: ${label}`);
        return [...prevItems, label];
      }
    });
  };

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
                onClick={() => {
                  setSelectedItems([]);
                  setSelectedTech([]);
                }}
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
          {/* Filtering the categories */}
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
                    checked={checkedItems.includes(option.title)}
                    onClick={() => handleCheckboxChange(option.title)}
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
      <div className="flex items-center w-1/2 mt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path d="M240,88.23a54.43,54.43,0,0,1-16,37L189.25,160a54.27,54.27,0,0,1-38.63,16h-.05A54.63,54.63,0,0,1,96,119.84a8,8,0,0,1,16,.45A38.62,38.62,0,0,0,150.58,160h0a38.39,38.39,0,0,0,27.31-11.31l34.75-34.75a38.63,38.63,0,0,0-54.63-54.63l-11,11A8,8,0,0,1,135.7,59l11-11A54.65,54.65,0,0,1,224,48,54.86,54.86,0,0,1,240,88.23ZM109,185.66l-11,11A38.41,38.41,0,0,1,70.6,208h0a38.63,38.63,0,0,1-27.29-65.94L78,107.31A38.63,38.63,0,0,1,144,135.71a8,8,0,0,0,16,.45A54.86,54.86,0,0,0,144,96a54.65,54.65,0,0,0-77.27,0L32,130.75A54.62,54.62,0,0,0,70.56,224h0a54.28,54.28,0,0,0,38.64-16l11-11A8,8,0,0,0,109,185.66Z"></path>
        </svg>
        <input
          type="text"
          name="Search"
          placeholder="Add a link to GIFs"
          className="bg-transparent outline-none w-full text-bg-50 text-2xl font-Mont px-2 py-1 border-b-2 ml-2 border-b-bg-100"
        />
        <Tooltip
          content="Go to any GIFs website and click share to copy the link"
          className="font-Mont"
        >
          <span className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.15,214.31,142.11ZM140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180Zm28-72c0,17.38-13.76,31.93-32,35.28V144a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8c13.23,0,24-9,24-20s-10.77-20-24-20-24,9-24,20v4a8,8,0,0,1-16,0v-4c0-19.85,17.94-36,40-36S168,88.15,168,108Z"></path>
            </svg>
          </span>
        </Tooltip>
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
