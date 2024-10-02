package kr.co.iei.booking.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.booking.model.dao.BookingDao;
import kr.co.iei.booking.model.dto.BookingDTO;
import kr.co.iei.member.model.dao.MemberDao;

@Service
public class BookingService {
	@Autowired
	private BookingDao bookingDao;
	@Autowired
	private MemberDao memberDao;
	
	@Transactional
	public int insertBooking(BookingDTO bookingInfo) {
		String memberId = memberDao.getMemberId(bookingInfo.getMemberNo());
		System.out.println(memberId);
		bookingInfo.setMemberId(memberId);
		int result = bookingDao.insertBooking(bookingInfo);
		return result;
	}

}
