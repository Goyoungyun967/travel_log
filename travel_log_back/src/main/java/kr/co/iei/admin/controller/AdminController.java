package kr.co.iei.admin.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.iei.admin.model.servcie.AdminService;


@RestController
@CrossOrigin("*")
@RequestMapping(value="/admin")
@Tag(name = "ADMIN", description = "ADMIN API")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	@GetMapping(value="/inquiry/{reqPage}/{type}/{state}")
	@Operation(summary = "1:1문의 리스트 조회",description = "페이지번호,타입,처리상태를 받아서 1:1문의 리스트 조회")
	public ResponseEntity<Map> selectInquiryList(@PathVariable int reqPage,@PathVariable String type,@PathVariable int state){
		Map map = adminService.selectInquiryList(reqPage,type,state);
		return ResponseEntity.ok(map);
	}
}
