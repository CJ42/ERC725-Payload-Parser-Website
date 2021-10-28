import React from "react";

// Layout
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

// Elements
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

// Components
import EncoderSetData from "./components/EncoderSetData/EncoderSetData"
import EncoderExecute from "./components/EncoderExecute/EncoderExecute"
import EncoderTransferOwnership from "./components/EncoderTransferOwnership/EncoderTransferOwnership"

const ACTION_SETDATA = "setData";
const ACTION_EXECUTE = "execute";
const ACTION_TRANSFEROWNERSHIP = "transferOwnership";

const ERC725Account = require("./abis/ERC725Account.json");

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
            <EncoderSetData web3={props.web3} account={erc725Account} />
          )}
          {action === ACTION_EXECUTE && (
            <EncoderExecute web3={props.web3} account={erc725Account} />
          )}
          {action === ACTION_TRANSFEROWNERSHIP && (
            <EncoderTransferOwnership web3={props.web3} account={erc725Account} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

