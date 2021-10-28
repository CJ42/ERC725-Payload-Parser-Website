import React, { useState } from "react";

// Layout
import Grid from "@material-ui/core/Grid";

// Elements
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

// Icons
import SaveIcon from "@material-ui/icons/Save";

// Components
import EncodedPayload from "../EncodedPayload/EncodedPayload"

export default function EncoderExecute({ web3, account }) {
    const [operation, setOperation] = useState("");
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [data, setData] = useState("");
  
    const [encodedPayload, setEncodedPayload] = useState("");
  
    return (
      <>
        <Grid container justifyContent="center">
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
        </Grid>
        <div
          style={{ height: 300, width: "100%", marginBottom: 10, marginTop: 10 }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
            onClick={() => {
              let weiAmount = web3.utils.toWei(amount);
              setEncodedPayload(
                account.methods
                  .execute(operation, recipient, weiAmount, data)
                  .encodeABI()
              );
            }}
          >
            Encode ABI
          </Button>
          <EncodedPayload payload={encodedPayload} />
        </div>
      </>
    );
  }