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

const HRACalc = () => {
  const [open, setOpen] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [basicSalary, setBasicSalary] = useState("");
  const [hraReceived, setHRAReceived] = useState("");
  const [yearlyRent, setYearlyRent] = useState("");
  const [areaOfResidence, setAreaOfResidence] = useState("");
  const [hraResult, setHRAResult] = useState("");
  const [chartData, setChartData] = useState(null);
  const [showOutput, setShowOutput] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBasicSalary("");
    setHRAReceived("");
    setYearlyRent("");
    setAreaOfResidence("");
    setHRAResult("");
    setShowOutput(false);
    setChartData(null);
  };

  const handleClear = () => {
    setBasicSalary("");
    setHRAReceived("");
    setYearlyRent("");
    setAreaOfResidence("");
  };

  const handleCardClick = () => {
    handleClickOpen();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const salaryValue = parseFloat(basicSalary);
    const hraValue = parseFloat(hraReceived);
    const rentValue = parseFloat(yearlyRent);

    // First Data
    const ActualHRA = hraValue;

    // Second Data
    const ActualRent = rentValue - salaryValue * 0.1;

    // Third Data
    let metro;
    if (areaOfResidence === "Metro City") {
      metro = salaryValue * 0.5;
    } else {
      metro = salaryValue * 0.4;
    }
    
    // Compare ActualHRA and ActualRent, and store the lesser value in HRAResult
    const HRAResult = Math.floor(Math.round(Math.min(ActualHRA, ActualRent)));
    setHRAResult(HRAResult);
    setShowOutput(true);

    // Chart Data
    const chartData = {
      series: [
        {
          name: "HRA Data",
          data: [
            Math.floor(Math.round(ActualHRA)),
            Math.floor(Math.round(ActualRent)),
            Math.floor(Math.round(metro)),
          ],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 600,
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
          categories: [
            "Actual HRA",
            "Actual Rent -10% of Basic",
            "50% / 40% of your Basic",
          ],
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
          <h3>HRA Calculator</h3>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>HRA Calculator</DialogTitle>
        <DialogContent>
          {!showOutput ? (
            <form onSubmit={handleSubmit}>
              <TextField
                name="basicSalary"
                label="Yearly Basic Salary + DA"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={basicSalary}
                onChange={(e) => setBasicSalary(e.target.value)}
              />
              <TextField
                name="hraReceived"
                label="Yearly HRA Received "
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={hraReceived}
                onChange={(e) => setHRAReceived(e.target.value)}
              />
              <TextField
                name="yearlyRent"
                label="Yearly Rent"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={yearlyRent}
                onChange={(e) => setYearlyRent(e.target.value)}
              />
              <TextField
                name="areaOfResidence"
                label="Area of Residence"
                select
                fullWidth
                margin="normal"
                required
                value={areaOfResidence}
                onChange={(e) => setAreaOfResidence(e.target.value)}
              >
                <MenuItem value="Metro City">Metro City</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </TextField>
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
                HRA Calculator
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
                              label="Yearly Basic Salary + DA"
                              value={basicSalary}
                              onChange={(e) => setBasicSalary(e.target.value)}
                            />
                            <InputField
                              label="Yearly HRA Received"
                              value={hraReceived}
                              onChange={(e) => setHRAReceived(e.target.value)}
                            />
                            <InputField
                              label="Yearly Rent"
                              value={yearlyRent}
                              onChange={(e) => setYearlyRent(e.target.value)}
                            />

                            <Grid item xs={12}>
                              <TextField
                                name="areaOfResidence"
                                label="Area of Residence"
                                select
                                fullWidth
                                margin="normal"
                                required
                                value={areaOfResidence}
                                onChange={(e) =>
                                  setAreaOfResidence(e.target.value)
                                }
                              >
                                <MenuItem value="Metro City">
                                  Metro City
                                </MenuItem>
                                <MenuItem value="Others">Others</MenuItem>
                              </TextField>
                            </Grid>
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
                              title="Your Exempted HRA is "
                              CopyValue={`₹ ${hraResult}`}
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
                              width={550}
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

export default HRACalc;
