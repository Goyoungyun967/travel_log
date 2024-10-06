package kr.co.iei.admin.controller;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
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
import kr.co.iei.seller.model.dto.SellerDTO;


@RestController
@CrossOrigin("*")
@RequestMapping(value="/admin")
@Tag(name = "ADMIN", description = "ADMIN API")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	@GetMapping(value="/inquiry/list/{reqPage}/{type}/{state}")
	@Operation(summary = "1:1문의 리스트 조회",description = "페이지번호,타입,처리상태를 받아서 1:1문의 리스트 조회")
	public ResponseEntity<Map> selectInquiryList(@PathVariable int reqPage,@PathVariable String type,@PathVariable int state){
		Map map = adminService.selectInquiryList(reqPage,type,state);
		return ResponseEntity.ok(map);
	}
	@GetMapping(value="/faq/{faqNo}")
	@Operation(summary = "faq 조회",description = "faq 번호를 받아서 faq 수정용 정보 조회")
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
	@GetMapping(value="/seller/list/{reqPage}/{sellerApp}")
	@Operation(summary = "판매자 리스트 조회",description = "페이지 번호,판매자 승인여부를 받아서 판매자 리스트 조회")
	public ResponseEntity<Map> selectSellerList(@PathVariable int reqPage,@PathVariable int sellerApp){
		Map map = adminService.selectSellerList(reqPage,sellerApp);
		return ResponseEntity.ok(map);
	}
	@PatchMapping(value="/seller")
	@Operation(summary = "판매자 승인 정보 수정",description = "판매자 번호 배열을 받아서 가입승인 정보 수정")
	public ResponseEntity<Boolean> updateSellerApp(@RequestBody int[] sellerNo){
		int result = adminService.updateSellerApp(sellerNo);
		return ResponseEntity.ok(result == sellerNo.length);
	}
	@GetMapping(value="/member/enroll")
	@Operation(summary = "차트용 회원 가입수 정보 조회",description = "올해와 작년의 월별기준으로 회원 가입수 리스트 조회")
	public ResponseEntity<List> getMemberEnrollData(){
		List list = adminService.getMemberEnrollData();
		return ResponseEntity.ok(list);
	}
	@GetMapping(value="/member/age/gender")
	@Operation(summary = "차트용 회원의 나이,성별별 인원 정보 조회",description = "회원의 나이별,성별 총 회원수 리스트 조회")
	public ResponseEntity<List> getMemberData(){
		List list = adminService.getMemberData();
		return ResponseEntity.ok(list);
	}
	@GetMapping(value="/lodgment/region")
	@Operation(summary = "차트용 숙소 지역 리스트 조회",description = "db에 저장된 숙소들의 지역 리스트 조회")
	public ResponseEntity<List> getLodgmentResionData(){
		List list = adminService.getLodgmentResionData();
		return ResponseEntity.ok(list);
	}
	@GetMapping(value="/lodgment/region/member/{region}")
	@Operation(summary = "차트용 해당지역 회원 이용자 정보 조회",description = "지역을 받아서 해당 지역의 숙소를 이용하는 나이별,성별 회원수 리스트 조회")
	public ResponseEntity<List> getLodgmentResionSearchMemberData(@PathVariable String region){
		List list = adminService.getLodgmentResionSearchMemberData(region);
		return ResponseEntity.ok(list);
	}
	@GetMapping(value="/lodgment/region/member")
	public ResponseEntity<List> getLodmentResionMemberData(){
		List list = adminService.getLodgmentResionMemberData();
		return ResponseEntity.ok(list);
	}
	@GetMapping(value="/seller/list")
	public ResponseEntity<List> getSellerList(){
		List list = adminService.getSellerList();
		return ResponseEntity.ok(list);
	}
	@GetMapping(value="/seller/sales/{type}/{date}")
	public ResponseEntity<List> getSellerListSales(@PathVariable String type,@PathVariable String date){
		List list = adminService.getSellerListSales(type,date);
		return ResponseEntity.ok(list);
	}
	@GetMapping(value="/seller/sales/{sellerNo}")
	public ResponseEntity<List> getSellerSales(@PathVariable int sellerNo){
		List list = adminService.getSellerSales(sellerNo);
		return ResponseEntity.ok(list);
	}
	@GetMapping(value="/seller/sales/gender/{sellerNo}")
	public ResponseEntity<List> getSellerSalesGender(@PathVariable int sellerNo){
		List list = adminService.getSellerSalesGender(sellerNo);
		return ResponseEntity.ok(list);
	}
	@GetMapping(value="/seller/sales/age/{sellerNo}")
	public ResponseEntity<List> getSellerSalesAge(@PathVariable int sellerNo){
		List list = adminService.getSellerSalesAge(sellerNo);
		return ResponseEntity.ok(list);
	}
	@GetMapping(value="/seller/salesList")
	public ResponseEntity<List> getSellerSalesList(){
		List list = adminService.getSellerSalesList();
		return ResponseEntity.ok(list);
	}
	@GetMapping(value="/seller/stmList/{reqPage}/{state}")
	public ResponseEntity<Map> getSellerStmList(@PathVariable int reqPage,@PathVariable int state){
		Map map = adminService.getSellerStmList(reqPage,state);
		return ResponseEntity.ok(map);
	}
	@PatchMapping(value="/seller/stm")
	public ResponseEntity<Boolean> updateStm(@RequestBody int[] stmNum){
		int result = adminService.updateStm(stmNum);
		return ResponseEntity.ok(result == stmNum.length);
	}
	@GetMapping(value="/lodgment/list/{reqPage}/{lodgmentDelete}")
	public ResponseEntity<Map> getAdminLodgmentList(@PathVariable int reqPage,@PathVariable int lodgmentDelete){
		Map map = adminService.getAdminLodgmentList(reqPage,lodgmentDelete);
		return ResponseEntity.ok(map);
	}
	@PatchMapping(value="/lodgment")
	public ResponseEntity<Boolean> updateLodgmentDelete(@RequestBody int[] lodgmentNo){
		int result = adminService.updateLodgmentDelete(lodgmentNo);
		return ResponseEntity.ok(result == lodgmentNo.length);
	}
}
