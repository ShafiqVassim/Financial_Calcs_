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
import ReactApexChart from "react-apexcharts";
import ButtonCalc from "./Components/ButtonCalc";

const ReverseSIPCalc = () => {
  const [open, setOpen] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [targetAmount, setTargetAmount] = useState("");
  const [annualReturn, setAnnualReturn] = useState("");
  const [amountInvested, setAmountInvested] = useState("");
  const [returnGenerated, setReturnGenerated] = useState("");
  const [chartData, setChartData] = useState(null);
  const [tenure, setTenure] = useState("");
  const [reverseSip, setReverseSip] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTargetAmount("");
    setAnnualReturn("");
    setTenure("");
    setReverseSip("");
    setShowOutput(false);
  };

  const handleClear = () => {
    setTargetAmount("");
    setAnnualReturn("");
    setTenure("");
  };

  const handleCardClick = () => {
    handleClickOpen();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetAmountValue = parseFloat(targetAmount);
    const annualReturnValue = parseFloat(annualReturn);
    const tenureValue = parseFloat(tenure);

    const result =
      (targetAmountValue * (annualReturnValue / 100 / 12)) /
      (Math.pow(1 + annualReturnValue / 100 / 12, tenureValue * 12) - 1);
    const amountInvested = Math.floor(
      Math.round(result * parseInt(annualReturnValue) * parseInt(tenureValue))
    );
    const returnGenerated = targetAmountValue - amountInvested;

    setReverseSip(Math.floor(Math.round(result)));
    setAmountInvested(amountInvested);
    setReturnGenerated(returnGenerated);
    setShowOutput(true);

    const chartData = {
      series: [parseFloat(amountInvested), parseFloat(returnGenerated)],
      options: {
        chart: {
          width: 300,
          type: "pie",
        },
        labels: ["Amount Invested", "Return Generated"],
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
          <h3>Reverse SIP Calculator</h3>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reverse SIP Calculator</DialogTitle>
        <DialogContent>
          {!showOutput ? (
            <form onSubmit={handleSubmit}>
              <TextField
                name="targetAmount"
                label="Target Amount Required"
                fullWidth
                margin="normal"
                required
                type="number"
                step="any"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
              />
              <TextField
                name="annualReturn"
                label="Expected Annual Return (%)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="any"
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
                step="any"
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
                Reverse SIP Calculator
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
                              label="Target Amount Required"
                              value={targetAmount}
                              onChange={(e) => setTargetAmount(e.target.value)}
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
                              title="SIP Required to achieve target wealth is "
                              CopyValue={`₹${reverseSip}`}
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
                              type="pie"
                              height={380}
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

export default ReverseSIPCalc;
