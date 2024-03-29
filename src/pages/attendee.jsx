import { Helmet } from 'react-helmet-async';

import Attendees from 'src/sections/attendee/view/add/attendee';

// ----------------------------------------------------------------------

export default function AttendeePage() {
  return (
    <>
      <Helmet>
        <title> Attendee </title>
      </Helmet>

      <Attendees/>
    </>
  );
}
