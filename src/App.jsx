import { Route, BrowserRouter, Routes } from "react-router-dom";
import AddData from "./AddEntry/AddEntry";
import EntriesList from "./EntriesList/EntriesList";
import Navbar from "./Navbar/Navbar";
import NotFound from "./NotFoundPage/NotFound";
import Loading from "./Loading/Loading";

import { useGetSectorsQuery, useGetEntriesQuery } from "./redux/api";

const App = () => {
  const { isLoading: sectorIsLoading, isSuccess: sectorIsSuccess } =
    useGetSectorsQuery();

  const {
    isLoading: entriesIsLoading,
    refetch,
    isSuccess: entriesIsSuccess,
  } = useGetEntriesQuery({}, { refetchOnMountOrArgChange: true });

  return (
    <BrowserRouter>
      <Navbar />
      {sectorIsLoading && entriesIsLoading ? (
        <div className="flex text-center">
          <Loading />
        </div>
      ) : sectorIsSuccess && entriesIsSuccess ? (
        <Routes>
          <Route path="/entry-list" element={<EntriesList />} />
          <Route path="">
            <Route index element={<AddData refetch={refetch} />} />
            <Route path="/:entryid" element={<AddData refetch={refetch} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <div className="flex text-center">
          <h1>Loading . . .</h1>
        </div>
      )}
    </BrowserRouter>
  );
};

export default App;
