import Registration from "./components/Registration";
import Login from "./components/Login";
import "./default.scss";
import Homepage from "./pages/Homepage";
import { Route, Switch } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { auth, handleUserProfile } from "./firebase/utils";
import { useEffect, useState } from "react";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let authListener = null;
    authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      } else {
        setCurrentUser(null);
      }
    });
    return () => {
      authListener();
    };
  }, []);

  return (
    <>
      <MainLayout currentUser={currentUser}>
        <Switch>
          <Route path="/" component={Homepage} exact />
          <Route path="/register" component={Registration} />
          <Route path="/login" component={Login} />
        </Switch>
      </MainLayout>
    </>
  );
};

export default App;
