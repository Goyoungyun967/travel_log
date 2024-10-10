package kr.co.iei.lodgment.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.iei.lodgment.model.dto.LodgmentMemberInquireDTO;
import kr.co.iei.lodgment.model.dto.LodgmentReviewDTO;
import kr.co.iei.lodgment.model.dto.LodgmentReviewFileDTO;
import kr.co.iei.lodgment.model.dto.RequestDTO;
import kr.co.iei.lodgment.model.dto.SearchLodgmentDTO;
import kr.co.iei.lodgment.model.service.LodgmentService;
import kr.co.iei.util.FileUtils;



@CrossOrigin("*")
@RestController
@RequestMapping(value="/lodgment")
@Tag(name="Lodgment" , description = "Lodgment API")
public class LodgmentController {

	@Autowired
	private LodgmentService lodgmentService;
	
	@Autowired
	private FileUtils fileUtil;
	
	@Value("${file.root}")
	public String root;
	
	//서비스 태그 가져오기
	@GetMapping(value = "/service")
	@Operation(summary = "등록된 서비스태그 가져오기",description = "등록된 서비스태그 전체 조회")
	public ResponseEntity<List> serviceList(){
		List list = lodgmentService.serviceList();
		return ResponseEntity.ok(list);
	}
	
	//검색창 : 여행지/호텔 관련 검색어 
	@GetMapping(value = "/search/{value}")
	@Operation(summary = "여행지,호텔 연관 검색어",description = "이용자가 입력한 여행지, 호텔에 대한 연관 검색어 실시간 조회")
	public ResponseEntity<Map> search(@PathVariable String value){
		Map map = lodgmentService.search(value);
		return ResponseEntity.ok(map);
	}
	
	//검색 할 경우 원하는 숙박 정보 
	@GetMapping(value = "/searchLodgment")  //RequestParam 과 PathVariable 차이점 찾아보기 
	@Operation(summary = "숙박업체 조회",description = "페이지, 여행지(또는 호텔), 체크인, 체크아웃, 인원수, 가격조정(최저가격 ~ 최고가격), 관련 서비스 태그(선택 무 가능), 호텔성급(선택 무 가능), 숙박타입 선택")
	public ResponseEntity<Map> searchLodgment(
			@RequestParam int reqPage,
            @RequestParam String lodgment,
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam int guest,
            @RequestParam int minPrice,
            @RequestParam int maxPrice,
            @RequestParam String selectedServiceTags,
            @RequestParam int starValue,
            @RequestParam int order,
            @RequestParam int lodgmentType){
		int[] selectedServiceTagsArry = null;
		if(!selectedServiceTags.equals("")) {
			String[] tags = selectedServiceTags.split(",");
			selectedServiceTagsArry = new int[tags.length]; 
			for(int i = 0; i < tags.length; i++) {
				selectedServiceTagsArry[i] = Integer.parseInt(tags[i]);
			//System.out.println(selectedServiceTagsArry[i]);
			}
		}else {
			selectedServiceTagsArry = new int[1];
			selectedServiceTagsArry[0] = 100;	
		}
		Map map = 
				lodgmentService.getLodgmentList(reqPage,lodgment,startDate,endDate,guest,
						minPrice,maxPrice,selectedServiceTagsArry,starValue,order, lodgmentType);
		return ResponseEntity.ok(map);
		
	}
	
	//검색 -> 숙소 상세페이지 
	@GetMapping(value = "/roomInfo/{lodgmentNo}/{formattedStartDate}/{formattedEndDate}/{loginNo}")
	@Operation(summary = "숙박업체 룸 디테일 정보 가져오기",description ="숙박업체 번호, 체크인,체크아웃 날짜로 수박업체 정보 받아오기") 
	public ResponseEntity<Map> roomInfo(
			@PathVariable int lodgmentNo,
			@PathVariable String formattedStartDate,
			@PathVariable String formattedEndDate,	
			@PathVariable int loginNo		
			){
		//System.out.println(lodgmentNo);
		Map map = lodgmentService.getRoomInfo(lodgmentNo,formattedStartDate,formattedEndDate,loginNo);
		return ResponseEntity.ok(map);
	}
	
