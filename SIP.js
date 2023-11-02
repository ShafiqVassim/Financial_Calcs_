import React, {  useState } from "react";
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

const SIPCalc = () => {
  const [open, setOpen] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [annualReturn, setAnnualReturn] = useState("");
  const [tenure, setTenure] = useState("");
  const [maturityValue, setMaturityValue] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "sip-chart",
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
          fontWeight: 450,
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
      name: "SIP1 Value",
      data: [],
    },
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInvestmentAmount("");
    setAnnualReturn("");
    setTenure("");
    setMaturityValue("");
    setShowOutput(false);
  };

  const handleClear = () => {
    setInvestmentAmount("");
    setAnnualReturn("");
    setTenure("");
  };

  const handleCardClick = () => {
    handleClickOpen();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const investmentAmountValue = parseFloat(investmentAmount);
    const annualReturnValue = parseFloat(annualReturn);
    const tenureValue = parseFloat(tenure);

    // Calculate SIP Maturity Value
    const sipAmount = investmentAmountValue * 12;
    const annualReturnRate = annualReturnValue / 100;
    const tenureRate = tenureValue;

    const maturityValue =
      (sipAmount * (Math.pow(1 + annualReturnRate, tenureRate) - 1)) /
      annualReturnRate;

    setMaturityValue(Math.floor(Math.round(maturityValue)));

    const tenureValues = [];
    const sipValueData = [];
    for (let i = 1; i <= tenureRate; i++) {
      tenureValues.push(i);
      const sipValue =
        (sipAmount * (Math.pow(1 + annualReturnRate, i) - 1)) /
        annualReturnRate;
      sipValueData.push(Math.round(sipValue));
      setShowOutput(true);
    }

    // Update chart options and series
    setChartOptions({
      ...chartOptions,
      xaxis: {
        categories: tenureValues,
      labels: {
        show: true,
      },
      title: {
        text: "Years",
        offsetX: 25,
        offsetY: 0,
        style: {
        fontSize: "12px",
        fontWeight: 450,
        cssClass: "apexcharts-xaxis-title",
        },
      },
      },
      dataLabels: {
        enabled: false,
      }
    });
    setChartSeries([
      {
        name: "Future Value per year",
        data: sipValueData,
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
          <h3>SIP Calculator</h3>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>SIP Calculator</DialogTitle>
        <DialogContent>
          {!showOutput ? (
            <form onSubmit={handleSubmit}>
              <TextField
                name="investmentAmount"
                label="Monthly Investment Amount"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
              />
              <TextField
                name="annualReturn"
                label="Expected Annual Return (%)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
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
                SIP Calculator
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
                            <TextField
                              name="investmentAmount"
                              label="Monthly Investment Amount"
                              fullWidth
                              margin="normal"
                              required
                              type="number"
                              step="0.01"
                              value={investmentAmount}
                              onChange={(e) =>
                                setInvestmentAmount(e.target.value)
                              }
                            />
                            <InputField
                              label="Expected Annual Return (%)"
                              value={annualReturn}
                              onChange={(e) => setAnnualReturn(e.target.value)}
                            />
                            <InputField
                              label="Investment Tenure (years)"
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
                              title="Final Amount is"
                              CopyValue={`₹${maturityValue}`}
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
                              height={350}
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

export default SIPCalc;
