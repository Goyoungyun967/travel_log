package kr.co.iei.booking.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.booking.model.dto.BookingDTO;

@Mapper
public interface BookingDao {

	int insertBooking(BookingDTO bookingInfo);

	BookingDTO getBookingInfo(int bookNo);

}
