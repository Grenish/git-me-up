import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  avatar_url: string;
  name: string;
  bio: string;
}

const Home: React.FC = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [bgImageUrl, setBgImageUrl] = useState<string | null>(null);
  const [prevUsername, setPrevUsername] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    setUser(null); // Reset user data
    setBgImageUrl(null); // Reset background image
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUser(response.data);
      setBgImageUrl(response.data.avatar_url);
      setPrevUsername(username); // Update the previous username
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetStarted = () => {
    if (user) {
      navigate("/editor", {
        state: { username: user.name, photo: user.avatar_url },
      });
    }
  };

  const handleButtonClick = () => {
    if (username !== prevUsername) {
      handleSearch();
    } else if (user) {
      handleGetStarted();
    }
  };

  useEffect(() => {
    if (username !== prevUsername) {
      setUser(null); // Reset user data if the username changes
    }
  }, [username, prevUsername]);

  return (
    <div className="w-full h-screen bg-bg-50 relative flex flex-col items-center justify-center">
      {bgImageUrl && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center filter blur-lg"
          style={{ backgroundImage: `url(${bgImageUrl})` }}
          aria-hidden="true"
        ></div>
      )}
      <div className="relative z-10 flex flex-col items-center">
        <div className="Caf text-5xl text-transparent py-5 bg-gradient-to-br from-accent-100 to-primary-200 bg-clip-text flex flex-col items-center pt-5">
          <h1>Make Your GitHub Profile</h1>
          <h2>Proo-fessional</h2>
        </div>
        <p className="text-bg-200 bg-text-200 rounded-xl font-Mont font-semibold text-sm text-center px-4">
          You can't put makeup on your face, but we can glam up your GitHub
          Profile!
        </p>
      </div>
      <div className="relative z-10 flex flex-col items-center mt-10 px-4 w-full">
        <div className="flex flex-col w-full max-w-md">
          <label htmlFor="github-username" className="sr-only">
            GitHub Username
          </label>
          <input
            id="github-username"
            type="text"
            className="outline-none w-full text-bg-100 bg-[#ffffff36] rounded-t-lg text-2xl font-Mont px-2 py-1 mt-5"
            placeholder="Enter Your GitHub Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span className="p-0.5 bg-accent-100"></span>
        </div>

        {loading && <Skeleton />}
        {user && <UserInfo user={user} />}

        <button
          onClick={handleButtonClick}
          className="bg-accent-200 text-bg-50 py-2 px-4 mt-5 rounded-lg w-full max-w-xs font-Mont flex justify-between items-center"
          aria-label={user ? "Get Started" : "Search"}
        >
          {user ? "Get Started" : "Search"}
          <code className="text-xs font-bold">
            <kbd>Shift</kbd> <kbd>Enter</kbd>
          </code>
        </button>
      </div>
    </div>
  );
};

export default Home;

const Skeleton: React.FC = () => {
  return (
    <div className="relative flex w-full max-w-md mt-5 animate-pulse gap-2 p-4">
      <div className="h-20 w-20 rounded-full bg-slate-400"></div>
      <div className="flex-1">
        <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
        <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
      </div>
      <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
    </div>
  );
};

interface UserInfoProps {
  user: User;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="flex w-full max-w-md p-4 bg-bg-50 shadow-lg rounded-3xl mt-5">
      <div className="mr-3 flex-shrink-0">
        <img
          className="w-20 h-20 rounded-full object-cover"
          src={user.avatar_url}
          alt={user.name}
        />
      </div>
      <div className="flex flex-col overflow-hidden">
        <span className="text-text-100 text-xl font-bold truncate">
          {user.name}
        </span>
        <span className="text-text-200 text-xs overflow-hidden text-ellipsis">
          {user.bio}
        </span>
      </div>
    </div>
  );
};
