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

const ChildrenEducationCalc = () => {
  const [open, setOpen] = useState(false);
  const [childAge, setChildAge] = useState("");
  const [graduationExpenses, setGraduationExpenses] = useState("");
  const [postGraduationExpenses, setPostGraduationExpenses] = useState("");
  const [educationInflation, setEducationInflation] = useState("");
  const [returnRate, setReturnRate] = useState("");
  const [educationGoal, setEducationGoal] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "children-education-chart",
      toolbar: {
        show: false,
      },
      tooltip: {
        enabled: true,
      },
    },
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
      categories: ["Graduation", "Post-Graduation"],
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: "Money Required",
      data: [], // Data will be added dynamically
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
    setChildAge("");
    setGraduationExpenses("");
    setPostGraduationExpenses("");
    setEducationInflation("");
    setReturnRate("");
    setEducationGoal("");
    setShowOutput(false);
  };

  const handleClear = () => {
    setChildAge("");
    setGraduationExpenses("");
    setPostGraduationExpenses("");
    setEducationInflation("");
    setReturnRate("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ageValue = parseFloat(childAge);
    const graduationExpensesValue = parseFloat(graduationExpenses);
    const postGraduationExpensesValue = parseFloat(postGraduationExpenses);
    const inflationRateValue = parseFloat(educationInflation) / 100;
    const returnRateValue = parseFloat(returnRate) / 100;

    const graduateValue = Math.round(
      graduationExpensesValue * Math.pow(1 + inflationRateValue, 18 - ageValue)
    );
    const postGraduateValue = Math.round(
      postGraduationExpensesValue *
        Math.pow(1 + inflationRateValue, 21 - ageValue)
    );
    const calculatedPercentage =
      (1 + returnRateValue) / (1 + inflationRateValue) - 1;
    const totalRequired = graduateValue + postGraduateValue;
    const sipRequired =
      (totalRequired * (returnRateValue / 12)) /
      (Math.pow(1 + returnRateValue / 12, (18 - ageValue) * 12) - 1);

    setEducationGoal({
      sipRequired: Math.round(sipRequired),
      totalRequired: Math.round(totalRequired),
      graduateValue: Math.round(graduateValue),
      postGraduateValue: Math.round(postGraduateValue),
    });
    setShowOutput(true);

    setChartSeries([
      {
        name: "Money Required",
        data: [graduateValue, postGraduateValue],
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
          <h3>Children Education Calculator</h3>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Children Education Calculator</DialogTitle>
        <DialogContent>
          {!showOutput ? (
            <form onSubmit={handleSubmit}>
              <TextField
                name="childAge"
                label="Child's Age"
                fullWidth
                margin="normal"
                required
                type="number"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
              />
              <TextField
                name="graduationExpenses"
                label="Graduation Expenses"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={graduationExpenses}
                onChange={(e) => setGraduationExpenses(e.target.value)}
              />
              <TextField
                name="postGraduationExpenses"
                label="Post-Graduation Expenses"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={postGraduationExpenses}
                onChange={(e) => setPostGraduationExpenses(e.target.value)}
              />
              <TextField
                name="educationInflation"
                label="Education Inflation (%)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={educationInflation}
                onChange={(e) => setEducationInflation(e.target.value)}
              />
              <TextField
                name="returnRate"
                label="Return Rate (%)"
                fullWidth
                margin="normal"
                required
                type="number"
                step="0.01"
                value={returnRate}
                onChange={(e) => setReturnRate(e.target.value)}
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
                Children Education Calculator
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                style={{ position: "absolute", right: 10, top: 10 }}
              >
                <CloseIcon color="primary" />
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
                              label="Child Age"
                              value={childAge}
                              onChange={(e) => setChildAge(e.target.value)}
                            />
                            <InputField
                              label="Graduation Expenses"
                              value={graduationExpenses}
                              onChange={(e) =>
                                setGraduationExpenses(e.target.value)
                              }
                            />
                            <InputField
                              label="Post-Graduation Expenses"
                              value={postGraduationExpenses}
                              onChange={(e) =>
                                setPostGraduationExpenses(e.target.value)
                              }
                            />
                            <InputField
                              label="Education Inflation (%)"
                              value={educationInflation}
                              onChange={(e) =>
                                setEducationInflation(e.target.value)
                              }
                            />
                            <InputField
                              label="Return Rate (%)"
                              value={returnRate}
                              onChange={(e) => setReturnRate(e.target.value)}
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
                                title="SIP Required To Achieve Target"
                                CopyValue={`₹${educationGoal.sipRequired}`}
                              />
                              <ResultSection
                                title="Money Required for Graduation"
                                CopyValue={`₹${educationGoal.graduateValue}`}
                              />
                              <ResultSection
                                title="Money Required for Post-Graduation"
                                CopyValue={`₹${educationGoal.postGraduateValue}`}
                              />
                              <ResultSection
                                title="Total Money Required"
                                CopyValue={`₹${educationGoal.totalRequired}`}
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
                                height={250}
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

export default ChildrenEducationCalc;
