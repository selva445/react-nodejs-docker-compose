import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function Navbarcomponent() {
  const contextHandover = (e) => {
    const uid = uuidv4();
    const microAppPath = `http://localhost:3001/contextRef=${uid}`;
    window.open(microAppPath, "_blank").focus();
  };
  return (
    <>
      <nav class="navbar">
        <div class="logo">CBA</div>

        <ul class="nav-links">
          <div class="menu">
            <li onClick={contextHandover}>HomeLoan</li>
            <li>CBA</li>
            <li>Netbank</li>
          </div>
        </ul>
      </nav>
    </>
  );
}

export default Navbarcomponent;
