import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import {Link}  from 'react-router-dom';
// ----------------------------------------------------------------------

export default function AttendeeTableRow({
  selected,
  lastName,
  firstName,
  middleName,
  address,
  avatarUrl,
  id,
  iDnumber,
  ismale,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = (rowId) => {
    setOpen(null);
    console.log(rowId);
  //  this.props.history.push('/attendee/'+ ); // Navigate to the '/about' route

  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar  src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {lastName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{firstName}</TableCell>

        <TableCell>{middleName}</TableCell>

        <TableCell align="center">{ismale ? 'Yes' : 'No'}</TableCell>

        <TableCell>{iDnumber}</TableCell>

        
        <TableCell>{id}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={() =>handleCloseMenu(id)}  component={Link} to={`/attendee/edit/ ${id}` }> 
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
        Edit 
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

AttendeeTableRow.propTypes = {
  address: PropTypes.any,
  handleClick: PropTypes.func,
  ismale: PropTypes.any,
  lastName: PropTypes.any,
  firstName: PropTypes.any,
  middleName: PropTypes.any,
  selected: PropTypes.any,
  avatarUrl: PropTypes.any,
  id:PropTypes.any,
  iDnumber:PropTypes.any,
};
