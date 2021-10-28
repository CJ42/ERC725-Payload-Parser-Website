import React, { useState } from "react";

// Layout
import Grid from "@material-ui/core/Grid";

// Elements
import Button from "@material-ui/core/Button";
import { DataGrid } from "@mui/x-data-grid";

// icons
import SaveIcon from "@material-ui/icons/Save";

// Components
import EncodedPayload from "../EncodedPayload/EncodedPayload"

export default function EncoderSetData({ web3, account }) {
    const columns = [
      { field: "id" },
      { field: "key", headerName: "Key", width: 500, editable: true },
      { field: "value", headerName: "Value", width: 500, editable: true },
    ];
  
    const [rows, setRows] = useState([
      { id: 1, key: "<enter key 1>", value: "<enter your value 1" },
    ]);
  
    const [encodedPayload, setEncodedPayload] = useState("");
  
    return (
      <>
        <div style={{ height: 300, width: "100%", marginBottom: 10 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            onCellEditCommit={(element) => {
              let newRows = [...rows];
              let rowIndex = element.id - 1;
              let fieldEdited = element.field;
              newRows[rowIndex][fieldEdited] = element.value;
  
              setRows(newRows);
            }}
          />
        </div>
  
        <Grid container justifyContent="center" spacing="5">
          <Grid key="0" item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                let newRows = [...rows];
                console.log(newRows);
                let newId = newRows.length + 1;
                newRows.push({
                  id: newId,
                  key: "enter your key",
                  value: "enter your value",
                });
                setRows(newRows);
              }}
            >
              Add Row
            </Button>
          </Grid>
          <Grid key="1" item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              onClick={() => {
                let keys = rows.map((row) => row.key);
                let values = rows.map((row) => row.value);
  
                setEncodedPayload(
                  account.methods.setData(keys, values).encodeABI()
                );
              }}
            >
              Encode ABI
            </Button>
          </Grid>
        </Grid>
        <div style={{ height: 300, width: "100%", marginBottom: 10 }}>
          <EncodedPayload payload={encodedPayload} />
        </div>
      </>
    );
  }