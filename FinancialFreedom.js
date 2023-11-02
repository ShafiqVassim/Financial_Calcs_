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
  Button,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import InputField from "./Components/textFields";
import CalcButton from "./Components/CalcButton";
import ResultSection from "./Components/ResultSection";
import Chart from "react-apexcharts";
import ButtonCalc from "./Components/ButtonCalc";

const FinancialFreedomCalc = () => {
  const [open, setOpen] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [monthlyPension, setMonthlyPension] = useState("");
  const [inflation, setInflation] = useState("");
  const [returnsOnInvestment, setReturnsOnInvestment] = useState("");
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [yearsToGetPension, setYearsToGetPension] = useState("");
  const [financialFreedomResult, setFinancialFreedomResult] = useState(null);
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
      categories: ["Year"],
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
    setMonthlyPension("");
    setInflation("");
    setReturnsOnInvestment("");
    setMonthlyInvestment("");
    setYearsToGetPension("");
    setFinancialFreedomResult("");
    setShowAlert(false);
    setShowOutput(false);
  };

  const handleClear = () => {
    setMonthlyPension("");
    setInflation("");
    setReturnsOnInvestment("");
    setMonthlyInvestment("");
    setYearsToGetPension("");
  };

  const handleCardClick = () => {
    handleClickOpen();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const monthlyPensionValue = parseFloat(monthlyPension);
    const inflationValue = parseFloat(inflation) / 100;
    const returnsOnInvestmentValue = parseFloat(returnsOnInvestment) / 100;
    const monthlyInvestmentValue = parseFloat(monthlyInvestment);
    const yearsToGetPensionValue = parseFloat(yearsToGetPension);
    var arr1 = [];
    var arr2 = [];
    var arr4 = [];
    var arr5 = [];

    var annualPensionValue = monthlyPensionValue * 12;
    var annualInvestmentValue = monthlyInvestmentValue * 12;
    var investmentPerYearValue = annualInvestmentValue * yearsToGetPensionValue;
    var x = annualInvestmentValue;
    arr1.push(x);

    for (var i = 0; i < 100; i++) {
      x = x * (1 + returnsOnInvestmentValue) + annualInvestmentValue;
      arr1.push(Math.round(x));
    }

    var FutureValue = arr1[yearsToGetPensionValue - 1];
    var Wealth = FutureValue - investmentPerYearValue;

    var moneyRequired = annualPensionValue * yearsToGetPensionValue - Wealth;

    var y = moneyRequired;
    arr2.push(y);

    for (var i = 0; i < 100; i++) {
      y = y * (1 + inflationValue);
      arr2.push(Math.round(y));
    }

    var arr3 = [];
    for (var i = 0; i < arr1.length; i++) {
      var minus = arr1[i] - arr2[i];
      arr3.push(minus);
    }

    var counted = 1;
    var i = 0;
    while (arr3[i] < 0) {
      if (counted > 75) {
        setShowAlert(true);
        return;
      }
      counted++;
      i++;
    }

    var z = annualInvestmentValue;
    arr4.push(z);
    for (var i = 1; i < counted; i++) {
      z = z * (1 + returnsOnInvestmentValue) + annualInvestmentValue;
      arr4.push(Math.round(z));
    }

    var w = moneyRequired;
    arr5.push(w);

    for (var i = 1; i < counted; i++) {
      w = w * (1 + inflationValue);
      arr5.push(Math.round(w));
    }

    const targetWealth =
      annualInvestmentValue *
      ((Math.pow(1 + returnsOnInvestmentValue, counted) - 1) /
        returnsOnInvestmentValue);

    const perMonthPensionRequired =
      monthlyPensionValue * Math.pow(1 + inflationValue, counted);

    setFinancialFreedomResult({
      financialFreedomResult: counted,
      targetWealth: Math.round(targetWealth),
      perMonthPensionRequired: Math.round(perMonthPensionRequired),
    });
    setShowOutput(true);

    setChartOptions({
      ...chartOptions,
      xaxis: {
        categories: counted,
        labels: {
          show: true,
        },
        tooltip: {
          enabled: false,
        },
      },

      subtitle: {
        text: "Statistics",
        offsetY: 5,
        offsetX: 2,
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
        name: "Target Wealth",
        data: arr4,
      },
      {
        name: "Monthly Required",
        data: arr5,
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
          <h3>Financial Freedom Calculator</h3>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Financial Freedom Calculator</DialogTitle>
        <DialogContent>
          {!showOutput ? (
            <form onSubmit={handleSubmit}>
              <TextField
                name="monthlyPension"
                label="Monthly Retirement Living Expense"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={monthlyPension}
                onChange={(e) => setMonthlyPension(e.target.value)}
              />
              <TextField
                name="inflation"
                label="Inflation (%)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={inflation}
                onChange={(e) => setInflation(e.target.value)}
              />
              <TextField
                name="returnsOnInvestment"
                label="Returns on Investment (%)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={returnsOnInvestment}
                onChange={(e) => setReturnsOnInvestment(e.target.value)}
              />
              <TextField
                name="monthlyInvestment"
                label="Monthly Wealth Building for Retirement"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(e.target.value)}
              />
              <TextField
                name="yearsToGetPension"
                label="Years to Get Pension"
                fullWidth
                margin="normal"
                required
                type="number"
                step="1"
                value={yearsToGetPension}
                onChange={(e) => setYearsToGetPension(e.target.value)}
              />
              <Dialog open={showAlert} onClose={() => setShowAlert(false)}>
                <DialogTitle>Financial Freedom</DialogTitle>
                <DialogContent>
                  <h3>
                    It will take you{" "}
                    <span style={{ color: "blue" }}>Forever</span> to be
                    financially free.{" "}
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
                Financial Freedom Calculator
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
                              label="Monthly Retirement Living Expense"
                              value={monthlyPension}
                              onChange={(e) =>
                                setMonthlyPension(e.target.value)
                              }
                            />
                            <InputField
                              label="Inflation (%)"
                              value={inflation}
                              onChange={(e) => setInflation(e.target.value)}
                            />
                            <InputField
                              label="Returns on Investment (%)"
                              value={returnsOnInvestment}
                              onChange={(e) =>
                                setReturnsOnInvestment(e.target.value)
                              }
                            />
                            <InputField
                              label="Monthly Wealth Building for Retirement"
                              value={monthlyInvestment}
                              onChange={(e) =>
                                setMonthlyInvestment(e.target.value)
                              }
                            />
                            <InputField
                              label="Years to Get Pension"
                              value={yearsToGetPension}
                              onChange={(e) =>
                                setYearsToGetPension(e.target.value)
                              }
                            />
                            <CalcButton
                              onClear={handleClear}
                              onClose={handleClose}
                            />
                            <Dialog
                              open={showAlert}
                              onClose={() => setShowAlert(false)}
                            >
                              <DialogTitle>Financial Freedom</DialogTitle>
                              <DialogContent>
                                <h3>
                                  It will take you{" "}
                                  <span style={{ color: "blue" }}>Forever</span>{" "}
                                  to be financially free.{" "}
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
                              title="Financially Free in "
                            CopyValue={`${financialFreedomResult.financialFreedomResult} Years`}
                            />
                            <ResultSection
                              title="Target Wealth "
                            CopyValue={`₹ ${financialFreedomResult.targetWealth}`}
                            />
                            <ResultSection
                              title="Per Month Pension Required "
                            CopyValue={`₹ ${financialFreedomResult.perMonthPensionRequired}`}
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
                            height={480}
                            width={620}
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

export default FinancialFreedomCalc;
