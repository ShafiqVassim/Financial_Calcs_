import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Dialog,
  Button,
  DialogContent,
  Grid,
  TableContainer,
  Table,
  IconButton,
  DialogTitle,
  MenuItem,
  DialogActions,
  TextField,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import ReactApexChart from "react-apexcharts";
import InputField from "./Components/textFields";
import CalcButton from "./Components/CalcButton";
import ResultSection from "./Components/ResultSection";
import ButtonCalc from "./Components/ButtonCalc.js";


const CapitalGainCalc = () => {
  const [open, setOpen] = useState(false);
  const years = [
    { year: "2001-02", costInflationIndex: 100 },
    { year: "2002-03", costInflationIndex: 105 },
    { year: "2003-04", costInflationIndex: 109 },
    { year: "2004-05", costInflationIndex: 113 },
    { year: "2005-06", costInflationIndex: 117 },
    { year: "2006-07", costInflationIndex: 122 },
    { year: "2007-08", costInflationIndex: 129 },
    { year: "2008-09", costInflationIndex: 137 },
    { year: "2009-10", costInflationIndex: 148 },
    { year: "2010-11", costInflationIndex: 167 },
    { year: "2011-12", costInflationIndex: 184 },
    { year: "2012-13", costInflationIndex: 200 },
    { year: "2013-14", costInflationIndex: 220 },
    { year: "2014-15", costInflationIndex: 240 },
    { year: "2015-16", costInflationIndex: 254 },
    { year: "2016-17", costInflationIndex: 264 },
    { year: "2017-18", costInflationIndex: 272 },
    { year: "2018-19", costInflationIndex: 280 },
    { year: "2019-20", costInflationIndex: 289 },
    { year: "2020-21", costInflationIndex: 301 },
    { year: "2021-22", costInflationIndex: 317 },
    { year: "2022-23", costInflationIndex: 331 },
  ];
  const [iconHovered, setIconHovered] = useState(false);
  const [amountInvested, setAmountInvested] = useState("");
  const [buyYear, setBuyYear] = useState("");
  const [sellYear, setSellYear] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [capitalGainResult, setCapitalGainResult] = useState("");
  const [capitalGainTax, setCapitalGainTax] = useState("");
  const [indexCostprice, setIndexCostprice] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [showOutput, setShowOutput] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAmountInvested("");
    setBuyYear("");
    setSellYear("");
    setSellingPrice("");
    setCapitalGainResult("");
    setCapitalGainTax("");
    setShowAlert(false);
    setShowOutput(false);
  };

  const handleClear = () => {
    setAmountInvested("");
    setBuyYear("");
    setSellYear("");
    setSellingPrice("");
  };

  const handleCardClick = () => {
    handleClickOpen();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const sellYear = parseFloat(sellYear);
    const investedValue = parseFloat(amountInvested);
    const buyYearValue = buyYear;
    const sellYearValue = sellYear;
    const sellingPriceValue = parseFloat(sellingPrice);

    const holdingPeriod =
      parseInt(sellYearValue.split("-")[1]) -
      parseInt(buyYearValue.split("-")[1]);
    const buyYearIndex = years.find(
      (item) => item.year === buyYearValue
    ).costInflationIndex;
    const sellYearIndex = years.find(
      (item) => item.year === sellYearValue
    ).costInflationIndex;

    const indexCostprice = investedValue * (sellYearIndex / buyYearIndex);
    const indexedInvestment =
      ((sellYearIndex - buyYearIndex) / buyYearIndex) * 100;
    const investmentReturnValue =
      ((sellingPriceValue - investedValue) / investedValue) * 100;
    const capitalGainResult =
      ((investmentReturnValue - indexedInvestment) * investedValue) / 100;
    const capitalGainTax = capitalGainResult * 0.2;

    const yearDifference = Math.abs(
      parseInt(buyYearValue.split("-")[0]) -
        parseInt(sellYearValue.split("-")[0])
    );
    const showAlert = yearDifference <= 3;

    if (showAlert) {
      setShowAlert(true);
      return;
    }

    setCapitalGainResult(Math.round(capitalGainResult));
    setCapitalGainTax(Math.round(capitalGainTax));
    setIndexCostprice(Math.round(indexCostprice));

    setShowOutput(true);

    const chartData = {
      series: [
        {
          name: "Capital Gain Data",
          data: [
            Math.floor(Math.round(investedValue)),
            Math.floor(Math.round(indexCostprice)),
            Math.floor(Math.round(sellingPriceValue)),
          ],
        },
      ],
      options: {
        chart: {
          labels: ["Amount Invested", "Indexed Cost Price", "Selling Year"],
          colors: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"],
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
        xaxis: {
          categories: ["Invested Amount", "Indexed Cost Price", "Selling Year"],
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
          <h3>Capital Gain Calculator</h3>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Capital Gain Calculator</DialogTitle>
        <DialogContent>
          {!showOutput ? (
            <form onSubmit={handleSubmit}>
              <TextField
                name="amountInvested"
                label="Amount Invested"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={amountInvested}
                onChange={(e) => setAmountInvested(e.target.value)}
              />
              <TextField
                name="buyYear"
                label="Year of Buying"
                select
                fullWidth
                margin="normal"
                required
                value={buyYear}
                onChange={(e) => setBuyYear(e.target.value)}
              >
                {years.map((year) => (
                  <MenuItem key={year.year} value={year.year}>
                    {year.year}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="sellYear"
                label="Year of Selling"
                select
                fullWidth
                margin="normal"
                required
                value={sellYear}
                onChange={(e) => setSellYear(e.target.value)}
              >
                {years.map((year) => (
                  <MenuItem key={year.year} value={year.year}>
                    {year.year}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="sellingPrice"
                label="Selling Price"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
              />
              <Dialog open={showAlert} onClose={() => setShowAlert(false)}>
                <DialogTitle>Alert</DialogTitle>
                <DialogContent>
                  <h3>
                    Capital Gains is not applicable within{" "}
                    <span style={{ color: "#0b75ff" }}> 3 years.</span>
                    {"  "}
                  </h3>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setShowAlert(false)}
                    color="primary"
                    variant="contained"
                    autoFocus
                  >
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
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
                Capital Gain Calculator
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
                            <Grid item xs={12}>
                              <InputField
                                label="Amount Invested"
                                value={amountInvested}
                                onChange={(e) =>
                                  setAmountInvested(e.target.value)
                                }
                              />
                              <TextField
                                name="buyYear"
                                label="Year of Buying"
                                select
                                fullWidth
                                margin="normal"
                                required
                                value={buyYear}
                                onChange={(e) => setBuyYear(e.target.value)}
                              >
                                {years.map((year) => (
                                  <MenuItem key={year.year} value={year.year}>
                                    {year.year}
                                  </MenuItem>
                                ))}
                              </TextField>
                              <TextField
                                name="sellYear"
                                label="Year of Selling"
                                select
                                fullWidth
                                margin="normal"
                                required
                                value={sellYear}
                                onChange={(e) => setSellYear(e.target.value)}
                              >
                                {years.map((year) => (
                                  <MenuItem key={year.year} value={year.year}>
                                    {year.year}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>
                            <InputField
                              label="Selling Price"
                              value={sellingPrice}
                              onChange={(e) => setSellingPrice(e.target.value)}
                            />
                            <Dialog
                              open={showAlert}
                              onClose={() => setShowAlert(false)}
                            >
                              <DialogTitle>Year Alert</DialogTitle>
                              <DialogContent>
                                <h3>
                                  Capital Gains is not applicable within{" "}
                                  <span style={{ color: "#0b75ff" }}>
                                    3 years.
                                  </span>{" "}
                                </h3>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={() => setShowAlert(false)}
                                  color="primary"
                                  variant="outlined"
                                  autoFocus
                                >
                                  OK
                                </Button>
                              </DialogActions>
                            </Dialog>
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
                              title={"Capital Gain "}
                              CopyValue={`₹${capitalGainResult}`}
                            />
                            <ResultSection
                              title={"Capital Gain Tax"}
                              CopyValue={`₹${capitalGainTax}`}
                            />
                            <ResultSection
                              title={"Index Cost Price"}
                              CopyValue={`₹${indexCostprice}`}
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
                              width={600}
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

export default CapitalGainCalc;
