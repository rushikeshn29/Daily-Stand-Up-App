import "../../Styles/details.css";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import { getEmployeeDetailsById } from "../../Controllers/userController";

const UserProfileCard = () => {
  const employeeId = useParams();

  // States
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    getEmployeeDetailsById(employeeId.id).then((res) => {
      setTeamMembers(res.data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="userprofilecard">
      <CardContent>
        <div className="avtarcard">
          <Avatar
            className="avtarDiv"
            alt="Profile Picture"
            src={teamMembers.profileImage}
          />
        </div>
        <center>
          <Typography
            variant="h4"
            component="div"
            sx={{ marginBottom: 3, fontWeight: "bold" }}
          >
            <strong>
              {" "}
              {teamMembers.firstName} {teamMembers.lastName}
            </strong>
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Email:</strong> {teamMembers.email}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Employee ID:</strong> {teamMembers.employeeId}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            <strong>Department:</strong> {teamMembers.department}
          </Typography>
        </center>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
