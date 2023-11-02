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
import Chart from "react-apexcharts";
import ButtonCalc from "./Components/ButtonCalc";


const EMICalc = () => {
  const [open, setOpen] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [principal, setPrincipal] = useState("");
  const [interest, setInterest] = useState("");
  const [tenure, setTenure] = useState("");
  const [emiResult, setEmiResult] = useState("");
  const [interestPaid, setInterestPaid] = useState("");
  const [principalPaid, setPrincipalPaid] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPrincipal("");
    setInterest("");
    setTenure("");
    setEmiResult("");
    setInterestPaid("");
    setPrincipalPaid("");
    setShowOutput(false);
  };
  const handleClear = () => {
    setPrincipal("");
    setInterest("");
    setTenure("");
  };

  const handleCardClick = () => {
    handleClickOpen();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const principalValue = parseFloat(principal);
    const interestValue = parseFloat(interest);
    const tenureValue = parseFloat(tenure);

    // Calculate EMI
    const monthlyInterest = interestValue / 12 / 100;
    const emi =
      (principalValue *
        monthlyInterest *
        Math.pow(1 + monthlyInterest, tenureValue)) /
      (Math.pow(1 + monthlyInterest, tenureValue) - 1);
    console.log("emi", emi);
    setEmiResult(Math.round(emi));

    // Calculate Interest Paid and Principal Paid
    let loanOutstanding = principalValue;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;

    const chartCategories = [];
    const principalData = [];
    const interestData = [];

    for (let i = 1; i <= tenureValue; i++) {
      const interest = loanOutstanding * monthlyInterest;
      const principal = emi - interest;
      loanOutstanding -= principal;

      chartCategories.push(`${i}`);
      principalData.push(principal);
      interestData.push(interest);

      totalInterestPaid += interest;
      totalPrincipalPaid += principal;
    }

    setInterestPaid(Math.round(totalInterestPaid));
    setPrincipalPaid(Math.round(totalPrincipalPaid));
    setShowOutput(true);

    const options = {
      chart: {
        type: "bar",
        stacked: true,
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false, // Disable data labels
      },
      xaxis: {
        categories: chartCategories, // Use the chartCategories array for x-axis labels
        labels: {
          show: true,
        },
        title: {
          text: "Year",
          offsetX: 25,
          offsetY: 0,
          style: {
            fontSize: "12px",
            fontWeight: 450,
            cssClass: "apexcharts-xaxis-title",
          }
        } 
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return Math.round(value); // Round the y-axis values
          },
        },
        title: {
          text: "Amount",
          offsetX: 0,
          offsetY: 10,
          style: {
            fontSize: "12px",
            fontWeight: 400,
            cssClass: "apexcharts-yaxis-title",
          },
        }
      },
      tooltip: {
        y: {
          formatter: function (value) {
            return Math.round(value); // Limit decimal places in tooltip to 2
          },
        },
      },
      legend: {
        position: "top",
      },
      fill: {
        opacity: 1,
      },
    };

    const series = [
      {
        name: "Interest Amount",
        data: interestData,
      },
      {
        name: "Principal Amount",
        data: principalData,
      },
    ];

    setChartOptions(options);
    setChartSeries(series);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap-reverse",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <Card className="completed">
        <CardContent onClick={handleCardClick}>
          <h3>EMI Calculator</h3>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>EMI Calculator</DialogTitle>
        <DialogContent>
          {!showOutput ? (
            <form onSubmit={handleSubmit}>
              <TextField
                name="principal"
                label="Principal Amount"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
              <TextField
                name="interest"
                label="Interest Rate (%)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              />
              <TextField
                name="tenure"
                label="Loan Tenure (months)"
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
                EMI Calculator
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
                              label="Principal Amount"
                              value={principal}
                              onChange={(e) => setPrincipal(e.target.value)}
                            />
                            <InputField
                              label="Interest Rate (%)"
                              value={interest}
                              onChange={(e) => setInterest(e.target.value)}
                            />
                            <InputField
                              label="Loan Tenure (months)"
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
                              title={"EMI Amount "}
                              CopyValue={`₹ ${emiResult}`}
                            />
                            <ResultSection
                              title={"Interest Paid"}
                              CopyValue={`₹ ${interestPaid}`}
                            />
                            <ResultSection
                              title={"Principal Paid"}
                              CopyValue={`₹ ${principalPaid}`}
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
                            height={420}
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

export default EMICalc;
