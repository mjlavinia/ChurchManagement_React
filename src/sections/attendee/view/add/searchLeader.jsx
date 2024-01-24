import React from "react";
import {Autocomplete,TextField} from "@mui/material";  
import { Controller } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { register } from "numeral";
import { ViewKanban } from "@mui/icons-material";
import { set } from "lodash";
export default function searchLeader({ onChanges, control, register, id}) {

  const [lists, setLists] = useState([null]); 
  const [val , setVal] = useState({}); 
   
  useEffect(() => {
    const fetchAttendeeData = async () => {
        await axios.get('/api/AttendeeLookup/namelists')
            .then((res) => {
                let namelist = res.data;
                setLists(namelist);   
                console.log(id);
                setVal(namelist.find(r=>r.id ===id));

                console.log(val);
                console.log("autocomplete processed");
            });
    };
    fetchAttendeeData();
  }, [id]);

  const handleChange = (e,data) => {
    console.log(data.id);
      setVal(data);
      onChanges(data.id);
     
  }
    return (  
      <>     
        <Controller
          render={({ onChange, ...props }) => (
            <Autocomplete
            id="combo-box-demo"
              options={lists}
              getOptionLabel={(option) => option.fullName}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.id}>
                    {option.fullName}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose a country"
                  variant="outlined"
                  clearOnBlur
                />
              )}
             onChange={(e,data)  =>handleChange(e,data) }
             name="networkLeaderId"
              value={val}
            />

          )}
         
         // onChange={(e) => onChanges(e)}
         
          name="networkLeaderId"
          control={control}

        />

</>
);

}