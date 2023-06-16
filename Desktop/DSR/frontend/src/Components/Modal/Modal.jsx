import { Button, Dialog, DialogContent, Fade, Grid } from "@mui/material";
import { Box } from "@mui/system";
import "@fontsource/roboto/500.css";
import React, { forwardRef } from "react";
import { ToastContainer } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

function Modal({ open, update, close }) {
  return (
    <>
      <Dialog
        open={open}
        maxWidth="sm"
        scroll="body"
        onClose={close}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            px: 6,
            py: 4,
            position: "relative",
            height: "400px",
            width: "450px",
          }}
        >
          <Grid cointainer>
            <h4>Today's Updates</h4>
          </Grid>
          <Button
            size="small"
            variant="contained"
            sx={{ position: "absolute", right: "1rem", top: "2rem" }}
            color="error"
            onClick={close}
          >
            <CloseIcon />
          </Button>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  mb: 3,
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                }}
              ></Box>
            </Grid>
            <ToastContainer />
            <div style={{ textAlign: "left" }}>
              {!update ? (
                <center>
                  <span>Not Updated Yet</span>
                </center>
              ) : (
                <>
                  <strong>
                    <span style={{ padding: 2 }}>Attendance:</span>
                  </strong>
                  <span> {update.attendance}</span>
                  <br />
                  <br />
                  <strong>
                    <span>Working Status:</span>
                  </strong>
                  <span> {update.workingStatus}</span>
                  <br />
                  <br />
                  <strong>
                    <span>Updates:</span>
                  </strong>
                  <span> {update.updates}</span>
                </>
              )}
            </div>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Modal;
