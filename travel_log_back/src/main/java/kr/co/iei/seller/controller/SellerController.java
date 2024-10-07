package kr.co.iei.seller.controller;

import java.io.File;
import java.sql.Date;
import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.iei.inquiry.model.dto.InquiryDTO;
import kr.co.iei.lodgment.model.dto.LodgmentReviewDTO;
import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.seller.model.dto.BookingInfoDTO;
import kr.co.iei.seller.model.dto.InsertRoomDTO;
import kr.co.iei.seller.model.dto.LodgmentStorageDTO;
import kr.co.iei.seller.model.dto.LoginSellerDTO;
import kr.co.iei.seller.model.dto.RoomDTO;
import kr.co.iei.seller.model.dto.RoomFileDTO;
import kr.co.iei.seller.model.dto.SellerDTO;
import kr.co.iei.seller.model.dto.StmInfoDTO;
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
	@PostMapping(value="/lodgmentList")
	public ResponseEntity<List> lodgmentList(@RequestParam int loginNo){
		List list = sellerService.selectLodgmentList(loginNo);
		return ResponseEntity.ok(list);
	}
	
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
		        String savepath = root + "/seller/lodgment/";
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
	// 호텔 수정
	@Operation(summary = "호텔 수정", description = "호텔 번호 받아서 수정")
	@PatchMapping(value="/updateLodgment")
	public ResponseEntity<Integer> updateLodgment(@ModelAttribute LodgmentStorageDTO ls, @ModelAttribute MultipartFile lodgmentImg){
		System.out.println(ls);
		System.out.println(lodgmentImg);
		if(lodgmentImg != null){
            // 업로드 위치임
            String savepath = root+"/seller/lodgment/";
            String filepath = fileUtil.upload(savepath, lodgmentImg);
            ls.setLodgmentImgPath(filepath); // 경로 저장
        }
		 int result = sellerService.updateLodgment(ls);
		return ResponseEntity.ok(result);
	}
	
	
	// 판매자 정보 조회
	// public ResponseEntity<판매자DTO> selectOneSeller(@RequestHeader("Authorization") String token){ => 토큰 사용해서 조회
//	@Operation(summary = "판매자 정보 조회", description = "판매자 정보 출력")
	@GetMapping
	public ResponseEntity<MemberDTO> selectOneSeller(@RequestBody int sellerNo){
		MemberDTO member = sellerService.selectOneSeller(sellerNo);
		return ResponseEntity.ok(member); // 판매자 DTO가 없으므로 일단 멤버로 대체
	}
	
	// 호텔 상세
	@Operation(summary = "호텔 상세", description = "호텔 정보 출력(호텔 + 객실(객실 사진))")
	@GetMapping(value="/lodgmentView/{lodgmentNo}/{reqPage}/{reqPageQ}")
	public ResponseEntity<Map> list(@PathVariable int lodgmentNo, @PathVariable int reqPage,@PathVariable int reqPageQ){
		Map map = sellerService.selectHotelInfo(lodgmentNo, reqPage,reqPageQ);
		return ResponseEntity.ok(map);
	}
	
	// 호텔 정보 조회
	@Operation(summary = "호텔 조회", description = "호텔 번호 받아서 조회")
	@GetMapping(value="/lodgmentView/{lodgmentNo}")
	public ResponseEntity<LodgmentStorageDTO> searchLodgmentInfo(@PathVariable int lodgmentNo){
		LodgmentStorageDTO lg = sellerService.selectOneLodgment(lodgmentNo);
		return ResponseEntity.ok(lg);
	}
	// 호텔 업데이트
	
	// 객실 상세
	@Operation(summary = "객실 상세", description = "객실 상세(호텔+객실+객실태그(서비스태그)+첨부파일) 호텔 번호/객실 번호 받아서 가져옴")
	@GetMapping(value="/roomView/{lodgmentNo}/{roomNo}")
	public ResponseEntity<Map> roomList(@PathVariable int lodgmentNo,@PathVariable int roomNo){
		Map map = sellerService.selectRoomInfo(lodgmentNo, roomNo);
		return ResponseEntity.ok(map);
	}
	
