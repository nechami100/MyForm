import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";

import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Divider,
} from "@material-ui/core";

const Form = () => {
  const paperStayle = { padding: "30px", width: 300, margin: "20px auto" };
  const [children, setChildren] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState();
  const [birthDate, setBirthDate] = useState();

  //שמירה
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let user = {
      firstName: firstName,
      lastName: lastName,
      ID: id,
      Birthdate: birthDate,
      childrenCount: data.get("childrenCount"),
    };
    for (let i = 0; i < parseInt(user.childrenCount ?? "0"); i++) {
      user = {
        ...user,
        [`childName${i}`]: data.get(`childName${i}`),
        [`childID${i}`]: data.get(`childID${i}`),
        [`childBirthDate${i}`]: data.get(`childBirthDate${i}`),
      };
    }
    //שמירת קובץ
    const blob = new Blob([JSON.stringify(user, null, 2)], {
      type: "application/json",
    });

    saveFile(blob);
  };
  const saveFile = async (blob) => {
    const a = document.createElement("a");
    a.download = "my-file.txt";
    a.href = URL.createObjectURL(blob);
    a.addEventListener("click", (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };
  //יצירת מערך עם מספר ילדים
  const onChangeChildrenCount = (event) => {
    const c = parseInt(event.target.value);
    setChildren(new Array(c).fill({}));
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperStayle}>
        <Grid align="center">
          <Avatar></Avatar>

          <h2>Hello {firstName ?? "" + lastName ?? ""}</h2>

          <Typography variant="caption">Please fill out the form</Typography>
        </Grid>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ display: "grid", gridTemplateRows: "repeat(3, 1fr)", gap: 2 }}
        >
          <TextField
            fullWidth
            type="text"
            label="first name"
            name="firstName"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            variant="outlined"
          />
          <TextField
            fullWidth
            type="text"
            label="last name"
            name="lastName"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            variant="outlined"
          />
          <TextField
            type="number"
            fullWidth
            label="ID"
            name="ID"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
            variant="outlined"
          />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              style={{ display: "initial" }}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
          <TextField
            type="date"
            placeholder="Enter Date of birth"
            name="Birthdate"
            value={birthDate}
            onChange={(e) => {
              setBirthDate(e.target.value);
            }}
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            type="number"
            fullWidth
            label="number child"
            name="childrenCount"
            onChange={onChangeChildrenCount}
            variant="outlined"
          />
          {children.map((child, index) => (
            <>
              <Divider />
              <TextField
                fullWidth
                label="name"
                name={`childName${index}`}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="ID"
                name={`childID${index}`}
                variant="outlined"
              />
              <TextField
                type="date"
                name={`childBirthDate${index}`}
                placeholder="Enter Date of birth"
                fullWidth
                required
                variant="outlined"
              />
            </>
          ))}
          <Button type="submit" variant="contained" color="primary">
            save
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Form;