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


const IncomeTaxCalc = () => {
  const [open, setOpen] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [yearlyIncome, setYearlyIncome] = useState("");
  const [deductions, setDeductions] = useState({
    "80c": "",
    medicalInsurance: "",
    homeLoanInterest: "",
    hraExemption: "",
    ltaExemption: "",
    nps: "",
  });
  const [chartData, setChartData] = useState(null);
  const [incomeTaxResult, setIncomeTaxResult] = useState("");
  const [oldincomeTaxResult, setoldIncomeTaxResult] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setYearlyIncome("");
    setDeductions({
      "80c": "",
      medicalInsurance: "",
      homeLoanInterest: "",
      hraExemption: "",
      ltaExemption: "",
      nps: "",
      otherExemptions: "",
    });
    setIncomeTaxResult("");
    setoldIncomeTaxResult("");
    setShowOutput(false);
  };

  const handleClear = () => {
    setYearlyIncome("");
    setDeductions({
      "80c": "",
      medicalInsurance: "",
      homeLoanInterest: "",
      hraExemption: "",
      ltaExemption: "",
      nps: "",
      otherExemptions: "",
    });
  };

  const calculateNewIncomeTaxResult = (yearlyIncome) => {
    let incomeTaxResult = 0;

    if (yearlyIncome <= 250000) {
      incomeTaxResult = 0;
    } else if (yearlyIncome > 250000 && yearlyIncome <= 500000) {
      incomeTaxResult = (yearlyIncome - 250000) * 0.05;
    } else if (yearlyIncome > 500000 && yearlyIncome <= 750000) {
      incomeTaxResult = (yearlyIncome - 500000) * 0.1 + 250000 * 0.05;
    } else if (yearlyIncome > 750000 && yearlyIncome <= 1000000) {
      incomeTaxResult =
        (yearlyIncome - 750000) * 0.15 + 250000 * 0.1 + 250000 * 0.05;
    } else if (yearlyIncome > 1000000 && yearlyIncome <= 1250000) {
      incomeTaxResult =
        (yearlyIncome - 1000000) * 0.2 +
        250000 * 0.15 +
        250000 * 0.1 +
        250000 * 0.05;
    } else if (yearlyIncome > 1250000 && yearlyIncome <= 1500000) {
      incomeTaxResult =
        (yearlyIncome - 1250000) * 0.25 +
        250000 * 0.2 +
        250000 * 0.15 +
        250000 * 0.1 +
        250000 * 0.05;
    } else if (yearlyIncome > 1500000) {
      incomeTaxResult =
        (yearlyIncome - 1500000) * 0.3 +
        250000 * 0.25 +
        250000 * 0.2 +
        250000 * 0.15 +
        250000 * 0.1 +
        250000 * 0.05;
    }

    const educationCess = incomeTaxResult * 0.04;

    if (yearlyIncome <= 5000000) {
      incomeTaxResult = incomeTaxResult + educationCess;
    } else if (yearlyIncome <= 10000000) {
      const surcharge = incomeTaxResult * 0.1;
      incomeTaxResult = incomeTaxResult + educationCess + surcharge;
    } else if (yearlyIncome <= 20000000) {
      const surcharge = incomeTaxResult * 0.15;
      incomeTaxResult = incomeTaxResult + educationCess + surcharge;
    } else if (yearlyIncome <= 50000000) {
      const surcharge = incomeTaxResult * 0.25;
      incomeTaxResult = incomeTaxResult + educationCess + surcharge;
    } else {
      const surcharge = incomeTaxResult * 0.37;
      incomeTaxResult = incomeTaxResult + educationCess + surcharge;
    }

    return incomeTaxResult;
  };

  const calculateOldIncomeTaxResult = (yearlyIncome, deductions) => {
    const totalDeductions =
      parseFloat(deductions["80c"]) +
      parseFloat(deductions.medicalInsurance) +
      parseFloat(deductions.homeLoanInterest) +
      parseFloat(deductions.hraExemption) +
      parseFloat(deductions.ltaExemption) +
      parseFloat(deductions.nps);

    const otherValue = yearlyIncome - totalDeductions - 50000;

    let incomeTaxResult = 0;

    if (otherValue <= 0) {
      incomeTaxResult = 0;
    } else if (otherValue > 0 && otherValue <= 250000) {
      incomeTaxResult = 0;
    } else if (otherValue > 250000 && otherValue <= 500000) {
      incomeTaxResult = (otherValue - 250000) * 0.05;
    } else if (otherValue > 500000 && otherValue <= 1000000) {
      incomeTaxResult = (otherValue - 500000) * 0.2 + 250000 * 0.05;
    } else if (otherValue > 1000000) {
      incomeTaxResult =
        (otherValue - 1000000) * 0.3 + 500000 * 0.2 + 250000 * 0.05;
    }

    const educationCess = incomeTaxResult * 0.04;

    if (yearlyIncome <= 5000000) {
      incomeTaxResult = incomeTaxResult + educationCess;
    } else if (yearlyIncome <= 10000000) {
      const surcharge = incomeTaxResult * 0.1;
      incomeTaxResult = incomeTaxResult + educationCess + surcharge;
    } else if (yearlyIncome <= 20000000) {
      const surcharge = incomeTaxResult * 0.15;
      incomeTaxResult = incomeTaxResult + educationCess + surcharge;
    } else if (yearlyIncome <= 50000000) {
      const surcharge = incomeTaxResult * 0.25;
      incomeTaxResult = incomeTaxResult + educationCess + surcharge;
    } else {
      const surcharge = incomeTaxResult * 0.37;
      incomeTaxResult = incomeTaxResult + educationCess + surcharge;
    }

    return incomeTaxResult;
  };

  const handleCardClick = () => {
    handleClickOpen();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const incomeValue = parseFloat(yearlyIncome);
    const result = calculateNewIncomeTaxResult(incomeValue);
    const result2 = calculateOldIncomeTaxResult(incomeValue, deductions);
    setIncomeTaxResult(Math.round(result));
    setoldIncomeTaxResult(Math.round(result2));
    setShowOutput(true);

    const chartData = {
      series: [
        {
          name: "Tax Amount",
          data: [
            Math.floor(Math.round(result)),
            Math.floor(Math.round(result2)),
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
        legend: {
          position: "top",
        },
        xaxis: {
          categories: ["New Income Tax", "Old Income Tax"],
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

  const difference = Math.round(
    incomeTaxResult !== null && oldincomeTaxResult !== null
      ? incomeTaxResult - oldincomeTaxResult
      : null
  );

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
          <h3>Income Tax Calculator</h3>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Income Tax Calculator</DialogTitle>
        <DialogContent>
          {!showOutput ? (
            <form onSubmit={handleSubmit}>
              <TextField
                name="yearlyIncome"
                label="Yearly Income"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={yearlyIncome}
                onChange={(e) => setYearlyIncome(e.target.value)}
              />
              <TextField
                name="deduction_80c"
                label="Deductions under 80C"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={deductions["80c"]}
                onChange={(e) =>
                  setDeductions({ ...deductions, "80c": e.target.value })
                }
              />
              <TextField
                name="medicalInsurance"
                label="Medical Insurance Premium"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={deductions.medicalInsurance}
                onChange={(e) =>
                  setDeductions({
                    ...deductions,
                    medicalInsurance: e.target.value,
                  })
                }
              />
              <TextField
                name="homeLoanInterest"
                label="Home Loan Interest"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={deductions.homeLoanInterest}
                onChange={(e) =>
                  setDeductions({
                    ...deductions,
                    homeLoanInterest: e.target.value,
                  })
                }
              />
              <TextField
                name="hraExemption"
                label="HRA Exemption"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={deductions.hraExemption}
                onChange={(e) =>
                  setDeductions({ ...deductions, hraExemption: e.target.value })
                }
              />
              <TextField
                name="ltaExemption"
                label="LTA Exemption"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={deductions.ltaExemption}
                onChange={(e) =>
                  setDeductions({ ...deductions, ltaExemption: e.target.value })
                }
              />
              <TextField
                name="nps"
                label="NPS"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={deductions.nps}
                onChange={(e) =>
                  setDeductions({ ...deductions, nps: e.target.value })
                }
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
                Income Tax Calculator
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
                              label="Yearly Income"
                              value={yearlyIncome}
                              onChange={(e) => setYearlyIncome(e.target.value)}
                            />
                            <InputField
                              label="Deductions under 80C"
                              value={deductions["80c"]}
                              onChange={(e) =>
                                setDeductions({
                                  ...deductions,
                                  "80c": e.target.value,
                                })
                              }
                            />
                            <InputField
                              label="Medical Insurance Premium"
                              value={deductions.medicalInsurance}
                              onChange={(e) =>
                                setDeductions({
                                  ...deductions,
                                  medicalInsurance: e.target.value,
                                })
                              }
                            />
                            <InputField
                              label="Home Loan Interest"
                              value={deductions.homeLoanInterest}
                              onChange={(e) =>
                                setDeductions({
                                  ...deductions,
                                  homeLoanInterest: e.target.value,
                                })
                              }
                            />
                            <InputField
                              label="HRA Exemption"
                              value={deductions.hraExemption}
                              onChange={(e) =>
                                setDeductions({
                                  ...deductions,
                                  hraExemption: e.target.value,
                                })
                              }
                            />
                            <InputField
                              label="LTA Exemption"
                              value={deductions.ltaExemption}
                              onChange={(e) =>
                                setDeductions({
                                  ...deductions,
                                  ltaExemption: e.target.value,
                                })
                              }
                            />
                            <InputField
                              label="NPS"
                              value={deductions.nps}
                              onChange={(e) =>
                                setDeductions({
                                  ...deductions,
                                  nps: e.target.value,
                                })
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
                        <Typography variant="h5" sx={{ paddingLeft: "80px" }} align="left">
                          {incomeTaxResult < oldincomeTaxResult ? (
                            <h3>
                              You should go with the{" "}
                              <span style={{ color: "#0b75ff" }}>
                                New Income
                              </span>{" "}
                              Tax System
                            </h3>
                          ) : (
                            <h3>
                              You should go with the{" "}
                              <span style={{ color: "#0b75ff" }}>
                                Old Income
                              </span>{" "}
                              Tax System
                            </h3>
                          )}
                        </Typography>
                        <TableContainer>
                          <Table>
                            <ResultSection
                              title="Difference"
                              CopyValue={`₹${Math.abs(difference)}`}
                            />
                            <ResultSection
                              title="Old Income Tax"
                              CopyValue={`₹${oldincomeTaxResult}`}
                            />
                            <ResultSection
                              title="New Income Tax"
                              CopyValue={`₹${incomeTaxResult}`}
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
                              height={300}
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

export default IncomeTaxCalc;