//	// 객실 등록
	@PostMapping(value="/insertRoom")
	public ResponseEntity<Boolean> insertRoom(@ModelAttribute RoomDTO room, @ModelAttribute MultipartFile[] roomFile){
		System.out.println(room);
		System.out.println(roomFile);
		List<RoomFileDTO> roomFileList = new ArrayList<RoomFileDTO>();
		if(roomFile != null) {
			String savepath = root+"/seller/room/";
			for(MultipartFile file : roomFile) {
				RoomFileDTO fileDTO = new RoomFileDTO();
				String filename = file.getOriginalFilename();
				String filepath = fileUtil.upload(savepath, file);
				fileDTO.setRoomImg(filepath);
				roomFileList.add(fileDTO);
			}
		}
		int result = sellerService.insertRoom(room, roomFileList);
		System.out.println(result);
		return ResponseEntity.ok(result!=0+roomFileList.size());
	}
	
	// 객실 수정
	@PatchMapping(value = "/updateRoom")
	public ResponseEntity<Boolean> updateRoom(@ModelAttribute RoomDTO room, @ModelAttribute MultipartFile[] roomFile){
        List<RoomFileDTO> roomFileList = new ArrayList<RoomFileDTO>();
        if(roomFile != null){
            // 첨부파일이 없으면 null로 값이 오기에 null 체크 먼저
            String savepath = root+"/seller/room/";
            for(MultipartFile file : roomFile){
                RoomFileDTO roomFileDTO = new RoomFileDTO();
                String filename = file.getOriginalFilename();
                String filepath = fileUtil.upload(savepath, file);
                roomFileDTO.setRoomImg(filepath);
                // 수정같은 경우에는 이미 게시글 번호가 있기 때문에 그걸 가지고 와서 바로 roomFileDTO에 set함
                roomFileDTO.setRoomNo(room.getRoomNo());
                roomFileList.add(roomFileDTO);
            }
        }
        List<RoomFileDTO> delFileList = sellerService.updateRoom(room, roomFileList);
        System.out.println(delFileList);
        if(delFileList != null){
            String savepath = root+"/seller/room/";
            for(RoomFileDTO deleteFile : delFileList){
                File delFile = new File(savepath + deleteFile.getRoomImg());
                delFile.delete();
            }
            return ResponseEntity.ok(true);
        }
        else{
            //실패시임
            return ResponseEntity.ok(false);
        }
	}

	
	// 판매자 정산
	@Operation(summary="판매자 정산", description = "정산 정보 출력")
	@PostMapping(value="/stm")
	public ResponseEntity<List> stmInfo( @ModelAttribute StmInfoDTO st){
		List<StmInfoDTO> ls = sellerService.selectStmInfo(st);
		return ResponseEntity.ok(ls);
	}
	
	// 판매자 정산 - 검색
	@Operation(summary="판매자 정산", description = "정산 정보 검색해서 출력")
	@PostMapping(value="/searchDate")
	public ResponseEntity<List> stmSearchDate( @ModelAttribute StmInfoDTO st){
		List<StmInfoDTO> ls = sellerService.selectStmSearchInfo(st);
		return ResponseEntity.ok(ls);
	}
	
	
	// 판매자 문의 글 리스트 조회
	@Operation(summary = "판매자 문의 리스트 조회", description = "판매자 문의 리스트 출력")
	@PostMapping(value = "/inqList")
	public ResponseEntity<List> searchInqList(@RequestParam int loginNo){
		List<InquiryDTO> ls = sellerService.selectInqList(loginNo);
		return ResponseEntity.ok(ls);
	}
	
	
	
	//seller-join 형묵
	@PostMapping(value="/sellerJoin")
	public ResponseEntity<Integer> sellerjoin(@RequestBody SellerDTO seller){
		 System.out.println("수신된 seller 데이터: " + seller);  // 로그 확인
		int result = sellerService.insertSeller(seller);
		if(result > 0) {
			return ResponseEntity.ok(result);
		}else {
			return ResponseEntity.status(500).build();
		}
	}
	

	//seller id-중복체크 -형
	@GetMapping(value="/businessNo/{businessNo}/check-id")
	public ResponseEntity<Integer> checkSellerId(@PathVariable String businessNo){
		int result = sellerService.checkSellerId(businessNo);
		
		return ResponseEntity.ok(result);
	}
	//seller-login 형묵
	@PostMapping(value="/login")
	public ResponseEntity<LoginSellerDTO> login(@RequestBody SellerDTO seller){
		LoginSellerDTO loginSeller = sellerService.login(seller);
		if(loginSeller != null) {
			return ResponseEntity.ok(loginSeller);
		}else {
			return ResponseEntity.status(404).build();
		}
	}
	
	@PostMapping(value="/refresh")
	public ResponseEntity<LoginSellerDTO> refresh(@RequestHeader("Authorization") String token){
		LoginSellerDTO loginSeller = sellerService.refresh(token);
		if(loginSeller != null) {
			return ResponseEntity.ok(loginSeller);
		}else {
			return ResponseEntity.status(404).build();
		}
	}

	// 판매자 문의 글 상세
	@Operation(summary="판매자 문의 상세", description = "판매자 문의 상세 (inq정보 , 파일, 어드민 답변)")
	@GetMapping(value="/searchView/{inqNo}")
	public ResponseEntity<InquiryDTO> searchInqView(@PathVariable int inqNo){
		InquiryDTO id = sellerService.selectInqView(inqNo);
		return ResponseEntity.ok(id);
	}
	
	
	// 판매자 예약 리스트 조회
	@Operation(summary="판매자 예약 리스트", description="판매자 예약 리스트 판매자 번호 받아서 조회")
	@PostMapping(value="/reserveList")
	public ResponseEntity<List> searchBookList(@RequestParam int loginNo){
		System.out.println(loginNo);
		List list = sellerService.selectReserveList(loginNo);
		return ResponseEntity.ok(list);
	}
	
	// 예약 상세 조회
	@Operation(summary = "예약 상세", description = "예약 정보 출력(호텔 이름 + 객실 이름 + 예약 정보")
	@GetMapping(value="/reserve/{bookNo}")
	public ResponseEntity<BookingInfoDTO> bookInfo(@PathVariable int bookNo){
		System.out.println("gg");
		BookingInfoDTO bid = sellerService.bookInfo(bookNo);
		return ResponseEntity.ok(bid);
	}
	
	// 호텔 삭제 (완전 삭제가 아님 (1에서 0으로 update))
	@Operation(summary = "호텔 삭제", description = "호텔 삭제(완전 삭제가 아니라 1에서 0으로 update)")
	@PatchMapping(value="/delLodgment")
	public ResponseEntity<Integer> delUpLodgment(@RequestParam int lodgmentNo){
		System.out.println(lodgmentNo);
		int result = sellerService.delUpLodgment(lodgmentNo);
		return ResponseEntity.ok(result);
	}
	
	// 객실 삭제 (1에서 0으로 update)
	@Operation(summary = "객실 삭제", description = "객실 삭제(완전 삭제가 아니라 1에서 0으로 update)")
	@PatchMapping(value="/delRoom")
	public ResponseEntity<Integer> delUpRoom(@RequestParam int roomNo){
		System.out.println(roomNo);
		int result = sellerService.delUpRoom(roomNo);
		return ResponseEntity.ok(result);
	}
	
	// 판매자 호텔 리뷰 댓글
	@Operation(summary = "호텔 리뷰 댓글", description = "리뷰 댓글 update랑 reviewNo 가져와서 씀")
	@PatchMapping(value="/addComment")
	public ResponseEntity<Integer> addComment(LodgmentReviewDTO ld){
		System.out.println(ld);
		int result = sellerService.updateComment(ld);
		return ResponseEntity.ok(result);
	}
	
	// 판매자 정보 조회
	@Operation(summary = "판매자 정보 조회", description = "판매자 정보 조회 토큰 사용")
	@GetMapping(value="/sellerInfo")
	public ResponseEntity<SellerDTO> sellerInfo(@RequestHeader("Authorization") String token){
		SellerDTO seller = sellerService.selectOneSeller(token);
		return ResponseEntity.ok(seller);
	}
	
	// 판매자&회원 문의 조회
	
}
