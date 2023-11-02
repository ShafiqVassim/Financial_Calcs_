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
import Chart from "react-apexcharts";
import ButtonCalc from "./Components/ButtonCalc";

const FutureValueCalc = () => {
  const [open, setOpen] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [InvestmentAmount, setInvestmentAmount] = useState("");
  const [InterestRate, setInterestRate] = useState("");
  const [Tenure, setTenure] = useState("");
  const [futureValueResult, setFutureValueResult] = useState("");
  const [showOutput, setShowOutput] = useState(false);
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
        text: "Amount",
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
      name: "Future Value",
      data: [], // Future value data will be added dynamically
    },
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInvestmentAmount("");
    setInterestRate("");
    setTenure("");
    setFutureValueResult("");
    setShowOutput(false);
  };

  const handleClear = () => {
    setInvestmentAmount("");
    setInterestRate("");
    setTenure("");
  };

  const handleCardClick = () => {
    handleClickOpen();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Amount = parseFloat(InvestmentAmount);
    const interestRate = parseFloat(InterestRate);
    const Tenure_Val = parseFloat(Tenure);

    const final = Amount * Math.pow(1 + interestRate / 100, Tenure_Val);
    const roundedFinal = Math.round(final);
    setFutureValueResult(roundedFinal);
    setShowOutput(true);

    // Generate data for ApexCharts
    const tenureValues = [];
    const futureValueData = [];
    for (let i = 1; i <= Tenure_Val; i++) {
      tenureValues.push(i);
      const futureValue = Amount * Math.pow(1 + interestRate / 100, i);
      futureValueData.push(Math.round(futureValue));
    }

    // Update chart options and series
    setChartOptions({
      ...chartOptions,
      xaxis: {
        categories: tenureValues,
        labels : {
          show: true
        },
        title: {
          text: "Year",
          offsetX: 0,
          offsetY: -10,
          style: {
            fontSize: "12px",
            fontWeight: 450,
            cssClass: "apexcharts-xaxis-title",
          },
        }
      },
      dataLabels: {
        enabled: false,
        fontSize: "12px",
      }
    });
    setChartSeries([
      {
        name: "Future Value",
        data: futureValueData,
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
          <h3>Future Value Calculator</h3>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Future Value Calculator</DialogTitle>
        <DialogContent>
          {!showOutput ? (
            <form onSubmit={handleSubmit}>
              <TextField
                name="investmentamount"
                label="Investment Amount"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={InvestmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
              />
              <TextField
                name="interestrate"
                label="Interest Rate (%)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={InterestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
              <TextField
                name="tenure"
                label="Tenure (Years)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="1"
                value={Tenure}
                onChange={(e) => setTenure(e.target.value)}
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
                Future Value Calculator
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
                              label="Investment Amount"
                              value={InvestmentAmount}
                              onChange={(e) =>
                                setInvestmentAmount(e.target.value)
                              }
                            />
                            <InputField
                              label="Interest Rate"
                              value={InterestRate}
                              onChange={(e) => setInterestRate(e.target.value)}
                            />
                            <InputField
                              label="Tenure (Years)"
                              value={Tenure}
                              onChange={(e) => setTenure(e.target.value)}
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
                              title="Future Value"
                              CopyValue={`₹${futureValueResult}`}
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
                          {Chart && (
                            <Chart
                              options={chartOptions}
                              series={chartSeries}
                              type="bar"
                              height={400}
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

export default FutureValueCalc;
