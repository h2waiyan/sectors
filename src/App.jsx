import { Route, BrowserRouter, Routes } from "react-router-dom";
import AddData from "./AddEntry/AddEntry";
import EntriesList from "./EntriesList/EntriesList";
import Navbar from "./Navbar/Navbar";
import NotFound from "./NotFoundPage/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<EntriesList />} />
        <Route path="entry">
          <Route index element={<AddData />} />
          <Route path="/entry/:entryid" element={<AddData />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
