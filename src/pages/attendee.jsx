import { Helmet } from 'react-helmet-async';

import AttendeeView from 'src/sections/attendee/view/add/attendee-view';

// ----------------------------------------------------------------------

export default function AttendeePage() {
  return (
    <>
      <Helmet>
        <title> Attendee </title>
      </Helmet>

      <AttendeeView />
    </>
  );
}
