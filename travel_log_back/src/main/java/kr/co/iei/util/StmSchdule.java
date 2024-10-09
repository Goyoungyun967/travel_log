package kr.co.iei.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import kr.co.iei.admin.model.servcie.AdminService;
import kr.co.iei.booking.model.service.BookingService;

@Component
public class StmSchdule {
	@Autowired
	private AdminService adminSerivce;
	@Autowired
	private BookingService bookingService;
	
	@Scheduled(cron = "0 0 0 4 * *")
	public void insertSellerStm() {
		System.out.println(2);
		adminSerivce.insertSellerStm();
	}
	//매일 몇시에 10-11시 체크아웃
	@Scheduled(cron = "0 0 17 * * *")
	public void checkOutStm() {
		bookingService.checkOutStm();
	}
}
