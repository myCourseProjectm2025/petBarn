import bookingModel from "../model/booking";

const createBooking = async (req: any, res: any) => {
  try {
    const booking = req.body;
    const result = await bookingModel.createBooking(booking);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBookings = async (req: any, res: any) => {
  try {
    const result = await bookingModel.getAllBookings();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};  

const checkIfGivenDatesRangeIsAvailable = async (req: any, res: any) => {
  try {
    const { date_from, date_to, product_id } = req.body;
    const result = await bookingModel.checkIfGivenDatesRangeIsAvailable(date_from, date_to, product_id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const changeBookingStatus = async (req: any, res: any) => {
  try {
    const { id, status } = req.body;
    const result = await bookingModel.changeBookingStatus(id, status);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};  

const getBookingById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const result = await bookingModel.getBookingById(id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}; 
const getTotalRevenue = async (req: any, res: any) => {
  try {
    const result = await bookingModel.getTotalRevenue();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getBookedDates = async (req: any, res: any) => {
  try {
    const result = await bookingModel.getBookedDates();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getRecentBookings = async (req: any, res: any) => {
  try {
    const result = await bookingModel.getRecentBookings();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getBookingByLocation = async (req: any, res: any) => {
  try {
    const { location } = req.params;
    const result = await bookingModel.getBookingByLocation(location);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const createManualBooking = async (req: any, res: any) => {
  try {
    const { date_from, date_to, location } = req.body;
    const result = await bookingModel.createManualBooking({date_from, date_to, location});
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export  {
  createBooking,
  getAllBookings,
  checkIfGivenDatesRangeIsAvailable,
  changeBookingStatus,
  getBookingById,
  getTotalRevenue,
  getBookedDates,
  getRecentBookings,
  getBookingByLocation,
  createManualBooking
};  

