/* eslint-disable react-hooks/exhaustive-deps */
import "./Datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { deleteUser } from "../../api/userApi";
import { useNavigate } from "react-router";

const Datatable = ({ data, dataInfo }) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const navigate = useNavigate();
  const handleDelete = (id) => {
    if (sessionStorage.getItem("adminProfile") && dataInfo === "user") {
      deleteUser(id, sessionStorage.getItem("adminProfile"));
      const updatedRows = rows.filter((row) => row.id !== id);

      setRows(updatedRows);
      navigate("/admin/users");

      console.log(`Deleting row with id ${id}`);
    }
  };

  const handleUpdate = (id) => {
    console.log(`Updating row with id ${id}`);
  };

  useEffect(() => {
    const firstRow = data[0];
    const columnsFromData = Object.keys(firstRow)
      .filter(
        (key) => !["password", "createdAt", "updatedAt", "__v"].includes(key)
      )
      .map((key) => ({
        field: key,
        headerName:
          key === "profilePicture"
            ? "Profile Picture"
            : key.charAt(0).toUpperCase() + key.slice(1),
        width: key === "profilePicture" ? 100 : undefined,
        flex: 1,
        renderCell: (params) => {
          return key === "profilePicture" ? (
            <img
              src={params.value}
              alt="Profile"
              style={{ width: 50, height: 50, objectFit: "cover" }}
            />
          ) : (
            <span>{params.value}</span>
          );
        },
      }));
    columnsFromData.push({
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <button
              className="delete-button"
              onClick={() => handleDelete(params.id)}
            >
              Delete
            </button>
            <button
              className="update-button"
              onClick={() => handleUpdate(params.id)}
            >
              Update
            </button>
          </div>
        );
      },
    });
    setColumns(columnsFromData);

    setRows(
      data.map((row, index) => ({
        id: row._id,
        ...row,
      }))
    );
  }, [data]);
  return (
    <div className="datatable">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
