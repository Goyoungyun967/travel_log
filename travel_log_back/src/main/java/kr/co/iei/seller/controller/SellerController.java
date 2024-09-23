package kr.co.iei.seller.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.seller.model.dto.LodgmentStorageDTO;
import kr.co.iei.seller.model.dto.RoomDTO;
import kr.co.iei.seller.model.service.SellerService;
import kr.co.iei.util.FileUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/seller")
@Tag(name="Seller" , description = "Seller API")
public class SellerController {
	@Autowired
	private SellerService sellerService;
	@Autowired
	private FileUtils fileUtil;
	
	@Value("${file.root}")
	public String root;
	
	// 등록한 호텔 조회 (메인)
	@Operation(summary="등록한 숙소 리스트", description = "등록한 호텔 정보 조회(회원가입 처리 완료 되면 post로 조회)")
	@GetMapping(value="/list/{sellerNo}")
	public ResponseEntity<List> lodgmentList(@PathVariable int sellerNo){
		List list = sellerService.selectLodgmentList(sellerNo);
		return ResponseEntity.ok(list);
	}
	/* - 회원가입 처리 완료되면 post로 조회
	@Operation(summary="등록한 숙소 리스트", description = "(메인) 등록한 호텔 정보 (숙소 이름, 숙소 주소, 숙소 이미지 경로, 성급)만 조회")
	@PostMapping(value="lodgmentList")
//	public ResponseEntity<List> refresh(@RequestHeader("Authorization") String token){ => 토큰 처리 완료되면 token사용해서 판매자 번호로 리스트 조회하기
	public ResponseEntity<List> lodgmentList(@RequestBody int seller_no){ // 임시로 판매자 번호 넘겨주기
		List list = sellerService.lodgmentList(seller_no);
		return ResponseEntity.ok(list);
	} 
	 */
	
	// 기존 호텔 조회
	@Operation(summary="기존 호텔 검색", description="호텔 등록시 호텔 이름이나 주소를 입력하면 기존에 저장되어있는 호텔 정보 select (호텔 번호, 이름, 주소, 등급)")
	@GetMapping(value="/xlsxLodgment/{searchInput}") // 판매자가 
	public ResponseEntity<List> selectXlsxHotelInfo(@PathVariable String searchInput){
		System.out.println(searchInput);
		List list = sellerService.selectXlsxHotelInfo(searchInput);
		return ResponseEntity.ok(list);
	}
	
	// 호텔 등록
	@Operation(summary = "호텔 등록", description = "호텔 등록()")
	@PostMapping
	public ResponseEntity<Integer> insertLodgment(@ModelAttribute LodgmentStorageDTO ls, @ModelAttribute MultipartFile lodgmentImg){
		System.out.println(ls);
		 if (lodgmentImg != null) {
		        // 이미지 처리 로직
		        String savepath = root + "/lodgment/";
		        String filepath = fileUtil.upload(savepath, lodgmentImg);
		        ls.setLodgmentImgPath(filepath); // 경로 저장
		    }
		int result = sellerService.insertLodgment(ls);
		return ResponseEntity.ok(result);
	}
	
	// 해당 호텔 정보
	@Operation(summary = "호텔 정보", description = "호텔 정보 출력")
	@GetMapping(value="/lodgmentInfo/{lodgmentNo}")
	public ResponseEntity<LodgmentStorageDTO> selectOneLodgment(@PathVariable int lodgmentNo){
		LodgmentStorageDTO ls = sellerService.selectOneLodgment(lodgmentNo);
		return ResponseEntity.ok(ls);
	}
	
	
	// 판매자 정보 조회
	// public ResponseEntity<판매자DTO> selectOneSeller(@RequestHeader("Authorization") String token){ => 토큰 사용해서 조회
	@GetMapping
	public ResponseEntity<MemberDTO> selectOneSeller(@RequestBody int sellerNo){
		MemberDTO member = sellerService.selectOneSeller(sellerNo);
		return ResponseEntity.ok(member); // 판매자 DTO가 없으므로 일단 멤버로 대체
	}
	
	// 호텔 상세 - 미완성
//	@GetMapping(value="/lodgmentView/{lodgmentNo}")
//	public ResponseEntity<Map> list(@PathVariable int lodgmentNo){
//		Map<String, Object> map = new HashMap<String, Object>();
//		LodgmentStorageDTO ls = sellerService.selectOneLodgment(lodgmentNo);
//		List<RoomDTO> list = sellerService.selectRoomInfo(lodgmentNo);
//		
//		return ResponseEntity.ok(map);
//	}
	
//	// 객실 등록
//	@PostMapping
//	public ResponseEntity<Integer> insertRoom()
}
