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

const PresentValueCalc = () => {
  const [open, setOpen] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [futureValue, setFutureValue] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [years, setYears] = useState("");
  const [presentValue, setPresentValue] = useState("");
  const [chartData, setChartData] = useState(null);
  const [showOutput, setShowOutput] = useState(false); // New state variable for output visibility

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFutureValue("");
    setDiscountRate("");
    setYears("");
    setPresentValue("");
    setShowOutput(false);
  };

  const handleClear = () => {
    setFutureValue("");
    setDiscountRate("");
    setYears("");
  };

  const handleCardClick = () => {
    handleClickOpen();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const futureValueInput = parseFloat(futureValue);
    const discountRateInput = parseFloat(discountRate);
    const yearsInput = parseFloat(years);

    // Calculate Present Value
    const presentValue =
      futureValueInput / Math.pow(1 + discountRateInput / 100, yearsInput);

    setPresentValue(Math.round(presentValue));
    setShowOutput(true);

    //generate chart data
    const chartData = {
      series: [
        {
          name: "Present Value",
          data: [
            Math.floor(Math.round(presentValue)),
            Math.floor(Math.round(futureValue)),
          ],
        },
      ],
      options: {
        chart: {
          labels: ["Present Value", "Future Value"],
          colors: ["#FF0000", "#00FF00"],
          type: "bar",
          height: 600,
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            vertical: true,
            distributed: true,
          },
        },
        legend: {
          position: "top",
        },
        xaxis: {
          categories: ["Present Value", "Future Value"],
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return Math.floor(Math.round(val));
          },
        },
        style: {
          fontFamily: "sans-serif",
          colors: ["#fff"],
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
          <h3>Present Value Calculator</h3>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Present Value Calculator</DialogTitle>
        <DialogContent>
          {!showOutput ? (
            <form onSubmit={handleSubmit}>
              <TextField
                name="futureValue"
                label="Future Value"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={futureValue}
                onChange={(e) => setFutureValue(e.target.value)}
              />
              <TextField
                name="discountRate"
                label="Yearly Return (%)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={discountRate}
                onChange={(e) => setDiscountRate(e.target.value)}
              />
              <TextField
                name="years"
                label="Years From Now"
                fullWidth
                margin="normal"
                required
                type="number"
                step="1"
                value={years}
                onChange={(e) => setYears(e.target.value)}
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
                Present Value Calculator
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
                              label="Future Value"
                              value={futureValue}
                              onChange={(e) => setFutureValue(e.target.value)}
                            />
                            <InputField
                              label="Discount Rate (%)"
                              value={discountRate}
                              onChange={(e) => setDiscountRate(e.target.value)}
                            />
                            <InputField
                              label="Years From Now"
                              value={years}
                              onChange={(e) => setYears(e.target.value)}
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
                              title="Present Value is"
                              CopyValue={`₹${presentValue}`}
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

export default PresentValueCalc;
