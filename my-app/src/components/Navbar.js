import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import axios from "axios";

export function Navbarcomponent() {
  const backend = "http://localhost:3080";
  const [links, setLinks] = useState([]);

  const userDetails = {
    name: "John Smith",
    role: "DPMT_Read",
    authenticated: "true",
  };

  useEffect(() => {
    const userDetails = {
      name: "John Smith",
      role: "DPMT_Read",
      authenticated: "true",
    };

    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(userDetails),
      "SecreyKey_1342523%&##cba"
    ).toString();

    console.log("encryptedval", ciphertext);
    axios
      .post(`${backend}/apps`, {
        ciphertext,
      })
      .then((res) => {
        setLinks(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const contextHandover = (host) => (e) => {
    const uid = uuidv4();
    axios
      .post(`${backend}/createContext`, {
        id: uid,
        apps: links,
        user: userDetails,
      })
      .then((res) => {
        const microAppPath = `${host}/contextRef/${uid}`;
        window.open(microAppPath, "_blank").focus();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <>
      <nav class="navbar">
        <div class="logo">CBA</div>

        <ul class="nav-links">
          <div class="menu">
            {links.map((link) => (
              <li onClick={contextHandover(link.host)}>{link.name}</li>
            ))}
          </div>
        </ul>
      </nav>
    </>
  );
}

export default Navbarcomponent;
