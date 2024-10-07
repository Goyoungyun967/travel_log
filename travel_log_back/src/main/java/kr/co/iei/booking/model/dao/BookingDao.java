package kr.co.iei.booking.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.booking.model.dto.BookingDTO;
import kr.co.iei.util.PageInfo;

@Mapper
public interface BookingDao {

	int insertBooking(BookingDTO bookingInfo);



	int myBookingTotalCount(int memberNo);

	List selectBookingList(Map<String, Object> bookingMap);

	BookingDTO getBookingInfo(int bookNo);


	




}
