import React, { useEffect, useState } from "react";

import { getPublicContent } from "../services/user.service";

import * as AuthService from "../services/auth.service";
import IUser from '../types/user.type';

const Home: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

  }, []);

  useEffect(() => {
    getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        <br />
        <h4>Welcome {currentUser?.username}</h4>
      </header>
    </div>
  );
};

export default Home;
