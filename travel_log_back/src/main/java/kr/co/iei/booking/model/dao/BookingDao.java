package kr.co.iei.booking.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.booking.model.dto.BookingAvailavleDTO;
import kr.co.iei.booking.model.dto.BookingCancelDTO;
import kr.co.iei.booking.model.dto.BookingDTO;

@Mapper
public interface BookingDao {

	int insertBooking(BookingDTO bookingInfo);

	int totalCount();

	int myBookingTotalCount(int memberNo);

	List selectBookingList(Map<String, Object> bookingMap);

	BookingDTO getBookingInfo(int bookNo);

	String getPortoneimpuid(BookingCancelDTO cancelData);

	int updateBooking(BookingCancelDTO cancelData);

	int insertBookCancel(BookingCancelDTO cancelData);

	List<BookingDTO> selectAllBookingList();

	int updateBookingStatus(BookingDTO booking);

	BookingAvailavleDTO bookingAvailable(BookingDTO bookingInfo);


}
