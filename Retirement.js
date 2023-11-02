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
  TextField,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import InputField from "./Components/textFields";
import CalcButton from "./Components/CalcButton";
import ResultSection from "./Components/ResultSection";
import ButtonCalc from "./Components/ButtonCalc";
import img1 from "./images/2.jpeg";
import Chart from "react-apexcharts";

const RetirementCalc = () => {
  const [open, setOpen] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [retirementTillAge, setRetirementTillAge] = useState("");
  const [inflation, setInflation] = useState("");
  const [returns, setReturns] = useState("");
  const [currentInvestment, setCurrentInvestment] = useState("");
  const [monthlyExpensesat, setmonthlyExpensesat] = useState("");
  const [corpusNeeded, setcorpusNeeded] = useState("");
  const [monthlyNeeded, setmonthlyNeeded] = useState("");
  const [showOutput, setShowOutput] = useState(false); // New state variable for output visibility
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "future-value-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      title: {
        text: "Year",
        offsetX: 0,
        offsetY: 10,
        style: {
          fontSize: "12px",
          fontWeight: 600,
          cssClass: "apexcharts-xaxis-title",
        },
      },
    },
    yaxis: {
      title: {
        text: "Corpus Left",
        offsetX: 0,
        offsetY: 10,
        style: {
          fontSize: "12px",
          fontWeight: 400,
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
    setMonthlyExpenses("");
    setCurrentAge("");
    setRetirementAge("");
    setRetirementTillAge("");
    setInflation("");
    setReturns("");
    setCurrentInvestment("");
    setmonthlyExpensesat("");
    setcorpusNeeded("");
    setmonthlyNeeded("");
    setShowOutput(false);
  };

  const handleClear = () => {
    setMonthlyExpenses("");
    setCurrentAge("");
    setRetirementAge("");
    setRetirementTillAge("");
    setInflation("");
    setReturns("");
    setCurrentInvestment("");
  };

  const handleCardClick = () => {
    handleClickOpen();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const expensesValue = parseFloat(monthlyExpenses);
    const currentAgeValue = parseFloat(currentAge);
    const retirementAgeValue = parseFloat(retirementAge);
    const retirementTillAgeValue = parseFloat(retirementTillAge);
    const inflationValue = parseFloat(inflation) / 100;
    const returnsValue = parseFloat(returns) / 100;
    const currentInvestmentValue = parseFloat(currentInvestment);
  
    const yearsToRetirement = retirementAgeValue - currentAgeValue;
    const yearsAfterRetirement = retirementTillAgeValue - retirementAgeValue;
  
    const monthlyExpenseatValue =
      expensesValue * Math.pow(1 + inflationValue, yearsToRetirement);
    console.log("monthlyExpenseatValue", monthlyExpenseatValue);
  
    const corpusNeededValue =
      monthlyExpenseatValue *
      12 *
      ((1 -
        Math.pow(1 + (1 + returnsValue) / (1 + inflationValue) - 1, -yearsAfterRetirement)) /
        ((1 + returnsValue) / (1 + inflationValue) - 1)) -
      currentInvestmentValue;
    console.log("corpusNeededValue", corpusNeededValue);
  
    const monthlyNeededValue =
      (corpusNeededValue * (returnsValue / 12)) /
      (Math.pow(1 + returnsValue / 12, yearsToRetirement * 12) - 1);
    console.log("monthlyNeededValue", monthlyNeededValue);
  
    const chartup = retirementAge - currentAge;
    console.log("chartup", chartup);

    let a = monthlyNeededValue * 12;
    console.log("initial value", a);

    const calculatedValues = [Math.round(a)];

    for (let i = 1; i < chartup; i++) {
      const b = a * (1 + returnsValue) + monthlyNeededValue * 12;
      a = b;
      calculatedValues.push(Math.round(a));
      console.log("a", Math.round(a));
    }

    console.log("calculatedValues", calculatedValues);

    const currentYear = new Date().getFullYear(); // Get the current year
    const years = [currentYear + 1];

    for (let i = 1; i < chartup - 1; i++) {
      const year = currentYear + 1 + i;
      years.push(year);
    }
    console.log("years", years);

    let next_chart = parseInt(calculatedValues.slice(-1));
    console.log(next_chart);
    let array2 = [];
    let power_value = chartup + 1;

    while (next_chart > 0) {
      let part2 = Math.round(
        monthlyExpenses * 12 * Math.pow(1 + inflationValue, power_value)
      );
      console.log(part2);
      power_value += 1;
      // console.log((next_chart))
      next_chart = next_chart * (1 + returnsValue) - part2;

      if (next_chart > 0) {
        array2.push(Math.floor(next_chart));
      }
    }
    console.log("ghj", array2);

    const yearsArray2 = [];
    let nextYear = years[years.length - 1] + 1;
    for (let i = 0; i <= array2.length; i++) {
      yearsArray2.push(nextYear);
      nextYear++;
    }

    console.log("yearsArray2", yearsArray2);

    console.log("yearsArray2", yearsArray2);
    console.log("array2", array2);

    setmonthlyExpensesat(Math.round(monthlyExpenseatValue));
    setcorpusNeeded(Math.floor(Math.round(corpusNeededValue)));
    setmonthlyNeeded(Math.floor(Math.round(monthlyNeededValue)));
    setShowOutput(true);

    const allYears = [...years, ...yearsArray2];

    // Calculate the length of calculatedValues
    const calculatedValuesLength = calculatedValues.length;

    // Create a new array containing null values to fill the gap between calculatedValues and array2
    const nullValues = Array(calculatedValuesLength).fill(null);

    // Combine the null values and array2 data
    const combinedData = [...nullValues, ...array2];
    console.log("combinedData", combinedData);

    setChartOptions({
      ...chartOptions,
      chart: {
        type: "bar",
        stacked: "false",
        height: 380,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: allYears,
        title: {
          text: "Year",
          offsetX: 0,
          offsetY: -10,
          style: {
            fontSize: "12px",
            fontWeight: 450,
            cssClass: "apexcharts-xaxis-title",
          },
        },
        tickAmount: Math.ceil(allYears.length / 3),
      },
      dataLabels: {
        enabled: false,
        fontSize: "12px",
      },
      annotations: {
        xaxis: [
          {
            x: years[years.length + 2],

            borderColor: "#000",
            borderWidth: 1,
            label: {
              borderColor: "#000",
              style: {
                fontSize: "12px",
                color: "#fff",
                background: "#000",
                padding: {
                  left: 5,
                  right: 5,
                  top: 2,
                  bottom: 2,
                },
              },
              text: "Retirement",
            },
          },
        ],
      },
      legend: {
        position: "top",
      },
    });

    setChartSeries([
      {
        name: "Accumulation",
        data: calculatedValues,
      },
      {
        name: "Distribution",
        data: combinedData,
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
          <h3>Retirement Calculator</h3>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Retirement Calculator</DialogTitle>
        <DialogContent>
          {!showOutput ? (
            <form onSubmit={handleSubmit}>
              <TextField
                name="monthlyExpenses"
                label="Monthly Expenses (past retirement)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(e.target.value)}
              />
              <TextField
                name="currentAge"
                label="Current Age"
                fullWidth
                margin="normal"
                required
                type="number"
                step="1"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
              />
              <TextField
                name="retirementAge"
                label="Retirement Age"
                fullWidth
                margin="normal"
                required
                type="number"
                step="1"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
              />
              <TextField
                name="retirementTillAge"
                label="Retirement Till Age"
                fullWidth
                margin="normal"
                required
                type="number"
                step="1"
                value={retirementTillAge}
                onChange={(e) => setRetirementTillAge(e.target.value)}
              />
              <TextField
                name="inflation"
                label="Inflation Retirement (%)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={inflation}
                onChange={(e) => setInflation(e.target.value)}
              />

              <TextField
                name="returns"
                label="Returns Retirement (%)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={returns}
                onChange={(e) => setReturns(e.target.value)}
              />

              <TextField
                name="currentInvestment"
                label="Current Investment for Retirement"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={currentInvestment}
                onChange={(e) => setCurrentInvestment(e.target.value)}
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
                Retirement Calculator
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
                  maxHeight: "750px",
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
                              label="Monthly Expenses (past retirement)"
                              value={monthlyExpenses}
                              onChange={(e) =>
                                setMonthlyExpenses(e.target.value)
                              }
                            />
                            <InputField
                              label="Current Age"
                              value={currentAge}
                              onChange={(e) => setCurrentAge(e.target.value)}
                            />
                            <InputField
                              label="Retirement Age"
                              value={retirementAge}
                              onChange={(e) => setRetirementAge(e.target.value)}
                            />
                            <InputField
                              label="Retirement Till Age"
                              value={retirementTillAge}
                              onChange={(e) =>
                                setRetirementTillAge(e.target.value)
                              }
                            />
                            <InputField
                              label="Inflation Retirement (%)"
                              value={inflation}
                              onChange={(e) => setInflation(e.target.value)}
                            />
                            <InputField
                              label="Returns Retirement (%)"
                              value={returns}
                              onChange={(e) => setReturns(e.target.value)}
                            />
                            <InputField
                              label="Current Investment for Retirement"
                              value={currentInvestment}
                              onChange={(e) =>
                                setCurrentInvestment(e.target.value)
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
                              title="Corpus Needed At Retirement"
                              CopyValue={`₹${corpusNeeded}`}
                            />
                            <ResultSection
                              title="Monthly Investment Needed"
                              CopyValue={`₹${monthlyNeeded}`}
                            />
                            <ResultSection
                              title="Monthly Expenses At Retirement at 60"
                              CopyValue={`₹${monthlyExpensesat}`}
                            />
                          </Table>
                        </TableContainer>
                      </CardContent>
                      <Card
                        style={{
                          height: "100%",
                          overflowY: "auto",
                          marginTop: "-2rem",
                        }}
                      >
                        <CardContent align="center">
                          {/* <img src={img1} alt="" height={480}   /> */}
                          {Chart && (
                            <Chart
                              options={chartOptions}
                              series={chartSeries}
                              type="bar"
                              height={450}
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

export default RetirementCalc;
