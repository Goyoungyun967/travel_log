package kr.co.iei.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import kr.co.iei.admin.model.servcie.AdminService;

@Component
public class StmSchdule {
	@Autowired
	private AdminService adminSerivce;
	
	@Scheduled(cron = "0 0 0 4 * *")
	public void insertSellerStm() {
		System.out.println(2);
		adminSerivce.insertSellerStm();
	}
	//매일 몇시에 10-11시 체크아웃
}
