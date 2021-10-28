import React, { useState } from "react";

// Layout
import Grid from "@material-ui/core/Grid";

// Components
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";

// icons
import FileCopy from "@material-ui/icons/FileCopy";

export default function EncodedPayload({ payload }) {
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