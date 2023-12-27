import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import axios from 'axios';


import { emptyRows, applyFilter, getComparator} from 'src/sections/common/utils';
import TableNoData from 'src/sections/common/table-no-data';
import TableToolBar from 'src/sections/common/table-toolbar';
import GenericTableHead from 'src/sections/common/generic-table-head';
import TableEmptyRows from 'src/sections/common/table-empty-rows';
import AttendeeTableRow from '../attendee-table-row';
// ----------------------------------------------------------------------

export default function AttendeeList() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);
  const [attendeeList, setAttendeeList] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
      console.log(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = attendeeList.map((n) => n.lastname);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: attendeeList,
    comparator: getComparator(order, orderBy),
    filterValue: filterName,
    filterColumn: "lastName"

    
  });
  useEffect(()=> {    
  const fetchAttendeeData = async () => {
    let baseurl = import.meta.env
   await axios.get('/api/attendee/all')
    .then( (response)  => {
       setAttendeeList(response.data);
     //  console.log(attendeeList);
    })         
    .catch(function (error) {
      console.log(error);
    });
  };
  fetchAttendeeData();
},[]);
  const notFound = !dataFiltered.length && !!filterName;  
  console.log(dataFiltered);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button>
      </Stack>

      <Card>
        <TableToolBar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <GenericTableHead
                order={order}
                orderBy={orderBy}
                rowCount={dataFiltered.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'lastName', label: 'LastName' },
                  { id: 'firstName', label: 'FirstName' },
                  { id: 'middleName', label: 'Middlename' },
                  { id: 'ismale', checked: 'Male' , label: 'Male' },
                  { id: 'idnumber', label:'IdNumber' },
                ]}
              />
              
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <AttendeeTableRow
                      key={row.id}
                      lastName={row.lastName}
                      firstName={row.firstName}
                      middleName={row.middleName}
                      ismale={row.ismale}
                      avatarUrl={row.avatarUrl}
                      selected={selected.indexOf(row.lastName) !== -1}
                      handleClick={(event) => handleClick(event, row.lastName)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, attendeeList.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
