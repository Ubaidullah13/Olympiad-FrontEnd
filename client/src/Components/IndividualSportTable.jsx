import React from "react";
import Table from "react-bootstrap/Table"; 
import ReactHTMLTableToExcel from "react-html-table-to-excel";// Assuming you are using react-bootstrap components

function IndividualSportTable({ sport }) {
  const fileName = `${sport.sport}_Sheet`;
  return (
    <div style={{ marginTop: "10px" }}>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button btn btn-success mb-3"
        table="IndiSport-table-to-xls"
        filename={fileName}
        sheet="tablexls"
        buttonText="Export Data to Excel Sheet"
      />
      <h6>Total count of paid teams: {sport.teams.filter((teams) => teams.isChallanPaid !== "not paid").length}</h6>
      <h6>Total count of unpaid teams: {sport.teams.filter((teams) => teams.isChallanPaid === "not paid").length}</h6>
      <h6>Total count: {sport.teams.length}</h6>
      <Table id="IndiSport-table-to-xls" striped bordered hover>
        <thead>
          <tr>
            <td style={{ textAlign: "center" }} height={50} colSpan={7}>
              <strong>{sport.sport}</strong>
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
                <td>{team.members[0].userid}</td>
                <td>{team.members[0].name}</td>
                <td>{team.members[0].cnic}</td>
                <td>{team.members[0].phone_number}</td>
                <td>{team.members[0].email}</td>
                <td>{team.isChallanPaid}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default IndividualSportTable;
