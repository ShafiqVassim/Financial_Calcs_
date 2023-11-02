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
import ReactApexChart from "react-apexcharts";
import ButtonCalc from "./Components/ButtonCalc";

const CostOfDelayCalc = () => {
  const [open, setOpen] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [costOfDelayWithDelay, setCostOfDelayWithDelay] = useState("");
  const [costOfDelayWithoutDelay, setCostOfDelayWithoutDelay] = useState("");
  const [targetWealthReduction, setTargetWealthReduction] = useState("");
  const [newSipRequired, setNewSipRequired] = useState("");
  const [sipPerMonth, setSipPerMonth] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [numOfYears, setNumOfYears] = useState("");
  const [delayInInvestment, setDelayInInvestment] = useState("");
  const [chartData, setChartData] = useState(null);
  const [showOutput, setShowOutput] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCostOfDelayWithDelay("");
    setCostOfDelayWithoutDelay("");
    setTargetWealthReduction("");
    setNewSipRequired("");
    setSipPerMonth("");
    setExpectedReturn("");
    setNumOfYears("");
    setDelayInInvestment("");
    setChartData(null);
    setShowOutput(false);
  };

  const handleClear = () => {
    setSipPerMonth("");
    setExpectedReturn("");
    setNumOfYears("");
    setDelayInInvestment("");
  };

  const handleCardClick = () => {
    handleClickOpen();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sipValue = parseFloat(sipPerMonth) * 12;
    const returnValue = parseFloat(expectedReturn) / 100;
    const yearsValue = parseFloat(numOfYears);
    const delayValue = parseFloat(delayInInvestment);

    const costOfDelayWithoutDelay =
      (sipValue * (Math.pow(1 + returnValue, yearsValue) - 1)) / returnValue;

    const costOfDelayWithDelay =
      (sipValue * (Math.pow(1 + returnValue, yearsValue - delayValue) - 1)) /
      returnValue;

    const newSipRequired =
      (costOfDelayWithoutDelay * (returnValue / 12)) /
      (Math.pow(1 + returnValue / 12, (yearsValue - delayValue) * 12) - 1);

    const targetWealthReduction =
      (costOfDelayWithoutDelay - costOfDelayWithDelay) /
      costOfDelayWithoutDelay;

    setCostOfDelayWithDelay(Math.round(costOfDelayWithDelay));
    setCostOfDelayWithoutDelay(Math.round(costOfDelayWithoutDelay));
    setTargetWealthReduction(Math.round(targetWealthReduction * 100));
    setNewSipRequired(Math.round(newSipRequired));

    setShowOutput(true);

    const chartData = {
      series: [
        {
          name: "Cost of Delay Data",
          data: [
            Math.floor(Math.round(costOfDelayWithoutDelay)),
            Math.floor(Math.round(costOfDelayWithDelay)),
          ],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 450,
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
          },
        },
        xaxis: {
          categories: ["Without Delay", "With Delay"],
        },
        legend: {
          position: "top",
        },
        fill: {
          opacity: 1,
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return Math.floor(Math.round(val));
          },
          style: {
            colors: ["#fff"],
          },
        },
      },
    };

    setChartData(chartData);
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
          <h3>Cost of Delay Calculator</h3>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cost of Delay Calculator</DialogTitle>
        <DialogContent>
          {!showOutput ? (
            <form onSubmit={handleSubmit}>
              <TextField
                name="sipPerMonth"
                label="SIP per Month"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={sipPerMonth}
                onChange={(e) => setSipPerMonth(e.target.value)}
              />
              <TextField
                name="expectedReturn"
                label="Expected Annual Return (%)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
              />
              <TextField
                name="numOfYears"
                label="Number of Years"
                fullWidth
                margin="normal"
                required
                type="number"
                step="1"
                value={numOfYears}
                onChange={(e) => setNumOfYears(e.target.value)}
              />
              <TextField
                name="delayInInvestment"
                label="Delay in Investment (Years)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="1"
                value={delayInInvestment}
                onChange={(e) => setDelayInInvestment(e.target.value)}
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
                Cost of Delay Calculator
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
                              label="SIP per Month"
                              value={sipPerMonth}
                              onChange={(e) => setSipPerMonth(e.target.value)}
                            />
                            <InputField
                              label="Expected Return (%)"
                              value={expectedReturn}
                              onChange={(e) =>
                                setExpectedReturn(e.target.value)
                              }
                            />
                            <InputField
                              label="Number of Years"
                              value={numOfYears}
                              onChange={(e) => setNumOfYears(e.target.value)}
                            />
                            <InputField
                              label="Delay in Investment (Years)"
                              value={delayInInvestment}
                              onChange={(e) =>
                                setDelayInInvestment(e.target.value)
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
                              title={"Your Target Wealth will reduce by "}
                              CopyValue={`${targetWealthReduction}%`}
                            />
                            <ResultSection
                              title={"New SIP required to reach new Target "}
                              CopyValue={`₹${newSipRequired}`}
                            />
                            <ResultSection
                              title={"Future Value without delay "}
                              CopyValue={`₹${costOfDelayWithoutDelay}`}
                            />
                            <ResultSection
                              title={"Future Value with delay "}
                              CopyValue={`₹${costOfDelayWithDelay}`}
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
                              type="bar"
                              height={250}
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

export default CostOfDelayCalc;
