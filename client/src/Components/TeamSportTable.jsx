import React from "react";
import Table from "react-bootstrap/Table"; // Assuming you are using react-bootstrap components

function TeamSportTable({ sport }) {
  return (
    <div style={{ marginTop: "10px" }}>
      <Table striped bordered hover>
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
            <th>Registration Fee</th>
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
              <React.Fragment key={team.team_name}>
                <tr>
                  <td style={{ textAlign: "center" }} height={50} colSpan={7}>
                    <strong>{team.team_name}</strong>
                  </td>
                </tr>
                {team.members.map((member) => (
                  <tr key={member.userid}>
                    <td>{member.userid}</td>
                    <td>{member.name}</td>
                    <td>{member.cnic}</td>
                    <td>{member.phone_number}</td>
                    <td>{member.email}</td>
                    <td>{member.Fee ? "Paid" : "Not paid"}</td>
                    <td>{member.Challan ? "Paid" : "Not paid"}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default TeamSportTable;
