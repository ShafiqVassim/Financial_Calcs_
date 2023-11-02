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

const StepUpSipCalc = () => {
  const [open, setOpen] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [sipAmount, setSipAmount] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [tenure, setTenure] = useState("");
  const [AnnualInc, setAnnualInc] = useState("");
  const [maturityValue, setMaturityValue] = useState("");
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);
  const [showOutput, setShowOutput] = useState(false);
  const [Result, setResult] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSipAmount("");
    setExpectedReturn("");
    setTenure("");
    setResult("");
    setAnnualInc("");
    setShowOutput(false);
  };

  const handleClear = () => {
    setSipAmount("");
    setExpectedReturn("");
    setTenure("");
    setAnnualInc("");
  };

  const handleCardClick = () => {
    handleClickOpen();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let arr = [];
    let sip = sipAmount;
    let annual = sip * 12;
    let totalvalues = annual * (1 + expectedReturn / 100);

    for (let i = 0; i < tenure; i++) {
      arr.push(annual);
      sip = sip * (1 + AnnualInc / 100);
      annual = totalvalues + sip * 12;
      totalvalues = annual * (1 + expectedReturn / 100);
    }

    setResult({ annual: Math.round(arr[tenure - 1]) });
    setShowOutput(true);
    // Calculate maturityValue with AnnualInc set to 0
    let arr2 = [];
     sip = sipAmount;
     annual = sip * 12;
     totalvalues = annual * (1 + expectedReturn / 100);
    const tenureValue = [];

     for (let i = 0; i < tenure; i++) {
      arr2.push(annual);
      sip = sip * (1 + 0 / 100); // Set AnnualInc to 0
      annual = totalvalues + sip * 12;
      totalvalues = annual * (1 + expectedReturn / 100);
      tenureValue.push(`${i +1 }`);
    }
    setMaturityValue( Math.round(arr2[tenure - 1]));

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
        enabled: false, 
      },
      xaxis: {
        categories: tenureValue,
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
        name: "SIP Amount",
        data: arr2,
      },
      {
        name: "Step-Up Amount",
        data: arr,
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
          <h3>Step Up SIP Calculator</h3>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Step Up SIP Calculator</DialogTitle>
        <DialogContent>
          {!showOutput ? (
            <form onSubmit={handleSubmit}>
              <TextField
                name="sipAmount"
                label="Sip Amount(Per Month)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={sipAmount}
                onChange={(e) => setSipAmount(e.target.value)}
              />
              <TextField
                name="expectedReturn"
                label="Expected Return Per Year(%)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
              />
              <TextField
                name="tenure"
                label="Tenure(Years)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
              />
              <TextField
                name="AnnualInc"
                label="Annual Increase in Sip(%)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="1"
                value={AnnualInc}
                onChange={(e) => setAnnualInc(e.target.value)}
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
                {" "}
                Step Up SIP Calculator
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
                              label="Sip Amount(Per Month)"
                              value={sipAmount}
                              onChange={(e) => setSipAmount(e.target.value)}
                            />
                            <InputField
                              label="Expected Return Per Year(%)"
                              value={expectedReturn}
                              onChange={(e) =>
                                setExpectedReturn(e.target.value)
                              }
                            />
                            <InputField
                              label="Tenure(Years)"
                              value={tenure}
                              onChange={(e) => setTenure(e.target.value)}
                            />
                            <InputField
                              label="Annual Increase in Sip(%)"
                              value={AnnualInc}
                              onChange={(e) => setAnnualInc(e.target.value)}
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
                              title="Final Amount of Step Up SIP is"
                              CopyValue={`₹${Result.annual}`}
                            />
                            <ResultSection
                              title="Final Amount of SIP is"
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

export default StepUpSipCalc;
