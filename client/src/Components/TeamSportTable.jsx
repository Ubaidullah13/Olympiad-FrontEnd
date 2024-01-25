import React from "react";
import Table from "react-bootstrap/Table"; // Assuming you are using react-bootstrap components

function TeamSportTable({ sport }) {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>UserName</th>
            <th>CNIC No.</th>
            <th>Phone No.</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {sport.teams.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={5}>
                No entries Found
              </td>
            </tr>
          ) : (
            sport.teams.map((team) => (
              <React.Fragment key={team.team_name}>
                <tr>
                  <td style={{ textAlign: "center" }} colSpan={5}>
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
