import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useGetEntriesQuery } from "../redux/api";

const EntriesList = () => {
  // Navigate to Edit Page
  const navigate = useNavigate();
  const handleEdit = (data) => {
    navigate(`/entry/${data.id}`, { state: data });
  };

  const [entries, setEntries] = useState([
    {
      id: 1,
      name: "Alexandre The Grate",
      sectors: [
        {
          label: "Manufacturing",
          value: 1,
        },
      ],
      agree: true,
    },
    {
      id: 2,
      name: "Htet Wai Yan",
      sectors: [
        {
          label: "Manufacturing",
          value: 1,
        },
        {
          label: "Construction",
          value: 10,
        },
        {
          label: "Other",
          value: 101,
        },
        {
          label: "Something",
          value: 102,
        },
        {
          label: "Construction",
          value: 10,
        },
        {
          label: "Other",
          value: 101,
        },
        {
          label: "Something",
          value: 102,
        },
        {
          label: "Construction",
          value: 10,
        },
        {
          label: "Other",
          value: 101,
        },
        {
          label: "Something",
          value: 102,
        },
        {
          label: "Construction",
          value: 10,
        },
        {
          label: "Other",
          value: 101,
        },
        {
          label: "Something",
          value: 102,
        },
        {
          label: "Construction",
          value: 10,
        },
        {
          label: "Other",
          value: 101,
        },
        {
          label: "Something",
          value: 102,
        },
        {
          label: "Construction",
          value: 10,
        },
        {
          label: "Other",
          value: 101,
        },
        {
          label: "Something",
          value: 102,
        },
      ],
      agree: true,
    },
    {
      id: 3,
      name: "Chit Oo Naung",
      sectors: [
        {
          label: "Manufacturing",
          value: 1,
        },
      ],
      agree: true,
    },
    {
      id: 4,
      name: "Min Han Kyaw",
      sectors: [
        {
          label: "Manufacturing",
          value: 1,
        },
        {
          label: "Construction",
          value: 10,
        },
      ],
      agree: true,
    },
    {
      id: 5,
      name: "Htet Oo Ko",
      sectors: [
        {
          label: "Manufacturing",
          value: 1,
        },
      ],
      agree: true,
    },
    {
      id: 6,
      name: "Zeyar Htet",
      sectors: [
        {
          label: "Manufacturing",
          value: 1,
        },
        {
          label: "Construction",
          value: 10,
        },
      ],
      agree: true,
    },
    {
      id: 7,
      name: "Aung Wai Yan Chit",
      sectors: [
        {
          label: "Manufacturing",
          value: 1,
        },
      ],
      agree: true,
    },
    {
      id: 8,
      name: "Lonely",
      sectors: [
        {
          label: "Manufacturing",
          value: 1,
        },
        {
          label: "Construction",
          value: 10,
        },
      ],
      agree: true,
    },
  ]);

  // Get Data
  const { data, isLoading, isSuccess, error } = useGetEntriesQuery();

  // Pagination
  const [activePage, setActivePage] = useState(1);
  const itemsCountPerPage = 5;
  const totalItemsCount = entries.length;
  const indexOfLastItem = activePage * itemsCountPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsCountPerPage;
  const currentEntries = entries.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mx-auto mt-3 p-3">
      <h1 className="text-lg text-center mx-3 mb-5 font-bold">
        Name & Sectors
      </h1>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <h1>{error ? "ERROR " : data.map((el) => el.id)} </h1>
      )}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-900">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="col-span-4 p-3 w-52">
                Name
              </th>
              <th scope="col" className="col-span-4 p-3">
                Sectors
              </th>
              <th scope="col" className="col-span-3 p-3">
                Agree
              </th>
              <th scope="col" className="col-span-1 p-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentEntries.map((entry, index) => (
              <tr
                className={index % 2 === 0 ? "bg-white" : "bg-slate-100"}
                key={entry.id}
              >
                <td className="p-3">{entry.name}</td>
                <td className="p-3">
                  {entry.sectors.map((sector) => sector.label).join(", ")}
                </td>
                <td className="p-3">{entry.agree ? "Yes" : "No"}</td>
                <td className="p-3">
                  <MdEdit
                    className="hover:text-yellow-500 hover:cursor-pointer"
                    title="Edit"
                    onClick={() => {
                      handleEdit({
                        ...entry,
                        sectors: entry.sectors.map((el) => el.value),
                      });
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-row justify-center my-4">
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={5}
          onChange={(pageNumber) => setActivePage(pageNumber)}
          itemClass="inline-block m-1 p-1  w-6 md:m-3 md:p-3 md:w-10 text-center leading-none border border-gray-300 rounded hover:border-gray-500"
          linkClass="text-black-500 hover:text-blue-800"
          activeLinkClass="text-black font-bold"
        />
      </div>
    </div>
  );
};

export default EntriesList;
