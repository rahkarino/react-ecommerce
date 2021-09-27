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
import Dashboard from "./pages/Dashboard";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
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
        dispatch(setCurrentUser(userAuth));
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
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </MainLayout>
    </>
  );
};

export default App;
