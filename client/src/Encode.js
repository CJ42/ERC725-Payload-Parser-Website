import React, { useState } from "react";

// Layout
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

// Components
import Button from "@material-ui/core/Button";
import { DataGrid } from "@mui/x-data-grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import { Typography } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";

import { CopyToClipboard } from "react-copy-to-clipboard";

// icons
import SaveIcon from "@material-ui/icons/Save";
import FileCopy from "@material-ui/icons/FileCopy";

const ACTION_SETDATA = "setData";
const ACTION_EXECUTE = "execute";
const ACTION_TRANSFEROWNERSHIP = "transferOwnership";

const ERC725Account = require("./contracts/ERC725Account.json");

export default function Encode(props) {
  const erc725Account = new props.web3.eth.Contract(ERC725Account.abi);
  const [action, setAction] = React.useState("");

  const handleChange = (event) => {
    setAction(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select action</FormLabel>
            <RadioGroup
              aria-label="action"
              name="action"
              value={action}
              onChange={handleChange}
            >
              <FormControlLabel
                value={ACTION_SETDATA}
                control={<Radio />}
                label="Set Data"
              />
              <FormControlLabel
                value={ACTION_EXECUTE}
                control={<Radio />}
                label="Execute"
              />
              <FormControlLabel
                value={ACTION_TRANSFEROWNERSHIP}
                control={<Radio />}
                label="Transfer Ownership"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={9}>
          {action === ACTION_SETDATA && (
            <SetDataEncoder web3={props.web3} account={erc725Account} />
          )}
          {action === ACTION_EXECUTE && (
            <ExecuteEncoder web3={props.web3} account={erc725Account} />
          )}
          {action === ACTION_TRANSFEROWNERSHIP && (
            <TransferOwnershipEncoder web3={props.web3} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

function SetDataEncoder({ web3, account }) {
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

function ExecuteEncoder({ web3, account }) {
  const [operation, setOperation] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState("");

  const [encodedPayload, setEncodedPayload] = useState("");

  return (
    <Grid container>
      <Grid item md={12}>
        <InputLabel id="demo-simple-select-label">Operation</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={operation}
          onChange={(event) => setOperation(event.target.value)}
        >
          <MenuItem value={"0"}>CALL</MenuItem>
          <MenuItem value={"1"}>CREATE</MenuItem>
          <MenuItem value={"2"}>CREATE2</MenuItem>
          <MenuItem value={"3"}>STATICCALL</MenuItem>
          <MenuItem value={"4"}>DELEGATECALL</MenuItem>
        </Select>
      </Grid>
      <Grid item md={12}>
        <TextField
          label="Recipient"
          defaultValue="0xcafe..."
          value={recipient}
          fullWidth
          onChange={(event) => {
            let input = event.target.value;
            setRecipient(input);
          }}
        />
      </Grid>
      <Grid item md={12}>
        <TextField
          label="Amount"
          defaultValue="x LYX"
          value={amount}
          fullWidth
          onChange={(event) => {
            let input = event.target.value;
            setAmount(input);
          }}
        />
      </Grid>
      <Grid item md={12}>
        <TextField
          label="Data"
          defaultValue="0x..."
          value={data}
          fullWidth
          onChange={(event) => {
            let input = event.target.value;
            setData(input);
          }}
        />
      </Grid>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<SaveIcon />}
        onClick={() => {
          setEncodedPayload(
            account.methods
              .execute(operation, recipient, amount, data)
              .encodeABI()
          );
        }}
      >
        Encode ABI
      </Button>
      <EncodedPayload payload={encodedPayload} />
    </Grid>
  );
}

export function TransferOwnershipEncoder() {
  const [newOwner, setNewOwner] = useState("");
  return (
    <TextField
      label="new owner"
      defaultValue="0x..."
      value={newOwner}
      fullWidth
      onChange={(event) => setNewOwner()}
    />
  );
}

function EncodedPayload({ payload }) {
  const [copiedText, setCopiedText] = useState();
  return (
    <>
      <Grid item component={Box} paddingLeft="15px" paddingRight="15px">
        <CopyToClipboard text={payload} onCopy={() => setCopiedText(payload)}>
          <Tooltip
            title={
              copiedText === payload ? "This was Copied!" : "Copy To Clipboard"
            }
            placement="top"
          >
            <Box
              component="button"
              fontFamily="inherit"
              fontSize="16px"
              fontWeight="400"
              lineHeight="1.25"
              display="inline-block"
              width="80%"
              margin=".5rem 0"
              padding="24px"
              textAlign="left"
              border="0"
              borderRadius="4px"
              data-clipboard-text="album-2"
              type="button"
            >
              <div>
                <FileCopy />
                <Typography style={{ wordWrap: "break-word" }}>
                  {payload}
                </Typography>
              </div>
            </Box>
          </Tooltip>
        </CopyToClipboard>
      </Grid>
    </>
  );
}
