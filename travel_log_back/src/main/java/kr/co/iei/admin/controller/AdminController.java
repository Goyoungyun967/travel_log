package kr.co.iei.admin.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.iei.admin.model.servcie.AdminService;
import kr.co.iei.faq.model.dto.FaqDTO;


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
	@GetMapping(value="/faq/{faqNo}")
	public ResponseEntity<FaqDTO> selectAdminFaq(@PathVariable int faqNo){
		FaqDTO faq = adminService.selectAdminFaq(faqNo);
		return ResponseEntity.ok(faq);
	}

	@PostMapping(value="/faq")
	@Operation(summary = "faq 등록",description = "faq 타입,제목,내용을 받아서 faq 정보 등록")
	public ResponseEntity<Integer> insertFaq(@RequestBody FaqDTO faq){
		int result = adminService.insertFaq(faq);
		return ResponseEntity.ok(result);
	}
	
	@PatchMapping(value="/faq")
	@Operation(summary = "faq 수정",description = "faq 번호,타입,제목,내용을 받아서 faq 정보 수정")
	public ResponseEntity<Integer> updateFaq(@RequestBody FaqDTO faq){
		int result = adminService.updateFaq(faq);
		return ResponseEntity.ok(result);
	}
	
	@DeleteMapping(value="/faq/{faqNo}")
	@Operation(summary = "faq 정보 삭제",description = "faq 번호를 받아서 faq 정보 삭제")
	public ResponseEntity<Integer> deleteFaq(@PathVariable int faqNo){
		int result = adminService.deleteFaq(faqNo);
		return ResponseEntity.ok(result);
	}
}
