import React, { useEffect, useState } from "react";
import Datatable from "@kruti2502/custom-react-datatable";

interface RowType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
interface ColumnType {
  key: keyof RowType;
  label: string;
}

function Table() {
  const [rows, setRows] = useState<RowType[]>();
  const columns: ColumnType[] = [
    { key: "userId", label: "User ID" },
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "completed", label: "Completed" },
  ];
  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setRows(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/todos";
    fetchData(url);
  }, []);

  return (
    <>
      {rows && (
        <Datatable
          {...{ columns, rows }}
          sortable
          paginator
          noOfRowsPerPage={8}
          resizableColumns
          draggable
          filterable
          defaultCheckedCols={["id", "title"]}
          maxHeight={"1000"}
          headerColor={"#3cb371"}
          evenRowColor={"rgb(250, 250, 250)"}
          oddRowColor={"rgb(240, 240, 240)"}
          showGridLines
        />
      )}
    </>
  );
}

export default Table;
