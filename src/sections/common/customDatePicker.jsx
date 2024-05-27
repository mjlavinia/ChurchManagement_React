import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';
import React from 'react';

export default function DatePickerValue ({ control, name, label , register, props, }) {

  return (
    <Controller
      name={name}
      control={control}
      register={register}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={label}
            value={field.value}
            onChange={(date) => field.onChange(date)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      )}
    />
  );
};