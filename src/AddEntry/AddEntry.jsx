import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import { string, array, boolean, object } from "yup";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Sectors from "../Sectors/Sectors";
import { useAddEntryMutation } from "../redux/api";

import { useSelector } from "react-redux";
import toast from "react-hot-toast";

let userSchema = object({
  name: string().required("Name cannot be blank."),
  sectors: array().min(1, "At least one sector is required."),
  agree: boolean().oneOf([true], "Please agree to the terms to continue."),
});

const AddData = () => {
  // handle edit data
  const { state } = useLocation();
  const { entryid } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const [selectedSectors, setSelectedSectors] = useState([]);
  const [data, setData] = useState({
    id: "",
    name: "",
    sectors: [],
    agree: true,
  });

  const { data: usrData } = useSelector((state) => state.entries);

  const [addEntry, { data: newData, isLoading, error }] = useAddEntryMutation();

  useEffect(() => {
    if (entryid) {
      setIsEditing(true);
      setData(state);
      setSelectedSectors(state.sectors);
    } else {
      setIsEditing(false);
      setSelectedSectors([]);
      setData({
        id: "",
        name: "",
        sectors: [],
        agree: true,
      });
    }
  }, [entryid]);

  return (
    <div className="flex justify-center items-center h-45">
      <Formik
        initialValues={data}
        validationSchema={userSchema}
        enableReinitialize={true}
        onSubmit={async (values) => {
          toast.success("Successfully added entry!", {
            duration: 2000,
          });
          // await addEntry(values);
          // alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ errors, touched }) => (
          <div>
            <div className="p-5">
              <h1 className="text-lg text-center mx-3 mb-5 font-bold">
                {isEditing ? "Edit" : "Add"} Entry
              </h1>
              <h3>
                Please enter your name and pick the Sectors you are currently
                involved in.
              </h3>
            </div>

            <Form className="w-full max-w-lg mx-auto mt-5 px-4 py-5 bg-white-300 rounded-lg shadow-md">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-800 font-bold">
                  Name
                </label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Jane"
                  disabled={false}
                  className={`mt-2 p-2 w-full rounded shadow-inner ${
                    errors.name && touched.name
                      ? "border-red-500 border-2"
                      : "border"
                  }`}
                />
                <ErrorMessage
                  component="div"
                  name="name"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="sectors"
                  className="block text-gray-800 font-bold"
                >
                  Sectors
                </label>
                <FieldArray
                  name="sectors"
                  render={(arrayHelpers) => (
                    <Sectors
                      errors={errors}
                      touched={touched}
                      isEditing={isEditing}
                      arrayHelpers={arrayHelpers}
                      selectedSectors={selectedSectors}
                      setSelectedSectors={setSelectedSectors}
                    />
                  )}
                />
                <ErrorMessage
                  component="div"
                  name="sectors"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <Field
                  type="checkbox"
                  id="agree"
                  name="agree"
                  className={`mt-2 me-2 inline-block ${
                    errors.agree && touched.agree
                      ? "border-red-500 border-2"
                      : "border"
                  }`}
                />
                <label
                  htmlFor="agree"
                  className="inline me-5 mt-5 text-gray-800 font-bold"
                >
                  Agree to terms
                </label>
                <br></br>
                <ErrorMessage
                  component="div"
                  name="agree"
                  className="text-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white font-semibold rounded-lg"
              >
                {isEditing ? "Update" : "Submit"}
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default AddData;
