import * as React from 'react';
import dayjs from 'dayjs';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useEffect,useRef } from 'react';
import axios from 'axios';
import { DevTool } from '@hookform/devtools';
import SearchLeader from './searchLeader';

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
  Autocomplete,

} from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';



export default function Attendees() {

  const [formdata, setFormData] = React.useState({})
  const { attendeeId } = useParams();
  const { register, handleSubmit, formState, control, reset, defaultValue } = useForm();
  const { errors } = formState;
  const networkId = useRef(undefined);
  useEffect(() => {
    const fetchAttendeeData = async (id) => {
      await axios.get(`/api/Attendee/id?id= ${id}`)
        .then((response) => {
          let attendee = response.data;
          console.log(networkId.current);
          setFormData({...attendee});
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchAttendeeData(attendeeId);
  }, []);

  useEffect(() => {
    console.log(formdata);

    reset({
      ...formdata,
      civilStatusID: formdata.civilStatusID
    })

    console.log(formdata.networkLeaderId);
  }, [formdata]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log([name]);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
   

  };
  const handleAutoCompleteChange = (id) => {
   // setVal(data);
    console.log(id);
    setFormData((prevFormData) => ({ ...prevFormData, networkLeaderId: id }));
   console.log(formdata);

  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: checked }));
  };

  const onSubmit = (event) => {
    if (attendeeId) {
      axios.put('/api/attendee', formdata)
        .then((response) => {
          console.log('tama');
          console.log(response.data);
          console.log(formdata);
        })
        .catch((error) => {
          console.log('mali');
          console.log(error);
        });
    }
    else {
      axios.post('/api/attendee', formdata)
        .then((response) => {
          console.log('tama');
          console.log(response.data);
          setPost(response.data);
        })
        .catch((error) => {
          console.log('mali');
          console.log(error);
        });
    }
    alert(
      `Name: ${formdata.firstName}, Email: ${formdata.lastName}, Message: ${formdata.middleName}`
    );
  };

  const filterOptions = createFilterOptions({
    ignoreCase: true,
  });





  //console.log(formdata);
  return (

    <Container maxWidth='lg'  >
      <Typography variant="h4" sx={{ mb: 5 }}>
        Personal Information
      </Typography>

      <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
     
        <Controller render={({ field }) => (<TextField
          {...field}
          label="Lastname"
          sx={{ m: 1, width: '40ch' }}
          required
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          {...register("lastName", { required: "required", onChange: (e) => handleChange(e) })}
          ref={null}
        />)}
          name="lastName"
          id="outlined-required"

          control={control}
          defaultValue=""
        />

        <Controller render={({ field }) =>
        (<TextField
          {...field}
          label="FirstName" sx={{ m: 1, width: '35ch' }}
          required error={!!errors.firstName} helperText={errors.firstName?.message}
          {...register("firstName", { required: "required", onChange: (e) => handleChange(e) })}

        />)}
          name="firstName"
          id="outlined-required"
          control={control}
          defaultValue=""
        />


        <Controller render={({ field }) => (<TextField
          {...field}
          label="Middle Name"
          sx={{ m: 1, width: '35ch' }}
          required error={!!errors.middleName} helperText={errors.middleName?.message}
          {...register("middleName", { required: "required", onChange: (e) => handleChange(e) })}

        />)}
          name="middleName"
          id="outlined-required"

          control={control}
          defaultValue=""
        />

        <Controller render={({ field }) => (<TextField
          {...field}
          label="Address"
          sx={{ m: 1, width: '113ch' }}
          x
          required error={!!errors.address} helperText={errors.address?.message}
          ref={null}
        />)}
          name="address"
          id="outlined-required"
          {...register("address", { required: "required", onChange: (e) => handleChange(e) })}
          control={control}
          defaultValue=""
        />

        <FormControl sx={{ m: 1, width: '96%' }}>
          <InputLabel id="demo-simple-select-label">Subdivision</InputLabel>
          <Select value={7} label="Subdivision" onClick={handleChange} {...register("subdivision", { onChange: (e) => handleChange(e) })}>
            <MenuItem value={1}>San Isidro Heights</MenuItem>
            <MenuItem value={2}>Centennial</MenuItem>
            <MenuItem value={3}>Saint Isidore Village</MenuItem>
            <MenuItem value={4}>Canaan Homes</MenuItem>
            <MenuItem value={5}>San Isidro Homes</MenuItem>
            <MenuItem value={6}>Vanessa</MenuItem>
          </Select>
        </FormControl>

        <Controller render={({ field }) => (<TextField
          {...field}
          label="Barangay"
          sx={{ m: 1, width: '47%' }}
          required error={!!errors.barangay} helperText={errors.barangay?.message}
          {...register("barangay", { onChange: (e) => handleChange(e) })}
          ref={null}
        />)}
          name="barangay" id="outlined-required"

          control={control}
          defaultValue=""
        />

        <Controller render={({ field }) => (<TextField
          {...field}
          label="Municipal"
          sx={{ m: 1, width: '47%' }}
          required error={!!errors.municipal} helperText={errors.municipal?.message}
          {...register("municipal", { onChange: (e) => handleChange(e) })}
        />)}
          name="municipal" id="outlined-required"

          control={control}
          defaultValue=""
        />
        <Controller render={({ field }) => (<TextField
          {...field}
          label="Province"
          sx={{ m: 1, width: '40ch' }}
          required error={!!errors.province} helperText={errors.province?.message}
        />)}
          name="province" id="outlined-required"
          {...register("province", { onChange: (e) => handleChange(e) })}
          control={control}
          defaultValue=""
        />

        <FormControl sx={{ m: 1, width: '40ch' }}>
          <InputLabel id="demo-simple-select-label">Civil Status</InputLabel>
          <Select defaultValue={formdata.civilStatusID ? 2 : formdata.civilStatusID} label="Civil Status" onClick={handleChange} {...register("civilStatusID", { onChange: (e) => handleChange(e) })}>
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
          <FormControl sx={{ m: 1, width: '30ch' }}>
            <Controller render={({ field }) => (<TextField
              {...field}
              label="Age"
              sx={{ m: 1, width: '40ch' }}
              required
              error={!!errors.ageAttended}
              helperText={errors.ageAttended?.message}
            />)}
              name="ageAttended"
              id="outlined-required"
              {...register("ageAttended", { required: "required", onChange: (e) => handleChange(e) })}
              control={control}
              defaultValue=""
            />
          </FormControl>
        </Grid>
        <Grid className="formspacer" container spacing={2} >
          <FormControl sx={{ m: 1, width: '50ch' }}>
            <SearchLeader onChanges={handleAutoCompleteChange} control={control} id={formdata.networkLeaderId}
              register={register}
            ></SearchLeader>

          </FormControl>
          <Grid >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer sx={{ m: 1, width: '40ch' }} components={['DatePicker']}>
                <DatePicker label="Date First Attended" value={dayjs('2022-04-17')} />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          <Grid className="formspacer" container spacing={2}>
            <FormControlLabel
              sx={{ m: 2, width: '20ch' }}
              required
              control={
                <Checkbox
                  name="isMember"
                  {...register("isMember", {})}
                  checked={formdata.isMember ? true : false}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
              }
              label="isMember"
            />
            <FormControlLabel
              sx={{ m: 2, width: '20ch' }}
              required
              control={
                <Checkbox
                  name="isActive"
                  {...register("isActive", { onChange: (e) => handleCheckboxChange(e) })}
                  checked={formdata.isActive ? true : false}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
              }
              label="isActive"
            />
          </Grid>

        </Grid>
        <div>
          <div style={{ display: "flex" }}>
            <Button type='submit' sx={{ m: 8, width: '96%', height: '100%' }} variant="contained" style={{ margin: "7px", padding:'15px' }}>
              SUBMIT
            </Button>
          </div>
          
           { Object.keys(formdata).map((obj, i)=>
               <p>{obj} is {formdata[obj]}</p> 
                       
         )}
        </div>
      </Box>

      <DevTool control={control} />
    </Container>
  );
}

