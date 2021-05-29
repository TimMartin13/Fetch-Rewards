import React, { useState, useEffect } from "react";
import { DataGrid } from '@material-ui/data-grid';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  const getData = async () => {
    // The only proxy I could find that would work from this website
    // https://nordicapis.com/10-free-to-use-cors-proxies/
    const proxy = "https://thingproxy.freeboard.io/fetch/";
    const response = await fetch(proxy + "https://fetch-hiring.s3.amazonaws.com/hiring.json");
    // Get the data
    const responseData = await response.json();
    // console.log({ responseData });
    const cleanData = await responseData
      // Filter null or empty names
      .filter((entry) => entry.name)
      // Sort by listId and then by id which is the same number as in the name
      .sort((a, b) => {
        return a.listId - b.listId || a.id - b.id;
      });
    // console.log({ cleanData });
    // Put clean/sorted data into our state variable
    setData(cleanData);
  };

  // Get the data on mount
  useEffect(() => {
    getData();
  }, []);

  // Data Grid essentials here: https://material-ui.com/components/data-grid/getting-started/
  const columns = [
    { field: 'listId', headerName: 'ListId', width: 120 },
    { field: 'name', headerName: 'Name', width: 120 },
    { field: 'id', headerName: 'Id', width: 120 },
  ];

  return (
    <div className="App">
      <header className="App-header">
          Data
      </header>
      <DataGrid rows={ data } columns={ columns } />
    </div>
  );
}

export default App;
