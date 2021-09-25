import Header from "./components/Header";
import Registration from "./components/Registration";
import "./default.scss";
import Homepage from "./pages/Homepage";
import { Route, Switch } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <>
      <MainLayout>
        <Switch>
          <Route path="/" component={Homepage} exact />
          <Route path="/register" component={Registration} />
        </Switch>
      </MainLayout>
    </>
  );
}

export default App;