	//숙소 보관함  
	@GetMapping(value = "/collect/{lodgmentNo}/{loginNo}")
	@Operation(summary = "숙소 보관함",description ="숙소번호, 회원번호로 보관함에 저장") 
	public ResponseEntity<Integer> insertCollect(
			@PathVariable int lodgmentNo, @PathVariable int loginNo){
		//System.out.println("lodgmnetNo"+lodgmentNo+"   "+loginNo);
		int result = lodgmentService.insertCollect(lodgmentNo, loginNo);
		return ResponseEntity.ok(result);
	}
	
	//숙소 보관함 취소
	@GetMapping(value = "/unCollect/{lodgmentNo}/{loginNo}")
	@Operation(summary = "숙소 보관함 취소",description ="숙소번호, 회원번호로 보관함에 저장 취소") 
	public ResponseEntity<Integer> deledtCollect(
			@PathVariable int lodgmentNo, @PathVariable int loginNo){
		//System.out.println("lodgmnetNo"+lodgmentNo+"   "+loginNo);
		int result = lodgmentService.deleteCollect(lodgmentNo, loginNo);
		return ResponseEntity.ok(result);
	}

	//리뷰 등록 
	// FE 에서 formDate를 보낼때 키값이 객체 변수명과 동일하면 객체로받을수 있다. 
	@PostMapping(value ="/review")
	@Operation(summary = "리뷰 등록하기",description = "회원번호, 숙소번호, 글내용, 사진(비어있을수도 있음)")
	public ResponseEntity<Boolean> insertReview(@ModelAttribute LodgmentReviewDTO lodgmentReview, @ModelAttribute MultipartFile[] reviewImg ){		
		//사진데이터 저장 리스트
	
		System.out.println(lodgmentReview);
		System.out.println(reviewImg);
		List<LodgmentReviewFileDTO> fileSave = new ArrayList<LodgmentReviewFileDTO>();
		//동일한 파일 없도록 라벨링 후 지정된 경로에 업로드 됨 
		if(reviewImg != null) {
			String savepath = root + "/review/";
			for(MultipartFile file :reviewImg) {
				LodgmentReviewFileDTO roomImgSave = new LodgmentReviewFileDTO();
				String filepath = fileUtil.upload(savepath, file);
				roomImgSave.setReviewImgPath(filepath);
				fileSave.add(roomImgSave);
			}
		}
		int result = lodgmentService.insertReview(lodgmentReview, fileSave);
		return ResponseEntity.ok(result == (1 + (reviewImg != null ? reviewImg.length : 0)));
	}
	
	//리뷰 페이징
	@GetMapping(value = "/reviewList/{lodgmentNo}/{reqPage}/{loginNo}")
	@Operation(summary = "리뷰 리스트",description = "숙소 번호, 페이지넘버, 로그인 여부에 따라 후기 여부")
	public ResponseEntity<Map> reviewList(@PathVariable int lodgmentNo, @PathVariable int reqPage, @PathVariable int loginNo ){
		Map map = lodgmentService.reveiwList(lodgmentNo, reqPage,loginNo);
		return ResponseEntity.ok(map);
	}
	
	//댓글 좋아요  
	@PostMapping(value = "/reviewLike")
	@Operation(summary = "댓글 좋아요",description ="댓글번호, 회원번호로 댓글 좋아요 기능") 
	public ResponseEntity<Boolean> reviewLike(
			@RequestBody RequestDTO request){
		int result = lodgmentService.reviewLike(request);
		return ResponseEntity.ok(1 == result);
	}
	
	//댓글 좋아요 취소
	@PostMapping(value = "/reviewLikeCancle")
	@Operation(summary = "댓글 좋아요 취소",description ="댓글번호, 회원번호로 댓글 좋아요 취소 기능") 
	public ResponseEntity<Boolean> reviewLikeCancle(
			@RequestBody RequestDTO request){	
		int result = lodgmentService.reviewLikeCancle(request);
		return ResponseEntity.ok(1 == result);
	}
	
