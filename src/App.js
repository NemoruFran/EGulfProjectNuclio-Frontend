import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/footer/footer";
import LoginPage from "./pages/loginpage/loginpage";
import MainPage from "./pages/mainpage/mainpage";
import ProductPage from "./pages/productpage/productpage";
import Header from "./components/header/header";
import FavouritePage from "./pages/favouritepage/favouritepage";
import CreateProductForm from "./pages/productformpage/productformpage";
import "./App.css";
import ProductFormPage from "./pages/productformpage/productformpage";
import ProductCratedPage from "../src/components/productcreated/productcreated";

function App() {
  return (
    <div className="_appBody">
      <Router>
        <Header />
        <hr
          className="_separatorLine1"
          size="1"
          width="99.9%"
          color="#D9D9D9"
        />
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact path="/productpage/:id">
            <ProductPage />
          </Route>
          <Route exact path="/me/favorites">
            <FavouritePage />
          </Route>
          <Route exact path="/me/productcreatedpage/">
            <ProductCratedPage />
          </Route>
          <Route exact path="/productformpage">
            <ProductFormPage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
