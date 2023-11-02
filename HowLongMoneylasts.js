import React, { useState } from "react";
import {
  Button,
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
  DialogActions,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import InputField from "./Components/textFields";
import CalcButton from "./Components/CalcButton";
import ResultSection from "./Components/ResultSection";
import Chart from "react-apexcharts";
import ButtonCalc from "./Components/ButtonCalc";


const HowLongMoneyWillLastCalc = () => {
  const [open, setOpen] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [totalWealth, setTotalWealth] = useState("");
  const [returnRate, setReturnRate] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [yearsToLast, setYearsToLast] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "financial-freedom-chart",
      toolbar: {
        show: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    xaxis: {
      title: {
        text: "Year",
        offsetX: 0,
        offsetY: 10,
        style: {
          fontSize: "12px",
          fontWeight: 450,
          cssClass: "apexcharts-xaxis-title",
        },
      },
    },
    yaxis: {
      title: {
        text: "Wealth Left",
        offsetX: 0,
        offsetY: 10,
        style: {
          fontSize: "12px",
          fontWeight: 450,
          cssClass: "apexcharts-yaxis-title",
        },
      },
    },
  });
  const [chartSeries, setChartSeries] = useState([
    {
      name: "Target Value",
      data: [],
    },
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTotalWealth("");
    setReturnRate("");
    setInflationRate("");
    setMonthlyExpenses("");
    setYearsToLast("");
    setShowAlert(false);
    setShowOutput(false);
  };

  const handleClear = () => {
    setTotalWealth("");
    setReturnRate("");
    setInflationRate("");
    setMonthlyExpenses("");
  };

  const handleCardClick = () => {
    handleClickOpen();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalWealthValue = parseFloat(totalWealth);
    const returnRateValue = parseFloat(returnRate) / 100;
    const inflationRateValue = parseFloat(inflationRate) / 100;
    const monthlyExpensesValue = parseFloat(monthlyExpenses);

    const yearlyExpenses = monthlyExpensesValue * 12;
    const calc = totalWealthValue - yearlyExpenses;

    const arr = [yearlyExpenses];
    let currentYearlyExpenses = yearlyExpenses;
    for (let i = 0; i < 100; i++) {
      currentYearlyExpenses = currentYearlyExpenses * (1 + inflationRateValue);
      arr.push(currentYearlyExpenses);
    }

    const arr2 = [calc];
    const x = calc * (1 + returnRateValue);
    arr2.push(Math.round(x));
    for (let i = 1; i < 100; i++) {
      const years = Math.round((arr2[i] - arr[i]) * (1 + returnRateValue));
      arr2.push(years);
    }

    const arr3 = [calc];
    let count = 0;
    for (let i = 1; i < 100; i++) {
      const difference = Math.round(arr2[i] - arr[i]);
      arr3.push(difference);
    }

    for (let i = 0; i < arr3.length; i++) {
      if (arr3[i] > 0) {
        count += 1;
      }
    }

    let yearsToLast;

    if (count > 60) {
      setShowAlert(true);
      yearsToLast = "Forever";
    } else {
      yearsToLast = count;
    }

    const arr4 = [];

    for (let i = 0; i < arr3.length; i++) {
      if (arr3[i] > 0) {
        arr4.push(arr3[i]);
      }
    }

    setYearsToLast(yearsToLast);
    setShowOutput(true);

    setChartOptions({
      ...chartOptions,
      xaxis: {
        categories: yearsToLast,
        labels: {
          show: true,
        },
        title: {
          text: "Years to Last",
          offsetX: 25,
          offsetY: 0,
          style: {
          fontSize: "12px",
          fontWeight: 450,
          cssClass: "apexcharts-xaxis-title",
          },
        },
        tooltip: {
          enabled: false,
        },
      },
      stroke: {
        curve: "smooth",
        width: 4,
      },

      markers: {
        size: 2,
        strokeWidth: 0,
        hover: {
          size: 7,
        },
      },
      grid: {
        show: true,
        padding: {
          bottom: 0,
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        offsetY: -20,
      },
    });

    setChartSeries([
      {
        name: "Wealth Last per Annum",
        data: arr4,
      },
    ]);
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
          <h3>How Long Money Will Last</h3>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>How Long Money Will Last Calculator</DialogTitle>
        <DialogContent>
          {!showOutput ? (
            <form onSubmit={handleSubmit}>
              <TextField
                name="totalWealth"
                label="Total Wealth Available"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={totalWealth}
                onChange={(e) => setTotalWealth(e.target.value)}
              />
              <TextField
                name="returnRate"
                label="Return Generated per Year (%)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={returnRate}
                onChange={(e) => setReturnRate(e.target.value)}
              />
              <TextField
                name="inflationRate"
                label="Inflation Rate (%)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={inflationRate}
                onChange={(e) => setInflationRate(e.target.value)}
              />
              <TextField
                name="monthlyExpenses"
                label="Monthly Expenses Required Today (Pension)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(e.target.value)}
              />
              <Dialog open={showAlert} onClose={() => setShowAlert(false)}>
                <DialogTitle>How Long Money Will Last</DialogTitle>
                <DialogContent>
                  <h3>
                    Your wealth will last for{" "}
                    <span style={{ color: "blue" }}>Forever</span>{" "}
                  </h3>
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
                How Long Money Will Last Calculator
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
                  maxWidth: "1100px",
                  maxHeight: "650px",
                }}
              >
                <Grid container style={{ height: "100%" }}>
                  {/* Left Side (Input Fields) */}
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
                              label="Total Wealth"
                              value={totalWealth}
                              onChange={(e) => setTotalWealth(e.target.value)}
                            />
                            <InputField
                              label="Return Rate"
                              value={returnRate}
                              onChange={(e) => setReturnRate(e.target.value)}
                            />
                            <InputField
                              label="Inflation Rate"
                              value={inflationRate}
                              onChange={(e) => setInflationRate(e.target.value)}
                            />
                            <InputField
                              label="Monthly Expenses"
                              value={monthlyExpenses}
                              onChange={(e) =>
                                setMonthlyExpenses(e.target.value)
                              }
                            />
                            <Dialog
                              open={showAlert}
                              onClose={() => setShowAlert(false)}
                            >
                              <DialogTitle>
                                How Long Money Will Last
                              </DialogTitle>
                              <DialogContent>
                                <h3>
                                  Your wealth will last for{" "}
                                  <span style={{ color: "primary" }}>
                                    Forever
                                  </span>{" "}
                                </h3>
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
                              title="Your Wealth will last for "
                              CopyValue={`${yearsToLast} Years`}
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
                          <Chart
                            options={chartOptions}
                            series={chartSeries}
                            type="line"
                            height={400}
                          />
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

export default HowLongMoneyWillLastCalc;
