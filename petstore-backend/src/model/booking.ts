import pool from "./db";

export type StatusEnum = "pending" | "confirmed";
export type ClientTypeEnum =
  | "resident"
  | "tourist"
  | "gcc_countries"
  | "saudi"
  | "manual_booking";

export interface bookingTable {
  id: number;
  date_from: string;
  date_to: string;
  status: StatusEnum;
  product_id: number;
  phone_number: string;
  email: string;
  Id_number: string;
  driver_licence_issue_date: string;
  residence_number: string;
  client_name: string;
  passport_number: string;
  border_number: string;
  driver_licence_number: string;
  amount: number;
  client_type: ClientTypeEnum;
  created_at: string;
}

const createBooking = async (booking: bookingTable) => {
  const {
    date_from,
    date_to,
    status,
    product_id,
    phone_number,
    email,
    Id_number,
    driver_licence_issue_date,
    residence_number,
    client_name,
    passport_number,
    border_number,
    driver_licence_number,
    amount,
    client_type,
  } = booking;
  const result = await pool.query(
    "INSERT INTO booking (date_from, date_to, status, product_id, phone_number, email, Id_number, driver_licence_issue_date, residence_number, client_name, passport_number, border_number, driver_licence_number, amount, client_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *",
    [
      date_from,
      date_to,
      status,
      product_id,
      phone_number,
      email,
      Id_number,
      driver_licence_issue_date,
      residence_number,
      client_name,
      passport_number,
      border_number,
      driver_licence_number,
      amount,
      client_type,
    ]
  );
  return result.rows[0];
};

const getAllBookings = async () => {
  const result = await pool.query(
    "SELECT b.*, p.name AS product_name, p.location AS product_location FROM booking b JOIN product p ON b.product_id = p.id WHERE b.status = 'confirmed' ORDER BY b.id DESC;"
  );
  return result.rows;
};

const checkIfGivenDatesRangeIsAvailable = async (
  date_from: string,
  date_to: string,
  product_id: number
) => {
  const query = `
      SELECT id FROM booking
      WHERE product_id = $3
      AND date_from < $2
      AND date_to > $1
      LIMIT 1;
    `;

  const result = await pool.query(query, [date_from, date_to, product_id]);

  return result.rows.length === 0; // Returns true if available, false if booked
};

const changeBookingStatus = async (id: number, status: StatusEnum) => {
  const result = await pool.query(
    "UPDATE booking SET status = $1 WHERE id = $2",
    [status, id]
  );
  return result.rows[0];
};

const getBookingById = async (id: number) => {
  const result = await pool.query(
    "SELECT * FROM booking WHERE id = $1 AND status = 'confirmed'",
    [id]
  );
  return result.rows[0];
};

