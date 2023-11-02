import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogContent,
  TextField,
  Grid,
  TableContainer,
  Table,
  IconButton,
  DialogTitle,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import InputField from "./Components/textFields";
import CalcButton from "./Components/CalcButton";
import ResultSection from "./Components/ResultSection";
import Chart from "react-apexcharts";
import ButtonCalc from "./Components/ButtonCalc";
import './style.css';

const CAGRCalc = () => {
  const [open, setOpen] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [cagr, setCAGR] = useState("");
  const [iconHovered, setIconHovered] = useState(false);
  const [showOutput, setShowOutput] = useState(false); // New state variable for output visibility
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "Cagr-valuechart",
      toolbar: {
        show: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    xaxis: {
      categories: ["Year"], // Tenure values will be added dynamically
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

  const handleCardClick = () => {
    handleClickOpen();
  };

  const handleClose = () => {
    setOpen(false);
    setInvestmentAmount("");
    setTargetAmount("");
    setTenure("");
    setCAGR("");
    setShowOutput(false);
  };

  const handleClear = () => {
    setInvestmentAmount("");
    setTargetAmount("");
    setTenure("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const investmentAmountValue = parseFloat(investmentAmount);
    const targetAmountValue = parseFloat(targetAmount);
    const tenureValue = parseFloat(tenure);

    // Calculate CAGR
    const initialInvestment = investmentAmountValue;
    const finalInvestment = targetAmountValue;
    const numberOfYears = tenureValue;

    const cagr =
      Math.pow(finalInvestment / initialInvestment, 1 / numberOfYears) - 1;
    setCAGR((cagr * 100).toFixed(2));
    setShowOutput(true);

    const tenureValues = [];
    const cagrValues = [];
    let currentValue = initialInvestment;

    for (let i = 1; i <= numberOfYears; i++) {
      tenureValues.push(i);
      currentValue += currentValue * cagr;
      cagrValues.push(Math.round(currentValue));
    }
    setChartOptions({
      ...chartOptions,
      xaxis: {
        categories: tenureValues,
        labels: {
          show: true
        },
        title: {
          text: "Year",
          offsetX: 15,
          offsetY: -10,
          style: {
            fontSize: "12px",
            fontWeight: 450,
            cssClass: "apexcharts-xaxis-title",
          }
        }
      },
      yaxis: {
        title: {
          text: "Amount",
          offsetX: -5,
          offsetY: -15,
          style: {
            fontSize: "12px",
            fontWeight: 400,
            cssClass: "apexcharts-yaxis-title",
          },
        }
      },
      dataLabels: {
        enabled: false,
      }
    });
    setChartSeries([
      {
        name: "CAGR Value",
        data: cagrValues,
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
          <h3>CAGR Calculator</h3>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>CAGR Calculator</DialogTitle>
        <DialogContent>
          {!showOutput ? (
            <form onSubmit={handleSubmit}>
              <TextField
                name="investmentAmount"
                label="Initial Investment Amount"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
              />
              <TextField
                name="targetAmount"
                label="Final Amount"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
              />
              <TextField
                name="tenure"
                label="Investment Tenure (years)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="1"
                value={tenure}
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
                CAGR Calculator
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
                              label="Investment Amount"
                              value={investmentAmount}
                              onChange={(e) =>
                                setInvestmentAmount(e.target.value)
                              }
                            />
                            <InputField
                              label="Final Amount"
                              value={targetAmount}
                              onChange={(e) => setTargetAmount(e.target.value)}
                            />
                            <InputField
                              label="Tenure"
                              value={tenure}
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
                              title={"Required CAGR is "}
                              CopyValue={`${cagr} %`}
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
                            type="bar"
                            height={380}
                            width={600}
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

export default CAGRCalc;
