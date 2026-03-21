import "./App.css";
import { Hero } from "./components/Hero/Hero.jsx";
import { ContactList } from "./components/ContactList/ContactList.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { GlobalStyle } from "./GlobalStyles.js";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Main } from "./App.js";
import { getContacts } from "./redux/selectors.js";
import { fetchContacts } from "./redux/operations.js";

export const App = () => {
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector(getContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Main className="App">
      {isLoading && <p>Loading tasks...</p>}
      {error && <p>{error}</p>}
      <GlobalStyle />
      <Hero />
      <ContactList />
      <Footer />
    </Main>
  );
};

export default App;
