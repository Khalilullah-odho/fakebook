import React from "react";
import { AuthProvider } from "./Context/auth";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import AuthForm from "./Components/Auth/AuthForm";
import ProtectedRoute from "./Components/Utils/ProtectedRoute";
import Home from "./Components/Pages/Home";
import Profile from "./Components/Pages/Profile";
import Followers from "./Components/Pages/Followers";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={AuthForm} />
          <Route exact path="/:username/followers" component={Followers} />
          <Route exact path="/:username" component={Profile} />
          <ProtectedRoute component={Home} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
