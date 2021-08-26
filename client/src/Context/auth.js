import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const tokenKey = process.env.REACT_APP_TOKEN_KEY;

const initialState = {
  user: null,
  postId: null,
};

if (localStorage.getItem(tokenKey)) {
  const decodedToken = jwtDecode(localStorage.getItem(tokenKey));

  if (decodedToken.exp * 1000 < Date.now()) {
    window.location = "/login";
    localStorage.removeItem(tokenKey);
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  postId: null,
  login: (userData) => {},
  logout: () => {},
  editPost: (postId) => {},
  cancelEditPost: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    case "EDIT_POST":
      return {
        ...state,
        postId: action.payload,
      };
    case "CANCEL_EDIT_POST":
      return {
        ...state,
        postId: null,
      };

    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem(tokenKey, userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem(tokenKey);
    dispatch({ type: "LOGOUT", payload: null });
  }
  function editPost(postId) {
    dispatch({ type: "EDIT_POST", payload: postId });
  }

  function cancelEditPost() {
    dispatch({ type: "CANCEL_EDIT_POST", payload: null });
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout,
        postId: state.postId,
        editPost,
        cancelEditPost,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
