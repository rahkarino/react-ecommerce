import Register from "./components/Register";
import Login from "./components/Login";
import Recovery from "./components/Recovery";
import "./default.scss";
import Homepage from "./pages/Homepage";
import { Route, Switch } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { auth, handleUserProfile } from "./firebase/utils";
import { useEffect } from "react";
import { setCurrentUser } from "./redux/User/user.actions";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let authListener = null;
    authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          dispatch(
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data(),
            })
          );
        });
      } else {
        setCurrentUser(null);
      }
    });
    return () => {
      // will-unmount
      authListener();
    };
  }, []);

  return (
    <>
      <MainLayout>
        <Switch>
          <Route path="/" component={Homepage} exact />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/recovery" component={Recovery} />
        </Switch>
      </MainLayout>
    </>
  );
};

export default App;
