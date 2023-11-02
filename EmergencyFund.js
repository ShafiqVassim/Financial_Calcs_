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
    TextField,
    IconButton,
    DialogTitle,
  } from "@mui/material";
  import { Close as CloseIcon } from "@mui/icons-material";
  import InputField from "./Components/textFields";
  import CalcButton from "./Components/CalcButton";
  import ResultSection from "./Components/ResultSection";
  import ButtonCalc from "./Components/ButtonCalc";
  import img from './images/1.webp';

  const EmergencyFundCalc = () => {
    const [open, setOpen] = useState(false);
    const [iconHovered, setIconHovered] = useState(false);
    const [monthlyRent, setMonthlyRent] = useState("");
    const [monthlyExpenses, setMonthlyExpenses] = useState("");
    const [monthlyEMIs, setMonthlyEMIs] = useState("");
    const [monthlyBills, setMonthlyBills] = useState("");
    const [monthlyTravel, setMonthlyTravel] = useState("");
    const [monthsToBuild, setMonthsToBuild] = useState("");
    const [emergencyFundRequired, setEmergencyFundRequired] = useState("");
    const [monthlySavingsRequired, setMonthlySavingsRequired] = useState("");
    const [showOutput, setShowOutput] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setMonthlyRent("");
      setMonthlyExpenses("");
      setMonthlyEMIs("");
      setMonthlyBills("");
      setMonthlyTravel("");
      setMonthsToBuild("");
      setEmergencyFundRequired("");
      setMonthlySavingsRequired("");
      setShowOutput(false);
    };
  
    const handleClear = () => {
      setMonthlyRent("");
      setMonthlyExpenses("");
      setMonthlyEMIs("");
      setMonthlyBills("");
      setMonthlyTravel("");
      setMonthsToBuild("");
    };
  
    const handleCardClick = () => {
      handleClickOpen();
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const rentValue = parseFloat(monthlyRent);
      const expensesValue = parseFloat(monthlyExpenses);
      const emisValue = parseFloat(monthlyEMIs);
      const billsValue = parseFloat(monthlyBills);
      const travelValue = parseFloat(monthlyTravel);
      const monthsToBuildValue = parseFloat(monthsToBuild);
  
      const totalMonthlyExpenses =
        rentValue + expensesValue + emisValue + billsValue + travelValue;
  
      const monthlySavingsRequired = totalMonthlyExpenses;
  
      const emergencyFundRequired = totalMonthlyExpenses * monthsToBuildValue;
  
      setMonthlySavingsRequired(Math.round(monthlySavingsRequired));
      setEmergencyFundRequired(Math.round(emergencyFundRequired));
  
      setShowOutput(true);
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
            <h3>Emergency Fund Calculator</h3>
          </CardContent>
        </Card>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Emergency Fund Calculator</DialogTitle>
          <DialogContent>
            {!showOutput ? (
              <form onSubmit={handleSubmit}>
                <TextField
                  name="monthlyRent"
                  label="Monthly Rent or Maintenance"
                  fullWidth
                  margin="normal"
                  required
                  type="number"
                  step="0.01"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(e.target.value)}
                />
                <TextField
                  name="monthlyExpenses"
                  label="Monthly Household Expenses"
                  fullWidth
                  margin="normal"
                  required
                  type="number"
                  step="0.01"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(e.target.value)}
                />
                <TextField
                  name="monthlyEMIs"
                  label="Monthly EMIs"
                  fullWidth
                  margin="normal"
                  required
                  type="number"
                  step="0.01"
                  value={monthlyEMIs}
                  onChange={(e) => setMonthlyEMIs(e.target.value)}
                />
                <TextField
                  name="monthlyBills"
                  label="Monthly Utility Bills"
                  fullWidth
                  margin="normal"
                  required
                  type="number"
                  step="0.01"
                  value={monthlyBills}
                  onChange={(e) => setMonthlyBills(e.target.value)}
                />
                <TextField
                  name="monthlyTravel"
                  label="Monthly Travel Expenses"
                  fullWidth
                  margin="normal"
                  required
                  type="number"
                  step="0.01"
                  value={monthlyTravel}
                  onChange={(e) => setMonthlyTravel(e.target.value)}
                />
                <TextField
                  name="monthsToBuild"
                  label="Months to Build Emergency Fund"
                  fullWidth
                  margin="normal"
                  required
                  type="number"
                  step="1"
                  value={monthsToBuild}
                  onChange={(e) => setMonthsToBuild(e.target.value)}
                />
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
                  Emergency Fund Calculator
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
                                label="Monthly Rent"
                                value={monthlyRent}
                                onChange={(e) => setMonthlyRent(e.target.value)}
                              />
                              <InputField
                                label="Monthly Expenses"
                                value={monthlyExpenses}
                                onChange={(e) =>
                                  setMonthlyExpenses(e.target.value)
                                }
                              />
                              <InputField
                                label="Monthly EMIs"
                                value={monthlyEMIs}
                                onChange={(e) => setMonthlyEMIs(e.target.value)}
                              />
                              <InputField
                                label="Monthly Bills"
                                value={monthlyBills}
                                onChange={(e) => setMonthlyBills(e.target.value)}
                              />
                              <InputField
                                label="Monthly Travel"
                                value={monthlyTravel}
                                onChange={(e) => setMonthlyTravel(e.target.value)}
                              />
                              <InputField
                                label="Months to Build Emergency Fund"
                                value={monthsToBuild}
                                onChange={(e) => setMonthsToBuild(e.target.value)}
                              />
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
                                title={"Emergency Fund Required"}
                                CopyValue={`₹${emergencyFundRequired}`}
                              />
                              <ResultSection
                                title={"Monthly Savings Required"}
                                CopyValue={`₹${monthlySavingsRequired}`}
                              />
                            </Table>
                          </TableContainer>
                        </CardContent>
                        <Card 
                      style={{
                          height: "100%",
                          overflowY: "auto",
                          marginTop: "1rem",
                        }}
                      >
                      <CardContent align="center">
                        <img src={img} alt="" height={330}   />
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

  export default EmergencyFundCalc;
