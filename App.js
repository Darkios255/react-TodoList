import React, { useState } from "react";
import { TokenContext, UsernameContext } from "./Context/Context";
import Navigation from "./Navigation/Navigation";

// Composant principal de l'application gérant les contextes globaux
export default function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");

  return (
    <UsernameContext.Provider value={[username, setUsername]}>
      <TokenContext.Provider value={[token, setToken]}>
        <Navigation />
      </TokenContext.Provider>
    </UsernameContext.Provider>
  );
}
