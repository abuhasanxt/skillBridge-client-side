
import MyBookings from "@/components/modules/booking/myBooking";
import { bookings } from "@/services/booking.service";

export default async function Page() {
 
  const res = await bookings.getMyBooking();
  const bookingsData = res?.data || [];

  return (
    <div >
      <MyBookings bookings={bookingsData} />
    </div>
  );
}