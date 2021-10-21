import React, { useState } from 'react';

import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import LaunchIcon from '@material-ui/icons/Launch';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// Layout
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

// Components
import Alert from '@material-ui/lab/Alert';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';

const SETDATA = "14a6e293"
const EXECUTE = "44c028fe"
const TRANSEFEROWNERSHIP = "f2fde38b"

export default function Decode(props) {
  const defaultChips = {
    "setData": "default",
    "execute": "default",
    "transferOwnership": "default",
  }

  const [selector, setSelector] = useState("");
  const [payload, setPayload] = useState("")
  const [chipsBackground, setChipsBackground] = useState(defaultChips);

  const showFunction = (selector) => {
    // always start with the default chips
    let newChipsBackground = defaultChips

    // find which selector it is + edit the background in the property
    switch(selector) {
      case SETDATA:
          newChipsBackground.setData = "primary"
          break;
        case EXECUTE:
          newChipsBackground.execute = "primary"
          break;
      case TRANSEFEROWNERSHIP:
          newChipsBackground.transferOwnership = "primary"
          break;
    }
    // update the state
    setChipsBackground(newChipsBackground)
  }

  return (
      <div>
          <TextareaAutosize 
            width={900}
            minRows={8}
            maxRows={8}
            placeholder="Paste your abi here..." 
            onChange={(event) => {
              let input = event.target.value;
              // check that the input start with 0x

              // get the first 4 bytes
              let selector = input.slice(2, 10)
              let payload = input.slice(10)

              setSelector(selector)
              setPayload(payload)
              showFunction(selector)
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing="3"
                >
                  <Chip icon={<PlaylistAddIcon />} label="Set Data" color={chipsBackground.setData} />
                  <Chip icon={<LaunchIcon />} label="Execute" color={chipsBackground.execute} />
                  <Chip icon={<AccountCircleIcon />} label="Transfer Ownership" color={chipsBackground.transferOwnership} />
                </Grid>
              </Grid>
              <Grid item xs={9}>
                {selector === SETDATA && DecodeSetData(payload, props.web3)}
                {selector === EXECUTE && DecodeExecute(payload, props.web3)}
                {selector === TRANSEFEROWNERSHIP && DecodeTransferOwnership(payload, props.web3)}
              </Grid>
            </Grid>
          </Box>
      </div>
  )
}

function DecodeSetData(payload, web3) {
  let result = web3.eth.abi.decodeParameters(["bytes32[]", "bytes[]"], payload)
  return (
    <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div>
            <List dense={true}>
                <ListItem>
                  <b>Keys</b>
                </ListItem>
                {result[0].map(key => (
                  <ListItem style={{ fontSize: '10px' }}>
                    {key}
                  </ListItem>
                ))}
            </List>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            <List dense={true}>
              <ListItem>
                <b>Values</b>
              </ListItem>
              {result[1].map(value => (
                  <ListItem style={{ fontSize: '10px' }}>
                    {value}
                  </ListItem>
                ))}
            </List>
          </div>
        </Grid>
    </Grid>
    
  )
}

function DecodeExecute(payload, web3) {
  let result = web3.eth.abi.decodeParameters(["uint256", "address", "uint256", "bytes"], payload)
  console.log(result)

  return (
    <Grid container>
      <Grid item md={12}>
        <TextField
          label="Operation"
          defaultValue="..."
          value={result[0]}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item md={12}>
        <TextField
          label="Recipient"
          defaultValue="0xcafe..."
          value={result[1]}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item md={12}>
        <TextField
          label="Amount"
          defaultValue="x LYX"
          value={result[2]}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item md={12}>
        <TextField
          label="Data"
          defaultValue="0x..."
          value={result[3]}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
    </Grid>
  )
}

function DecodeTransferOwnership(payload, web3) {
  let result = web3.eth.abi.decodeParameters(["address"], payload)
  return (
    <Grid item md={12}>
      <Alert severity="warning">
        <b>Warning! </b>
        This payload transfer ownership to {result[0]}.<br/> Be cautious!
      </Alert>
      <TextField
          label="new owner"
          defaultValue="0x..."
          value={result[0]}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
    </Grid>
  )
}
