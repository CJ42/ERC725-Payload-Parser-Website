import React, { useState } from 'react';

// Layout
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

// Components
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

const ACTION_SETDATA = "setData"
const ACTION_EXECUTE = "execute"
const ACTION_TRANSFEROWNERSHIP = "transferOwnership"

export default function RadioButtonsGroup() {
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
            <RadioGroup aria-label="action" name="action" value={action} onChange={handleChange}>
              <FormControlLabel value={ACTION_SETDATA} control={<Radio />} label="Set Data" />
              <FormControlLabel value={ACTION_EXECUTE} control={<Radio />} label="Execute" />
              <FormControlLabel value={ACTION_TRANSFEROWNERSHIP} control={<Radio />} label="Transfer Ownership" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={9}>
            {action === ACTION_SETDATA && setDataEncoder()}
            {action === ACTION_EXECUTE && <ExecuteEncoder />}
            {action === ACTION_TRANSFEROWNERSHIP && <TransferOwnershipEncoder />}
        </Grid>
      </Grid>
    </Box>    
  );
}

function setDataEncoder() {
  return "setData encoder..."
}

function ExecuteEncoder() {
  const [operation, setOperation] = useState("")
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [data, setData] = useState("")

  return (
    <Grid container>
      <Grid item md={12}>
        <TextField
          label="Operation"
          defaultValue="..."
          value={operation}
          fullWidth
        />
      </Grid>
      <Grid item md={12}>
        <TextField
          label="Recipient"
          defaultValue="0xcafe..."
          value={recipient}
          fullWidth
        />
      </Grid>
      <Grid item md={12}>
        <TextField
          label="Amount"
          defaultValue="x LYX"
          value={amount}
          fullWidth
        />
      </Grid>
      <Grid item md={12}>
        <TextField
          label="Data"
          defaultValue="0x..."
          value={data}
          fullWidth
        />
      </Grid>
    </Grid>
  )
}

export function TransferOwnershipEncoder() {
  const [newOwner, setNewOwner] = useState("")
  return (
    <TextField
        label="new owner"
        defaultValue="0x..."
        value={newOwner}
        fullWidth
      />
  )
}