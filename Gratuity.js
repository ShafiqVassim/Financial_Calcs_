import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogContent,
  Grid,
  TableContainer,
  Table,
  IconButton,
  DialogTitle,
  Button,
  DialogActions,
  TextField,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import InputField from "./Components/textFields";
import CalcButton from "./Components/CalcButton";
import ResultSection from "./Components/ResultSection";
import ButtonCalc from "./Components/ButtonCalc";
import img from './images/3.webp'

const GratuityCalc = () => {
  const [open, setOpen] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [lastDrawnSalary, setLastDrawnSalary] = useState("");
  const [yearsWorked, setYearsWorked] = useState("");
  const [monthsWorked, setMonthsWorked] = useState("");
  const [gratuityResult, setGratuityResult] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [monthlyWorkedValue, setMonthlyWorkedValue] = useState("");
  const [showAlertM, setShowAlertM] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLastDrawnSalary("");
    setYearsWorked("");
    setMonthsWorked("");
    setGratuityResult("");
    setShowAlert(false);
    setShowAlertM(false);
    setShowOutput(false);
  };

  const handleClear = () => {
    setLastDrawnSalary("");
    setYearsWorked("");
    setMonthsWorked("");
    setMonthlyWorkedValue("");
  };

  const handleCardClick = () => {
    handleClickOpen();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const salaryValue = parseFloat(lastDrawnSalary);
    const yearsValue = parseFloat(yearsWorked);
    const monthsValue = parseFloat(monthlyWorkedValue);

    if (yearsValue < 5) {
      setShowAlert(true);
      return;
    }

    let totalcal = 0;
    if (monthsValue > 6) {
      totalcal = yearsValue + 1;
    } else {
      totalcal = yearsValue;
    }

    const gratuity = totalcal * salaryValue * (15 / 26);
    setGratuityResult(Math.round(gratuity.toFixed(2)));

    setShowOutput(true);
  };

  const handleMonthlyWorkedChange = (e) => {
    const inputValue =
      e.target.value.trim() !== "" ? parseInt(e.target.value) : "";
    if (inputValue === "" || (inputValue >= 1 && inputValue <= 12)) {
      setMonthlyWorkedValue(inputValue);
      setShowAlertM(false);
    } else {
      setShowAlertM(true);
    }
  };

  const handleCloseAlertMonthly = () => {
    setShowAlertM(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <Card className="completed">
        <CardContent onClick={handleCardClick}>
          <h3>Gratuity Calculator</h3>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Gratuity Calculator</DialogTitle>
        <DialogContent>
          {!showOutput ? (
            <form onSubmit={handleSubmit}>
              <TextField
                name="lastDrawnSalary"
                label="Last Drawn Monthly Salary"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={lastDrawnSalary}
                onChange={(e) => setLastDrawnSalary(e.target.value)}
              />
              <div style={{ display: "flex" }}>
                <TextField
                  name="yearsWorked"
                  label="Years Worked"
                  fullWidth
                  margin="normal"
                  required
                  type="number"
                  step="1"
                  value={yearsWorked}
                  onChange={(e) => setYearsWorked(e.target.value)}
                />
                <TextField
                  name="monthsWorked"
                  label="Months Worked"
                  fullWidth
                  margin="normal"
                  type="number"
                  step="1"
                  value={monthlyWorkedValue}
                  onChange={handleMonthlyWorkedChange}
                />

                <Dialog open={showAlertM} onClose={handleCloseAlertMonthly}>
                  <DialogTitle>Alert</DialogTitle>
                  <DialogContent>
                    <p>Months worked must be between 1 and 12.</p>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleCloseAlertMonthly}
                      color="primary"
                      variant="contained"
                      autoFocus
                    >
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog open={showAlert} onClose={() => setShowAlert(false)}>
                  <DialogTitle>Alert</DialogTitle>
                  <DialogContent>
                    <p>Years worked must be greater than or equal to 5.</p>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setShowAlert(false)}
                      color="primary"
                      variant="contained"
                      autoFocus
                    >
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              <ButtonCalc onClose={handleClose} />
            </form>
          ) : (
            <Dialog
              open={open}
              onClose={handleClose}
              maxWidth={false}
              style={{
                margin: "auto",
                maxWidth: "1250px",
                maxHeight: "750px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DialogTitle style={{ marginBottom: "-20px", fontSize: "22px" }}>
                Gratuity Calculator
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                style={{ position: "absolute", right: 10, top: 10 }}
              >
                <CloseIcon
                  color={iconHovered ? "error" : "primary"}
                  onMouseEnter={() => setIconHovered(true)}
                  onMouseLeave={() => setIconHovered(false)}
                />
              </IconButton>
              <DialogContent
                style={{
                  width: "100%",
                  maxWidth: "1050px",
                  maxHeight: "750px",
                }}
              >
                <Grid container style={{ height: "100%" }}>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    style={{ height: "100%", overflowY: "auto" }}
                  >
                    <Card style={{ height: "100%" }}>
                      <CardContent>
                        <form onSubmit={handleSubmit}>
                          <Grid container spacing={1}>
                            <InputField
                              label="Last Drawn Salary"
                              value={lastDrawnSalary}
                              onChange={(e) =>
                                setLastDrawnSalary(e.target.value)
                              }
                            />
                            <InputField
                              label="Years Worked"
                              value={yearsWorked}
                              onChange={(e) => setYearsWorked(e.target.value)}
                            />
                            <InputField
                              label="Months Worked"
                              value={monthlyWorkedValue}
                              onChange={handleMonthlyWorkedChange}
                            />
                            <Dialog
                              open={showAlertM}
                              onClose={handleCloseAlertMonthly}
                            >
                              <DialogTitle>Alert</DialogTitle>
                              <DialogContent>
                                <p>Months worked must be between 1 and 12.</p>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={handleCloseAlertMonthly}
                                  color="primary"
                                  variant="contained"
                                  autoFocus
                                >
                                  OK
                                </Button>
                              </DialogActions>
                            </Dialog>
                            <Dialog
                              open={showAlert}
                              onClose={() => setShowAlert(false)}
                            >
                              <DialogTitle>Alert</DialogTitle>
                              <DialogContent>
                                <p>
                                  Years worked must be greater than or equal to
                                  5.
                                </p>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={() => setShowAlert(false)}
                                  color="primary"
                                  variant="contained"
                                  autoFocus
                                >
                                  OK
                                </Button>
                              </DialogActions>
                            </Dialog>
                            <CalcButton
                              onClear={handleClear}
                              onClose={handleClose}
                            />
                          </Grid>
                        </form>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={8} style={{ height: "100%" }}>
                    <Card
                      style={{
                        height: "15%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent style={{ flex: 1 }}>
                      <Typography variant="h4">Result</Typography>
                        <TableContainer>
                          <Table>
                            <ResultSection
                              title="Gratuity Amount is "
                              CopyValue={`₹${gratuityResult}`}
                            />
                          </Table>
                        </TableContainer>
                      </CardContent>
                      <Card 
                      style={{
                          height: "100%",
                          overflowY: "auto",
                          marginTop: "-3rem",
                          marginRight: "3rem",
                        }}
                      >
                      <CardContent align="center">
                        <img src={img} alt="" height={400}   />
                      </CardContent>
                      </Card>
                    </Card>
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GratuityCalc;
