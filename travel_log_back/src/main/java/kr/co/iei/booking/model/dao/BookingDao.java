package kr.co.iei.booking.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.booking.model.dto.BookingDTO;
import kr.co.iei.util.PageInfo;

@Mapper
public interface BookingDao {

	int insertBooking(BookingDTO bookingInfo);

	int totalCount();

	List selectBookingList(PageInfo pi);

}
