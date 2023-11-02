import { Grid, Card, CardContent } from "@mui/material";
import React from "react";
import CAGRCalc from "./CAGR";
import CapitalGainCalc from "./CapitalGain";
import ChildrenEducationCalc from "./ChildrenEducation";
import CostOfDelayCalc from "./CostOfDelay";
import EmergencyFundCalc from "./EmergencyFund";
import EMICalc from "./EMI";
import FinancialFreedomCalc from "./FinancialFreedom";
import FinancialGoalCalc from "./FinancialGoal";
import FutureValueCalc from "./FutureValue";
import GratuityCalc from "./Gratuity";
import HowLongMoneyWillLastCalc from "./HowLongMoneylasts";
import HRACalc from "./HRA";
import IncomeTaxCalc from "./IncomeTax";
import LifeInsuranceCalc from "./lifeInsurance";
import PortfolioReturnCalc from "./PortfolioReturn";
import PresentValueCalc from "./PresentValue";
import RetirementCalc from "./Retirement";
import ReverseSIPCalc from "./ReverseSIP";
import SIPCalc from "./SIP";
import StepUpSipCalc from "./StepUpSip";

const Calculator = () => {
  return (
    <Grid container spacing={2}>
    <Grid item xs={12}>
        <Card style={{ border: "8px solid white", borderRadius: "12px", }}>
          <CardContent style={{ margin: "-15px", marginLeft: "5px", color:"#14539a" }}>
            <h2>CALCULATORS </h2>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CAGRCalc />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CapitalGainCalc />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <ChildrenEducationCalc />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CostOfDelayCalc />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <EmergencyFundCalc />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <EMICalc />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <FinancialFreedomCalc />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <FinancialGoalCalc />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <FutureValueCalc />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <GratuityCalc />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <HowLongMoneyWillLastCalc />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <HRACalc />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <IncomeTaxCalc />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <LifeInsuranceCalc />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <PortfolioReturnCalc />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <PresentValueCalc />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <RetirementCalc />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <ReverseSIPCalc />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <SIPCalc />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <StepUpSipCalc />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Calculator;
