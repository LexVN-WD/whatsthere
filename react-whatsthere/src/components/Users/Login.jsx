import { useEffect } from "react";
import jwt_decode from "jwt-decode"
import axios from "axios";

export default function Login({user, setUser, userData, setUserData, userPicture, setUserPicture, userId, setUserId}) {

  const handleCallbackResponse = (response) => {
    // response.credential is an encoded jwt
    const userObj = jwt_decode(response.credential);
    setUser(userObj); // decoded jwt object
    console.log(user)

    const userData = {
      email: userObj.email,
      name: userObj.name,
    };

    const userPic = {
      picture: userObj.picture,
    }

    setUserData(userData);
    setUserPicture(userPic);
    console.log(`UserData: ${userData}`);
  };

  const handleSignOut = () => {
    setUser({});
    setUserData({});
    setUserPicture({});
    google.accounts?.id.prompt();
  };

  const handleLogin = () => {
    google.accounts?.id.prompt();
  };

  useEffect(() => {
    // global google
    if (Object.keys(user).length === 0) {
      google.accounts?.id.initialize({
        client_id:
          "632068121299-unggfu717fg5kklshvbmn1kl6s6nl9ue.apps.googleusercontent.com",
        callback: handleCallbackResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
    }
  }, [user]);

  useEffect(() => {
    if (userData) {
      axios.put("/api/users", userData);
    }
  }, [userData]);

  return (
    <div>
      {Object.keys(user).length === 0 ? (
        <button
          onClick={handleLogin}
          className="bg-tertiary hover:bg-secondary text-white font-bold py-2 px-4 rounded-full"
          >
            Login with Google
          </button>
      ) : (
        <button
          onClick={handleSignOut}
            className="bg-tertiary hover:bg-secondary text-white font-bold py-2 px-4 rounded-full h-full"
        >
          Sign Out
        </button>
      )}
    </div>
  );
}