const getTotalRevenue = async () => {
  const query = `
    WITH current_month AS (
      SELECT 
        COUNT(*) as total_bookings,
        COALESCE(SUM(amount), 0) as total_amount
      FROM booking
      WHERE (status = 'confirmed')
        AND date_trunc('month', created_at) = date_trunc('month', CURRENT_DATE)
    ),
    previous_month AS (
      SELECT 
        COUNT(*) as total_bookings,
        COALESCE(SUM(amount), 0) as total_amount
      FROM booking
      WHERE (status = 'confirmed')
        AND date_trunc('month', created_at) = date_trunc('month', CURRENT_DATE - INTERVAL '1 month')
    ),
    today_bookings AS (
      SELECT COUNT(*) as count
      FROM booking
      WHERE date_trunc('day', created_at) = date_trunc('day', CURRENT_DATE)
    ),
    yesterday_bookings AS (
      SELECT COUNT(*) as count
      FROM booking
      WHERE date_trunc('day', created_at) = date_trunc('day', CURRENT_DATE - INTERVAL '1 day')
    )
    SELECT 
      current_month.total_bookings AS total_confirmed_bookings,
      current_month.total_amount AS total_revenue,
      previous_month.total_bookings AS previous_month_bookings,
      previous_month.total_amount AS previous_month_revenue,
      CASE 
        WHEN previous_month.total_bookings = 0 THEN NULL
        ELSE ROUND(((current_month.total_bookings - previous_month.total_bookings) / previous_month.total_bookings) * 100, 2)
      END AS bookings_percentage_change,
      CASE 
        WHEN previous_month.total_amount = 0 THEN NULL
        ELSE ROUND(((current_month.total_amount - previous_month.total_amount) / previous_month.total_amount) * 100, 2)
      END AS revenue_percentage_change,
      today_bookings.count AS today_bookings,
      yesterday_bookings.count AS yesterday_bookings
    FROM current_month, previous_month, today_bookings, yesterday_bookings;
  `;

  const result = await pool.query(query);

  if (result.rows.length === 0) {
    return {
      totalConfirmedBookings: 0,
      totalRevenue: 0,
      previousMonthBookings: 0,
      previousMonthRevenue: 0,
      bookingsPercentageChange: null,
      revenuePercentageChange: null,
      todayBookings: 0,
      yesterdayBookings: 0,
    };
  }

  const {
    total_confirmed_bookings,
    total_revenue,
    previous_month_bookings,
    previous_month_revenue,
    bookings_percentage_change,
    revenue_percentage_change,
    today_bookings,
    yesterday_bookings,
  } = result.rows[0];

  const totalProducts = await pool.query("SELECT COUNT(*) FROM product");
  const totalProductsInMaintenance = await pool.query(
    "SELECT COUNT(*) FROM product WHERE in_maintenance = true"
  );

  return {
    totalConfirmedBookings: total_confirmed_bookings || 0,
    totalRevenue: total_revenue || 0,
    previousMonthBookings: previous_month_bookings || 0,
    previousMonthRevenue: previous_month_revenue || 0,
    bookingsPercentageChange: bookings_percentage_change,
    revenuePercentageChange: revenue_percentage_change,
    todayBookings: today_bookings || 0,
    yesterdayBookings: yesterday_bookings || 0,
    totalProducts: totalProducts.rows[0].count || 0,
    totalProductsInMaintenance: totalProductsInMaintenance.rows[0].count || 0,
  };
};

const getBookedDates = async () => {
  const result = await pool.query(
    "SELECT date_from, date_to FROM booking WHERE date_from > CURRENT_DATE"
  );
  return result.rows;
};

const getRecentBookings = async () => {
  const result = await pool.query(
    "SELECT b.*, p.name as product_name , p.location as product_location FROM booking b JOIN product p ON b.product_id = p.id ORDER BY b.id DESC LIMIT 5"
  );
  return result.rows;
};

const getProductFromLocation = async (location: string) => {
  const result = await pool.query("SELECT * FROM product where location = $1", [
    location,
  ]);
  return result.rows[0];
};

const getBookingByLocation = async (location: string) => {
  const products = await getProductFromLocation(location);
  const productId = products.id;
  const result = await pool.query(
    "SELECT * FROM booking WHERE product_id = $1 and status = 'confirmed'",
    [productId]
  );
  return result.rows;
};

const getBookingDays = (date_from: string, date_to: string) => {
  const startDate = new Date(date_from);
  const endDate = new Date(date_to);
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays;
};
const createManualBooking = async (booking: {
  date_from: string;
  date_to: string;
  location: string;
}) => {
  const { date_from, date_to, location } = booking;
  const product = await getProductFromLocation(location);
  const result = await pool.query(
    "INSERT INTO booking (phone_number,email,status,client_type,product_id,amount,client_name,driver_licence_issue_date,date_from,date_to) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
    [
      process.env.ADMIN_PHONE,
      process.env.ADMIN_EMAIL,
      "confirmed",
      "manual_booking",
      product.id,
      product.day_price * getBookingDays(date_from, date_to),
      "Manual Booking",
      new Date(),
      date_from,
      date_to,
    ]
  );
  return result.rows[0];
};

export default {
  createBooking,
  getAllBookings,
  checkIfGivenDatesRangeIsAvailable,
  changeBookingStatus,
  getBookingById,
  getTotalRevenue,
  getBookedDates,
  getRecentBookings,
  getBookingByLocation,
  createManualBooking,
};
