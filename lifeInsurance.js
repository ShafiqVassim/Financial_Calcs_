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
import ReactApexChart from "react-apexcharts";
import InputField from "./Components/textFields";
import CalcButton from "./Components/CalcButton";
import ResultSection from "./Components/ResultSection";
import ButtonCalc from "./Components/ButtonCalc";

const LifeInsuranceCalc = () => {
  const [open, setOpen] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [annualIncome, setAnnualIncome] = useState("");
  const [lifeInsuranceCover, setLifeInsuranceCover] = useState("");
  const [outstandingLoans, setOutstandingLoans] = useState("");
  const [liquidInvestment, setLiquidInvestment] = useState("");
  const [yearlyIncome, setYearlyIncome] = useState("");
  const [totalLifeInsurance, setTotalLifeInsurance] = useState("");
  const [currentLifeInsurance, setCurrentLifeInsurance] = useState("");
  const [additionalInsuranceNeeded, setAdditionalInsuranceNeeded] =
    useState("");
  const [showOutput, setShowOutput] = useState(false); // New state variable for output visibility

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCardClick = () => {
    handleClickOpen();
  };

  const handleClose = () => {
    setOpen(false);
    setAnnualIncome("");
    setLifeInsuranceCover("");
    setOutstandingLoans("");
    setLiquidInvestment("");
    setYearlyIncome("");
    setTotalLifeInsurance("");
    setCurrentLifeInsurance("");
    setAdditionalInsuranceNeeded("");
    setShowOutput(false);
  };

  const handleClear = () => {
    setAnnualIncome("");
    setLifeInsuranceCover("");
    setOutstandingLoans("");
    setLiquidInvestment("");
    setYearlyIncome("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate the required insurance values
    const annualIncomeValue = parseFloat(annualIncome);
    const lifeInsuranceCoverValue = parseFloat(lifeInsuranceCover);
    const outstandingLoansValue = parseFloat(outstandingLoans);
    const liquidInvestmentValue = parseFloat(liquidInvestment);
    const yearlyIncomeValue = parseFloat(yearlyIncome);

    const totalLifeInsuranceNeeded =
      (annualIncomeValue - yearlyIncomeValue) / 0.04 + outstandingLoansValue;
    const currentLifeInsuranceValue =
      lifeInsuranceCoverValue + liquidInvestmentValue;
    const additionalInsuranceNeededValue =
      totalLifeInsuranceNeeded - currentLifeInsuranceValue;

    // Update the state variables
    setTotalLifeInsurance(Math.round(totalLifeInsuranceNeeded * 100) / 100);
    setCurrentLifeInsurance(Math.round(currentLifeInsuranceValue * 100) / 100);
    setAdditionalInsuranceNeeded(
      Math.round(additionalInsuranceNeededValue * 100) / 100
    );
    setShowOutput(true);
  };

  const chartData = {
    series: [
      parseFloat(outstandingLoans),
      parseFloat(additionalInsuranceNeeded),
    ],
    options: {
      chart: {
        width: 300,
        type: "pie",
      },
      labels: ["Amount to Repay Loan", "Additional Insurance Needed"],
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
        flexWrap: "wrap",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <Card className="completed">
        <CardContent onClick={handleCardClick}>
          <h3>Life Insurance Calculator</h3>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Life Insurance Calculator</DialogTitle>
        <DialogContent>
          {!showOutput ? (
            <form onSubmit={handleSubmit}>
              <TextField
                name="annualIncome"
                label="Annual Income Required by Family"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
              />
              <TextField
                name="lifeInsuranceCover"
                label="Current Life Insurance Cover"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={lifeInsuranceCover}
                onChange={(e) => setLifeInsuranceCover(e.target.value)}
              />
              <TextField
                name="outstandingLoans"
                label="Current Outstanding Loans"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={outstandingLoans}
                onChange={(e) => setOutstandingLoans(e.target.value)}
              />
              <TextField
                name="liquidInvestment"
                label="Liquid Investment & Assets"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={liquidInvestment}
                onChange={(e) => setLiquidInvestment(e.target.value)}
              />
              <TextField
                name="yearlyIncome"
                label="Yearly Income Your Family Can Expect After You"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={yearlyIncome}
                onChange={(e) => setYearlyIncome(e.target.value)}
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
                Life Insurance Calculator
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
                              label="Annual Income"
                              value={annualIncome}
                              onChange={(e) => setAnnualIncome(e.target.value)}
                            />
                            <InputField
                              label="Life Insurance Cover"
                              value={lifeInsuranceCover}
                              onChange={(e) =>
                                setLifeInsuranceCover(e.target.value)
                              }
                            />
                            <InputField
                              label="Outstanding Loans"
                              value={outstandingLoans}
                              onChange={(e) =>
                                setOutstandingLoans(e.target.value)
                              }
                            />
                            <InputField
                              label="Liquid Investment"
                              value={liquidInvestment}
                              onChange={(e) =>
                                setLiquidInvestment(e.target.value)
                              }
                            />
                            <InputField
                              label="Yearly Income"
                              value={yearlyIncome}
                              onChange={(e) => setYearlyIncome(e.target.value)}
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
                  {/* Right Side (Output and Chart) */}
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
                              title={"Current Life Insurance is"}
                              CopyValue={`₹${currentLifeInsurance}`}
                            />
                            <ResultSection
                              title={"Additional Insurance Needed is"}
                              CopyValue={`₹${additionalInsuranceNeeded}`}
                            />
                            <ResultSection
                              title={"Total Life Insurance is"}
                              CopyValue={`₹${totalLifeInsurance}`}
                            />
                          </Table>
                        </TableContainer>
                      </CardContent>
                      {/* Chart */}
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
                              height={320}
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
export default LifeInsuranceCalc;
