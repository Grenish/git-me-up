import React, { useState } from "react";
import axios from "axios";

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
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-bg-50 relative">
      {bgImageUrl && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center filter blur-lg"
          style={{ backgroundImage: `url(${bgImageUrl})` }}
        ></div>
      )}
      <div className="relative z-10 flex flex-col items-center">
        <div className="Caf text-5xl text-transparent py-5 bg-gradient-to-br from-accent-100 to-accent-200 bg-clip-text flex flex-col items-center pt-5">
          <h1>Make Your GitHub Profile</h1>
          <h2>Proo-fessional</h2>
        </div>
        <p className="text-text-200 font-Mont text-sm">
          You can't put makeup on your face, but we can glam up your GitHub
          Profile!
        </p>
      </div>
      <div className="relative z-10 flex flex-col items-center mt-10">
        <div className="flex flex-col w-1/4">
          <input
            type="text"
            className="bg-transparent outline-none w-full text-text-200 text-2xl font-Mont px-2 py-1 mt-5"
            placeholder="Enter Your GitHub Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span className="p-0.5 bg-accent-100"></span>
        </div>

        {loading && <Skeleton />}
        {user && <UserInfo user={user} />}

        <button
          onClick={handleSearch}
          className="bg-accent-200 text-bg-50 py-2 px-4 mt-5 rounded-lg w-1/6 font-Mont flex justify-between items-center"
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
    <div className="relative flex w-1/4 mt-5 animate-pulse gap-2 p-4">
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
    <div className="flex w-1/4 p-4 bg-bg-50 shadow-lg rounded-3xl mt-5">
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
