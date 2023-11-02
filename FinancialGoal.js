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
  MenuItem,
  TextField,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import InputField from "./Components/textFields";
import CalcButton from "./Components/CalcButton";
import ResultSection from "./Components/ResultSection";
import ReactApexChart from "react-apexcharts";
import ButtonCalc from "./Components/ButtonCalc";


const FinancialGoalCalc = () => {
  const [selectedGoal, setSelectedGoal] = useState("");
  const goalNames = [
    "Adventure",
    "Career",
    "Charity",
    "Community",
    "Creativity",
    "Education",
    "Family",
    "Financial Stability",
    "Fitness",
    "Health",
    "Happiness",
    "Hobbies",
    "HomeOwnership",
    "Learning",
    "Personal Growth",
    "Peace of Mind",
    "Relationships",
    "Retirement",
    "Savings",
    "Travel",
  ];
  const [open, setOpen] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [currentAmount, setCurrentAmount] = useState("");
  const [yearsLeft, setYearsLeft] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [expectedReturns, setExpectedReturns] = useState("");
  const [financialGoalResult, setFinancialGoalResult] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentAmount("");
    setYearsLeft("");
    setInflationRate("");
    setExpectedReturns("");
    setSelectedGoal("");
    setFinancialGoalResult("");
    setShowOutput(false);
  };
  const handleClear = () => {
    setCurrentAmount("");
    setYearsLeft("");
    setInflationRate("");
    setExpectedReturns("");
    setSelectedGoal("");
  };

  const handleCardClick = () => {
    handleClickOpen();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const principal = parseFloat(currentAmount);
    const years = parseFloat(yearsLeft);
    const inflation = parseFloat(inflationRate) / 100;
    const returns = parseFloat(expectedReturns) / 100;

    let futureTargetValue = principal * Math.pow(1 + inflation, years);
    const firstdata = futureTargetValue * (returns / 12);
    const second = Math.pow(1 + returns / 12, years * 12);
    let monthlyInvestment = firstdata / (second - 1);

    setFinancialGoalResult({
      futureTargetValue: Math.round(futureTargetValue),
      monthlyInvestmentRequired: Math.round(monthlyInvestment),
    });
    setShowOutput(true);
  };

  const chartData = {
    series: [
      parseFloat(financialGoalResult.futureTargetValue),
      parseFloat(financialGoalResult.monthlyInvestmentRequired),
    ],
    options: {
      chart: {
        width: 300,
        type: "pie",
      },
      labels: ["Future Target Value", "Monthly Investment"],
      legend: {
        position: "right",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap-reverse",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <Card className="completed">
        <CardContent onClick={handleCardClick}>
          <h3 variant="h5">Financial Goal Calculator</h3>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Financial Goal Calculator</DialogTitle>
        <DialogContent>
          {!showOutput ? (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="goal"
                    label="Select a Goal"
                    select
                    margin="normal"
                    required
                    value={selectedGoal}
                    onChange={(e) => setSelectedGoal(e.target.value)}
                  >
                    <MenuItem disabled>Choose a Goal</MenuItem>
                    {goalNames.map((goal) => (
                      <MenuItem key={goal} value={goal}>
                        {goal}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    name="currentAmount"
                    label="Amount Required Today"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="0.01"
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(e.target.value)}
                  />
                  <TextField
                    name="yearsLeft"
                    label="Years Left to Achieve Goal"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="1"
                    value={yearsLeft}
                    onChange={(e) => setYearsLeft(e.target.value)}
                  />
                  <TextField
                    name="inflationRate"
                    label="Yearly Inflation Rate (%)"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="0.01"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(e.target.value)}
                  />
                  <TextField
                    name="expectedReturns"
                    label="Years Returns Expected (%)"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="0.01"
                    value={expectedReturns}
                    onChange={(e) => setExpectedReturns(e.target.value)}
                  />
                </Grid>
              </Grid>
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
                Financial Goal Calculator
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
                            <Grid item xs={12} style={{ width: "250px" }}>
                              <TextField
                                fullWidth
                                name="goal"
                                label="Select a Goal"
                                select
                                margin="normal"
                                required
                                value={selectedGoal}
                                onChange={(e) =>
                                  setSelectedGoal(e.target.value)
                                }
                              >
                                <MenuItem disabled>Choose a Goal</MenuItem>
                                {goalNames.map((goal) => (
                                  <MenuItem key={goal} value={goal}>
                                    {goal}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>
                            <InputField
                              label="Current Amount"
                              value={currentAmount}
                              onChange={(e) => setCurrentAmount(e.target.value)}
                            />
                            <InputField
                              label="Years Left to Achieve Goal"
                              value={yearsLeft}
                              onChange={(e) => setYearsLeft(e.target.value)}
                            />
                            <InputField
                              label="Inflation Rate (%)"
                              value={inflationRate}
                              onChange={(e) => setInflationRate(e.target.value)}
                            />
                            <InputField
                              label="Expected Returns (%)"
                              value={expectedReturns}
                              onChange={(e) =>
                                setExpectedReturns(e.target.value)
                              }
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
                              title="Future Target Value is "
                              CopyValue={`₹${financialGoalResult.futureTargetValue}`}
                            />
                            <ResultSection
                              title="Monthly Investment Required"
                              CopyValue={`₹${financialGoalResult.monthlyInvestmentRequired}`}
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
                        <CardContent>
                          {chartData && (
                            <ReactApexChart
                              options={chartData.options}
                              series={chartData.series}
                              type="pie"
                              width={500}
                            />
                          )}
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


export default FinancialGoalCalc;
