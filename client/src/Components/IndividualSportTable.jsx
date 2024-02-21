import React from "react";
import Table from "react-bootstrap/Table"; // Assuming you are using react-bootstrap components

function IndividualSportTable({ sport }) {
  return (
    <div style={{ marginTop: "10px" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td style={{ textAlign: "center" }} height={50} colSpan={7}>
              <strong>{sport.sportName}</strong>
            </td>
          </tr>
          <tr>
            <th>User ID</th>
            <th>UserName</th>
            <th>CNIC No.</th>
            <th>Phone No.</th>
            <th>Email</th>
            <th>Challan Fee</th>
          </tr>
        </thead>
        <tbody>
          {sport.teams.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={7}>
                No entries Found
              </td>
            </tr>
          ) : (
            sport.teams.map((team) => (
              <tr key={team.members[0].id}>
                <td>{team.members[0].id}</td>
                <td>{team.members[0].name}</td>
                <td>{team.members[0].cnic}</td>
                <td>{team.members[0].phoneno}</td>
                <td>{team.members[0].email}</td>
                <td>{team.members[0].isChallanPaid ? "Paid" : "Not paid"}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default IndividualSportTable;
