import React, { useState } from "react";

// Elements
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// Icons
import SaveIcon from "@material-ui/icons/Save";

// Components
import EncodedPayload from "../EncodedPayload/EncodedPayload"

export default function EncoderTransferOwnership({ web3, account }) {
    const [newOwner, setNewOwner] = useState("");
    
    const [encodedPayload, setEncodedPayload] = useState("");
    
    return (
        <>
            <TextField
                label="new owner"
                defaultValue="0x..."
                value={newOwner}
                fullWidth
                onChange={(event) => setNewOwner(event.target.value)}
            />
            <div
                style={{ height: 300, width: "100%", marginBottom: 10, marginTop: 10 }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveIcon />}
                    onClick={() => {
                        setEncodedPayload(
                            account.methods
                            .transferOwnership(newOwner)
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