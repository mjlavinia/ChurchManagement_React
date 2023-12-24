import * as React from 'react';

import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  Box,
  FormControl,
  TextField,
  InputLabel,
  Container,
  Grid,
  MenuItem,
  Typography,
  Button,
} from '@mui/material';

export default function InputAdornments() {
  const [formdata, setFormData] = React.useState({
    lastname: '',
    firstname: '',
    middileInitial: '',
    address: '',
    subdivision: undefined,
    barangay: '',
    municipal: '',
    province: '',
    age: undefined,
    civilStatus: undefined,
    isActive: false,
    isMember: false,
    networkHead: '',
    memberDate: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    console.log(formdata);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `Name: ${formdata.firstname}, Email: ${formdata.lastname}, Message: ${formdata.middileInitial}`
    );
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Personal Information
      </Typography>
      <Box
        component="form"
        sx={{ flexGrow: 1 }}
        noValidate
        autoComplete="on"
        onSubmit={handleSubmit}
      >
        <TextField
          sx={{ m: 1, width: '40ch' }}
          required
          id="outlined-required"
          label="Lastname"
          name="lastname"
          onChange={handleChange}
        />

        <TextField
          sx={{ m: 1, width: '40ch' }}
          required
          id="outlined-required"
          label="Firstname"
          name="firstname"
          onChange={handleChange}
        />

        <TextField
          sx={{ m: 1, width: '20ch' }}
          required
          id="outlined-required"
          label="Middle Initial"
          onChange={handleChange}
          name="middleinitial"
        />

        <TextField
          sx={{ m: 1, width: '81.5ch' }}
          required
          id="outlined-required"
          label="Address"
          name="address"
          onChange={handleChange}
        />
       <FormControl sx={{ m: 1, width: '20ch' }}>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formdata.age}
            label="Age"
            onChange={handleChange}
            name="age"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: '80ch' }}>
          <InputLabel id="demo-simple-select-label">Subdivision</InputLabel>
          <Select value={formdata.subdivision} label="Subdivision" onClick={handleChange}>
            <MenuItem value={1}>San Isidro Heights</MenuItem>
            <MenuItem value={2}>Centennial</MenuItem>
            <MenuItem value={3}>Saint Isidore Village</MenuItem>
            <MenuItem value={4}>Canaan Homes</MenuItem>
            <MenuItem value={5}>San Isidro Homes</MenuItem>
            <MenuItem value={6}>Vanessa</MenuItem>
            <MenuItem value={7}>----</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ m: 1, width: '40ch' }}
          size="medium"
          required
          id="outlined-required"
          label="Barangay"
          name="barangay"
        />

        <TextField
          sx={{ m: 1, width: '40ch' }}
          size="medium"
          required
          id="outlined-required"
          label="Municipal"
          name="municipal"
        />

        <TextField
          sx={{ m: 1, width: '40ch' }}
          size="medium"
          required
          id="outlined-required"
          label="Province"
          name="province"
        />
         <FormControl sx={{ m: 1, width: '40ch' }}>
          <InputLabel id="demo-simple-select-label">Civil Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formdata.networkHead}
            label="Lifegroup Leader"
            onChange={handleChange}
          >
            <MenuItem value={1}>Married</MenuItem>
            <MenuItem value={2}>Single</MenuItem>
            <MenuItem value={3}>Widdow</MenuItem>
          </Select>
        </FormControl>
        <Grid className="formspacer" container spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer sx={{ m: 1, width: '40ch' }} components={['DatePicker']}>
              <DatePicker label="BirthDate" />
            </DemoContainer>
          </LocalizationProvider>
          <FormControlLabel
            sx={{ m: 1, width: '20ch' }}
            required
            control={
              <Checkbox
                name="isMember"
                defaultChecked
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              />
            }
            label="isMember"
          />
          <FormControlLabel
            sx={{ m: 1, width: '20ch' }}
            required
            control={
              <Checkbox
                name="isActive"
                defaultChecked
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              />
            }
            label="isActive"
          />
        </Grid>
        <Grid className="formspacer" container spacing={2}>
          <FormControl sx={{ m: 1, width: '40ch' }}>
            <InputLabel id="demo-simple-select-label">Lifegroup Leader</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formdata.networkHead}
              label="Lifegroup Leader"
              onChange={handleChange}
              name="lifegroupleader"
            >
              <MenuItem value={1}>Ten</MenuItem>
              <MenuItem value={2}>Twenty</MenuItem>
              <MenuItem value={3}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <Grid sx={{ m: 1, width: '40ch'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer sx= {{ padding:'0'}} components={['DatePicker']}>
                <DatePicker label="Date First Attended" />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <div id="btn-right-align">
          <Button sx={{ m: 5, width: '20ch', length: '12ch'}} variant="contained" size="large">
            SUBMIT
          </Button>
        </div>
      </Box>
    </Container>
  );
}