	//댓글 좋아요  
	@PostMapping(value = "/report")
	@Operation(summary = "댓글 신고",description ="댓글번호, 회원번호, 신고사유로 댓글 신고 기능") 
	public ResponseEntity<Boolean> reviewReport (@RequestBody RequestDTO request){
		int result = lodgmentService.reviewReport(request);
		return ResponseEntity.ok(1 == result);
	}
	
	//숙소 문의 하기  form으로 보낼때 어노테이션 ModelAttribute
	@PostMapping(value = "/memberInquire")
	@Operation(summary = "회원 숙소 문의",description ="댓글번호, 회원번호, 신고내용, 공개여부(0:공개/1:비공개)로 댓글 신고 기능") 
	public ResponseEntity<Boolean> insertMemberInquire (@ModelAttribute LodgmentMemberInquireDTO inquire){
		//System.out.println(inquire);
		int result = lodgmentService.insertMemberInquire(inquire);
		return ResponseEntity.ok(1 == result);
	}

	//숙소 문의 페이징
	@GetMapping(value = "/inquireList/{lodgmentNo}/{reqPage}")
	@Operation(summary = "리뷰 리스트",description = "숙소 번호, 페이지넘버")
	public ResponseEntity<Map> inquireList(@PathVariable int lodgmentNo, @PathVariable int reqPage ){
		System.out.println(lodgmentNo);
		Map map = lodgmentService.inquireList(lodgmentNo, reqPage);
		return ResponseEntity.ok(map);
	}

	//문의 삭제하기
	@DeleteMapping(value = "/inquire/{roomQnaNo}/{loginNo}")
	@Operation(summary = "문의 삭제하기",description = "문의 번호, 멤버 번호로 삭제")
	public ResponseEntity<Boolean> deleteInquire(@PathVariable int roomQnaNo, @PathVariable int loginNo ){
		int result = lodgmentService.deleteInquire(roomQnaNo,loginNo);
		return ResponseEntity.ok(1==result);
	}
	
	//수정 리뷰 데이터 가져오기 
	@GetMapping(value = "/getReview/{reviewNo}")
	@Operation(summary = "리뷰 수정 데이터 불러오기",description = "리뷰 번호로 리뷰 불러오기")
	public ResponseEntity<LodgmentReviewDTO> getReview(@PathVariable int reviewNo){
		LodgmentReviewDTO reivew = lodgmentService.getReview(reviewNo);
			
	return ResponseEntity.ok(reivew);
	}
	
	//리뷰 수정하기
	@PatchMapping(value ="/reviewUpdate")
	@Operation(summary = "리뷰 수정",description = "리뷰 번호, 삭제파일")
	public ResponseEntity<Boolean> updateReview(@ModelAttribute LodgmentReviewDTO newReview,
												@ModelAttribute MultipartFile[] reviewImg){
		List<LodgmentReviewFileDTO> fileSave = new ArrayList<LodgmentReviewFileDTO>();
		if(reviewImg != null) {
			String savepath = root + "/review/";
			for(MultipartFile file :reviewImg) {
				LodgmentReviewFileDTO roomImgSave = new LodgmentReviewFileDTO();
				roomImgSave.setReviewFileNo(newReview.getReviewNo());
				String filepath = fileUtil.upload(savepath, file);
				roomImgSave.setReviewImgPath(filepath);
				roomImgSave.setReviewNo(newReview.getReviewNo());
				fileSave.add(roomImgSave);
			}
		}
		List<LodgmentReviewFileDTO> delfileList = lodgmentService.delfileList (newReview, fileSave);
		if(delfileList != null) {
			String savepath = root+"/review/";
			for(LodgmentReviewFileDTO delFile : delfileList) {
				File file = new File(savepath+delFile.getReviewImgPath());
				file.delete();
			}
			return ResponseEntity.ok(true);
		}
		return ResponseEntity.ok(true);
	}
	
	@DeleteMapping(value ="/reviewDelete/{reviewNo}")
	@Operation(summary = "리뷰 삭제",description = "리뷰 번호")
	public ResponseEntity<Boolean> deleteReview(@PathVariable int reviewNo){
		int result = lodgmentService.deleteReview(reviewNo);
		return ResponseEntity.ok(1==result);
	}


}
