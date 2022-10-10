import React from "react";
import {
  AppContainer,
  AppTitle,
  Table,
  TableData,
  TableHead,
  Text,
} from "../../styles/styled-components/app/appComponents";

const profile = () => {
  return (
    <AppContainer>
      <AppTitle>Profile</AppTitle>
      <Text>Your history</Text>
      <Table>
        <tr>
          <TableHead>
            <Text>Session Id</Text>
          </TableHead>
          <TableHead>
            <Text>Session Title</Text>
          </TableHead>
          <TableHead>
            <Text>Voted For</Text>
          </TableHead>
          <TableHead>
            <Text>Time Stamp</Text>
          </TableHead>
        </tr>
        <tr>
          <TableData>1313131</TableData>
          <TableData>Lorem Ipsum</TableData>
          <TableData>Candidate 1</TableData>
          <TableData>03/04/2022</TableData>
        </tr>
      </Table>
    </AppContainer>
  );
};

export default profile;
