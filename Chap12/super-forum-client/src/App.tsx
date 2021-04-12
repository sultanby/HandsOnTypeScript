import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import LeftMenu from "./components/areas/LeftMenu";
import Main from "./components/areas/main/Main";
import Nav from "./components/areas/Nav";
import RightMenu from "./components/areas/RightMenu";
import SideBar from "./components/areas/sidebar/SideBar";
import { UserProfileSetType } from "./store/user/Reducer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // todo: replace with GraphQL call
    dispatch({
      type: UserProfileSetType,
      payload: {
        id: 1,
        userName: "testUser",
      },
    });
  }, [dispatch]);


  return (
    <div className="App">
      <Nav></Nav>
      <SideBar></SideBar>
      <LeftMenu></LeftMenu>
      <Main></Main>
      <RightMenu></RightMenu>
    </div>
  );
}

export default App;