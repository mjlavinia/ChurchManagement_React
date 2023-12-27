import { Helmet } from 'react-helmet-async';

import AttendeeList from 'src/sections/attendee/view/showlist/view/attendeelist-view';

// ----------------------------------------------------------------------

export default function AttendeeListPage() {
  return (
    <>
      <Helmet>
        <title> TEST </title>
      </Helmet>

      <AttendeeList />
    </>
  );
}
