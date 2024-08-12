import { Suspense } from "react";
import {
  CardBetween,
  CardCenter,
  CardContent,
  Column,
  LineCharts,
  PieChart,
  Row,
  Loading,
} from "remoteApp/Components";
export const Home = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Column>
        <CardContent
          containerSize="100%"
          contentSize="100%"
          box="primary"
          bg="white"
        >
          <CardCenter>
            <CardBetween>
              <PieChart />
              <LineCharts />
            </CardBetween>
          </CardCenter>
        </CardContent>
      </Column>
      <Row />
      <Column>
        <CardContent containerSize="100%" contentSize="100%">
          <CardCenter>
            <CardBetween>
              <h2>Aviso</h2>
              <h2>Aviso</h2>
            </CardBetween>
          </CardCenter>
        </CardContent>
        <Row />
        <CardContent containerSize="100%" contentSize="100%">
          <CardCenter>
            <CardBetween>
              <h2>Aviso</h2>
              <h2>Aviso</h2>
            </CardBetween>
          </CardCenter>
        </CardContent>
        <Row />
        <CardContent containerSize="100%" contentSize="100%">
          <CardCenter>
            <CardBetween>
              <h2>Aviso</h2>
              <h2>Aviso</h2>
            </CardBetween>
          </CardCenter>
        </CardContent>
        <Row />
      </Column>
    </Suspense>
  );
};
