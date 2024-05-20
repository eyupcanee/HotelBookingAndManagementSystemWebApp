/* eslint-disable react-hooks/exhaustive-deps */
import "./Datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { deleteUser } from "../../api/userApi";
import { deleteHotelManager } from "../../api/hotelManagerApi";
import {
  confirmReservation,
  rejectReservation,
} from "../../api/reservationApi";

const Datatable = ({ data, dataInfo }) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const handleDelete = (id) => {
    if (sessionStorage.getItem("adminProfile") && dataInfo === "user") {
      deleteUser(id, sessionStorage.getItem("adminProfile"));
      const updatedRows = rows.filter((row) => row.id !== id);

      setRows(updatedRows);
      window.location.reload();

      console.log(`Deleting row with id ${id}`);
    } else if (
      sessionStorage.getItem("adminProfile") &&
      dataInfo === "hotelmanager"
    ) {
      deleteHotelManager(id, sessionStorage.getItem("adminProfile"));
      const updatedRows = rows.filter((row) => row.id !== id);

      setRows(updatedRows);
      window.location.reload();

      console.log(`Deleting row with id ${id}`);
    }
  };

  const handleUpdate = (id) => {
    console.log(`Updating row with id ${id}`);
  };

  const handleReject = async (id) => {
    const token = sessionStorage.getItem("hotelManagerProfile");
    if (token) {
      await rejectReservation(id, token);
      window.location.reload();
    }
  };

  const handleConfirm = async (id) => {
    const token = sessionStorage.getItem("hotelManagerProfile");
    if (token) {
      await confirmReservation(id, token);
      window.location.reload();
    }
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
          if (key === "confirmation") {
            if (params.value === null) {
              return (
                <span style={{ color: "black", fontWeight: "600" }}>---</span>
              );
            } else {
              return (
                <span style={{ color: params.value ? "green" : "red" }}>
                  {params.value ? "✔️" : "❌"}
                </span>
              );
            }
          } else if (key === "profilePicture") {
            return (
              <img
                src={params.value}
                alt="Profile"
                style={{ width: 50, height: 50, objectFit: "cover" }}
              />
            );
          } else {
            return <span>{params.value}</span>;
          }
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
          </div>
        );
      },
    });

    if (dataInfo === "reservationmanager") {
      columnsFromData.push({
        field: "confirm",
        headerName: "Confirm Actions",
        width: 200,
        renderCell: (params) => {
          return (
            <div>
              <button
                className="delete-button"
                onClick={() => handleReject(params.id)}
              >
                Reject
              </button>
              <button
                className="update-button"
                onClick={() => handleConfirm(params.id)}
              >
                Confirm
              </button>
            </div>
          );
        },
      });
    }

    if (
      dataInfo === "hoteladmin" ||
      dataInfo === "reservationadmin" ||
      dataInfo === "reservationmanager"
    ) {
      const filteredColumns = columnsFromData.filter(
        (column) => column.field !== "actions"
      );
      setColumns(filteredColumns);
    } else {
      setColumns(columnsFromData);
    }

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
