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
import ReactApexChart from 'react-apexcharts';
import ButtonCalc from "./Components/ButtonCalc";

const PortfolioReturnCalc = () => {
  const [open, setOpen] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const [directStocks, setDirectStocks] = useState("");
  const [equityMutualFunds, setEquityMutualFunds] = useState("");
  const [ulips, setUlips] = useState("");
  const [nps, setNps] = useState("");
  const [etfs, setEtfs] = useState("");
  const [land, setLand] = useState("");
  const [residentialHouse, setResidentialHouse] = useState("");
  const [realEstate, setRealEstate] = useState("");
  const [gold, setGold] = useState("");
  const [savingsBank, setSavingsBank] = useState("");
  const [loanGiven, setLoanGiven] = useState("");
  const [debtMutualFunds, setDebtMutualFunds] = useState("");
  const [fixedDeposits, setFixedDeposits] = useState("");
  const [ppf, setPpf] = useState("");
  const [epf, setEpf] = useState("");
  const [postalDeposits, setPostalDeposits] = useState("");
  const [insurancePolicies, setInsurancePolicies] = useState("");
  const [otherAssets, setOtherAssets] = useState("");

  //charts

  const [equityAllocation, setEquityAllocation] = useState("");
  const [debtAllocation, setDebtAllocation] = useState("");
  const [goldAllocation, setGoldAllocation] = useState("");
  const [realestateAllocation, setRealestateAllocation] = useState("");
  const [cashAllocation, setCashAllocation] = useState("");

  //results
  const [portfolioReturn, setPortfolioReturn] = useState("");
  const [totalClassValue, setTotalClassValue] = useState("");
  const [totalAssetsValue, setTotalAssetsValue] = useState("");

  //ShowOutput
  const [showOutput, setShowOutput] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDirectStocks("");
    setEquityMutualFunds("");
    setUlips("");
    setNps("");
    setEtfs("");
    setLand("");
    setResidentialHouse("");
    setRealEstate("");
    setGold("");
    setSavingsBank("");
    setLoanGiven("");
    setDebtMutualFunds("");
    setFixedDeposits("");
    setPpf("");
    setEpf("");
    setPostalDeposits("");
    setInsurancePolicies("");
    setOtherAssets("");
    setPortfolioReturn("");
    setTotalClassValue("");
    setTotalAssetsValue("");
    setCashAllocation("");
    setEquityAllocation("");
    setDebtAllocation("");
    setGoldAllocation("");
    setRealestateAllocation("");
    setShowOutput(false);
  };

  const handleClear = () => {
    setDirectStocks("");
    setEquityMutualFunds("");
    setUlips("");
    setNps("");
    setEtfs("");
    setLand("");
    setResidentialHouse("");
    setRealEstate("");
    setGold("");
    setSavingsBank("");
    setLoanGiven("");
    setDebtMutualFunds("");
    setFixedDeposits("");
    setPpf("");
    setEpf("");
    setPostalDeposits("");
    setInsurancePolicies("");
    setOtherAssets("");
  };

  const handleCardClick = () => {
    handleClickOpen();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve the values entered in the form
    const directStocksValue = parseFloat(directStocks);
    const equityMutualFundsValue = parseFloat(equityMutualFunds);
    const ulipsValue = parseFloat(ulips);
    const npsValue = parseFloat(nps);
    const etfsValue = parseFloat(etfs);
    const landValue = parseFloat(land);
    const residentialHouseValue = parseFloat(residentialHouse);
    const realEstateValue = parseFloat(realEstate);
    const goldValue = parseFloat(gold);
    const savingsBankValue = parseFloat(savingsBank);
    const loanGivenValue = parseFloat(loanGiven);
    const debtMutualFundsValue = parseFloat(debtMutualFunds);
    const fixedDepositsValue = parseFloat(fixedDeposits);
    const ppfValue = parseFloat(ppf);
    const epfValue = parseFloat(epf);
    const postalDepositsValue = parseFloat(postalDeposits);
    const insurancePoliciesValue = parseFloat(insurancePolicies);
    const otherAssetsValue = parseFloat(otherAssets);

    // Calculate the class values

    const equityClass =
      directStocksValue +
      equityMutualFundsValue +
      ulipsValue +
      npsValue +
      etfsValue;
    const debtClass =
      debtMutualFundsValue +
      fixedDepositsValue +
      ppfValue +
      epfValue +
      postalDepositsValue +
      insurancePoliciesValue +
      otherAssetsValue;
    const realestateClass = landValue + residentialHouseValue + realEstateValue;
    const goldClass = goldValue;
    const cashClass = savingsBankValue + loanGivenValue;

    // Calculate the Total class value
    const totalClassValue =
      equityClass + debtClass + realestateClass + goldClass + cashClass;

    // Calculate the allocation for every Class
    const equityAllocation = equityClass / totalClassValue;
    const debtAllocation = debtClass / totalClassValue;
    const realestateAllocation = realestateClass / totalClassValue;
    const goldAllocation = goldClass / totalClassValue;
    const cashAllocation = cashClass / totalClassValue;
    console.log("CashALLOCATION", cashAllocation);
    console.log("equityAllocation", equityAllocation);
    console.log("debtAllocation", debtAllocation);
    console.log("realestateAllocation", realestateAllocation);
    console.log("goldAllocation", goldAllocation);

    //Assumed return for each class
    const equityReturn = 0.12;
    const debtReturn = 0.08;
    const realEstateReturn = 0.1;
    const goldReturn = 0.09;
    const cashReturn = 0.035;

    // Calculate RAO value
    const raoEquityValue = equityClass * (1 + equityReturn);
    const raoDebtValue = debtClass * (1 + debtReturn);
    const raoRealEstateValue = realestateClass * (1 + realEstateReturn);
    const raoGoldValue = goldClass * (1 + goldReturn);
    const raoCashValue = cashClass * (1 + cashReturn);

    //total Outputs
    //total assets value
    const totalAssetsValue =
      raoEquityValue +
      raoDebtValue +
      raoRealEstateValue +
      raoGoldValue +
      raoCashValue;

    // Calculate the portfolio return
    const portfolioReturn =
      (equityAllocation * equityReturn +
        debtAllocation * debtReturn +
        realestateAllocation * realEstateReturn +
        goldAllocation * goldReturn +
        cashAllocation * cashReturn) *
      100;

    setTotalAssetsValue(Math.round(totalAssetsValue));
    setTotalClassValue(Math.round(totalClassValue));
    setPortfolioReturn(portfolioReturn.toFixed(2));

    setEquityAllocation(Math.round(equityAllocation * 100));
    setDebtAllocation(Math.round(debtAllocation * 100));
    setRealestateAllocation(Math.round(realestateAllocation * 100));
    setGoldAllocation(Math.round(goldAllocation * 100));
    setCashAllocation(Math.round(cashAllocation * 100));
    setShowOutput(true);
  };

  const chartData = {
    series: [
      equityAllocation,
      debtAllocation,
      realestateAllocation,
      goldAllocation,
      cashAllocation,
    ],
    options: {
      chart: {
        width: 300,
        type: "pie",
      },
      labels: ["Equity", "Debt", "RealEstate", "Gold", "Cash"],
      legend: {
        position: "top",
      },
      dataLabels: {
        enabled: true,
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
          <h3>Portfolio Return Calculator</h3>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Portfolio Return Calculator</DialogTitle>
        <DialogContent>
          {!showOutput ? (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name="directStocks"
                    label="Direct Stocks"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="0.01"
                    value={directStocks}
                    onChange={(e) => setDirectStocks(e.target.value)}
                  />
                  <TextField
                    name="equityMutualFunds"
                    label="Equity Mutual Funds"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="0.01"
                    value={equityMutualFunds}
                    onChange={(e) => setEquityMutualFunds(e.target.value)}
                  />
                  <TextField
                    name="ulips"
                    label="ULIPs"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="0.01"
                    value={ulips}
                    onChange={(e) => setUlips(e.target.value)}
                  />
                  <TextField
                    name="nps"
                    label="NPS"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="0.01"
                    value={nps}
                    onChange={(e) => setNps(e.target.value)}
                  />
                  <TextField
                    name="etfs"
                    label="ETFs and Index Funds"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="0.01"
                    value={etfs}
                    onChange={(e) => setEtfs(e.target.value)}
                  />
                  <TextField
                    name="land"
                    label="Land"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="0.01"
                    value={land}
                    onChange={(e) => setLand(e.target.value)}
                  />
                  <TextField
                    name="residentialHouse"
                    label="Residential House"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="0.01"
                    value={residentialHouse}
                    onChange={(e) => setResidentialHouse(e.target.value)}
                  />

                  <TextField
                    name="realEstate"
                    label="Real Estate Investments"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="0.01"
                    value={realEstate}
                    onChange={(e) => setRealEstate(e.target.value)}
                  />
                  <TextField
                    name="gold"
                    label="Gold"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="0.01"
                    value={gold}
                    onChange={(e) => setGold(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="savingsBank"
                    label="Cash/Money in Savings Bank"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="0.01"
                    value={savingsBank}
                    onChange={(e) => setSavingsBank(e.target.value)}
                  />
                  <TextField
                    name="loanGiven"
                    label="Loan Given to Someone"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="0.01"
                    value={loanGiven}
                    onChange={(e) => setLoanGiven(e.target.value)}
                  />
                  <TextField
                    name="debtMutualFunds"
                    label="Debt Mutual Funds"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="0.01"
                    value={debtMutualFunds}
                    onChange={(e) => setDebtMutualFunds(e.target.value)}
                  />
                  <TextField
                    name="fixedDeposits"
                    label="Fixed Deposits"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="0.01"
                    value={fixedDeposits}
                    onChange={(e) => setFixedDeposits(e.target.value)}
                  />
                  <TextField
                    name="ppf"
                    label="PPF"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="0.01"
                    value={ppf}
                    onChange={(e) => setPpf(e.target.value)}
                  />
                  <TextField
                    name="epf"
                    label="EPF"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="0.01"
                    value={epf}
                    onChange={(e) => setEpf(e.target.value)}
                  />
                  <TextField
                    name="postalDeposits"
                    label="Postal Deposits/Bonds"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="0.01"
                    value={postalDeposits}
                    onChange={(e) => setPostalDeposits(e.target.value)}
                  />
                  <TextField
                    name="insurancePolicies"
                    label="Current Worth of Insurance Policies"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="0.01"
                    value={insurancePolicies}
                    onChange={(e) => setInsurancePolicies(e.target.value)}
                  />
                  <TextField
                    name="otherAssets"
                    label="Any Other Assets"
                    fullWidth
                    margin="normal"
                    required
                    type="number"
                    step="0.01"
                    value={otherAssets}
                    onChange={(e) => setOtherAssets(e.target.value)}
                  />
                </Grid>
              </Grid>
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
                Portfolio Return Calculator
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
                    md={6}
                    style={{ height: "100%", overflowY: "auto" }}
                  >
                    <Card style={{ height: "100%" }}>
                      <CardContent>
                        <form onSubmit={handleSubmit}>
                          <Grid container spacing={1}>
                            <Grid item xs={12} md={6}>
                              <InputField
                                label="Direct Stocks"
                                value={directStocks}
                                onChange={(e) =>
                                  setDirectStocks(e.target.value)
                                }
                              />
                              <InputField
                                label="Equity Mutual Funds"
                                value={equityMutualFunds}
                                onChange={(e) =>
                                  setEquityMutualFunds(e.target.value)
                                }
                              />
                              <InputField
                                label="ULIPs"
                                value={ulips}
                                onChange={(e) => setUlips(e.target.value)}
                              />
                              <InputField
                                label="NPS"
                                value={nps}
                                onChange={(e) => setNps(e.target.value)}
                              />
                              <InputField
                                label="ETFs and Index Funds"
                                value={etfs}
                                onChange={(e) => setEtfs(e.target.value)}
                              />
                              <InputField
                                label="Land"
                                value={land}
                                onChange={(e) => setLand(e.target.value)}
                              />
                              <InputField
                                label="Residential House"
                                value={residentialHouse}
                                onChange={(e) =>
                                  setResidentialHouse(e.target.value)
                                }
                              />
                              <InputField
                                label="Real Estate Investments"
                                value={realEstate}
                                onChange={(e) => setRealEstate(e.target.value)}
                              />
                              <InputField
                                label="Gold"
                                value={gold}
                                onChange={(e) => setGold(e.target.value)}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <InputField
                                label="Savings Bank"
                                value={savingsBank}
                                onChange={(e) => setSavingsBank(e.target.value)}
                              />
                              <InputField
                                label="Loan Given to Someone"
                                value={loanGiven}
                                onChange={(e) => setLoanGiven(e.target.value)}
                              />
                              <InputField
                                label="Debt Mutual Funds"
                                value={debtMutualFunds}
                                onChange={(e) =>
                                  setDebtMutualFunds(e.target.value)
                                }
                              />
                              <InputField
                                label="Fixed Deposits"
                                value={fixedDeposits}
                                onChange={(e) =>
                                  setFixedDeposits(e.target.value)
                                }
                              />
                              <InputField
                                label="PPF"
                                value={ppf}
                                onChange={(e) => setPpf(e.target.value)}
                              />
                              <InputField
                                label="EPF"
                                value={epf}
                                onChange={(e) => setEpf(e.target.value)}
                              />
                              <InputField
                                label="Postal Deposits/Bonds"
                                value={postalDeposits}
                                onChange={(e) =>
                                  setPostalDeposits(e.target.value)
                                }
                              />
                              <InputField
                                label="Insurance Policies"
                                value={insurancePolicies}
                                onChange={(e) =>
                                  setInsurancePolicies(e.target.value)
                                }
                              />
                              <InputField
                                label="Other Assets"
                                value={otherAssets}
                                onChange={(e) => setOtherAssets(e.target.value)}
                              />
                            </Grid>
                            <CalcButton
                              onClear={handleClear}
                              onClose={handleClose}
                            />
                          </Grid>
                        </form>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6} style={{ height: "100%" }}>
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
                              title="Portfolio Return"
                              CopyValue={`${portfolioReturn}%`}
                            />
                            <ResultSection
                              title="Total Assets Value"
                              CopyValue={`₹${totalAssetsValue}`}
                            />
                            <ResultSection
                              title="Total Investments"
                              CopyValue={`₹${totalClassValue}`}
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
                              width={500}
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

export default PortfolioReturnCalc;
