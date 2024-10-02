package kr.co.iei.lodgment.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.iei.lodgment.model.dto.SearchLodgmentDTO;
import kr.co.iei.lodgment.model.service.LodgmentService;



@CrossOrigin("*")
@RestController
@RequestMapping(value="/lodgment")
@Tag(name="Lodgment" , description = "Lodgment API")
public class LodgmentController {

	@Autowired
	private LodgmentService lodgmentService;
	
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
	public ResponseEntity<List<SearchLodgmentDTO>> searchLodgment(
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
		List<SearchLodgmentDTO> list = 
				lodgmentService.getLodgmentList(reqPage,lodgment,startDate,endDate,guest,
						minPrice,maxPrice,selectedServiceTagsArry,starValue,order, lodgmentType);
		return ResponseEntity.ok(list);
		
	}
	
	
	@GetMapping(value = "/roomInfo/{lodgmentNo}/{startDate}/{endDate}/{loginNo}")
	@Operation(summary = "숙박업체 룸 디테일 정보 가져오기",description ="숙박업체 번호, 체크인,체크아웃 날짜로 수박업체 정보 받아오기") 
	public ResponseEntity<Map> roomInfo(
			@PathVariable int lodgmentNo,
			@PathVariable String startDate,
			@PathVariable String endDate,	
			@PathVariable int loginNo		
			){
		//System.out.println(lodgmentNo);
		Map map = lodgmentService.getRoomInfo(lodgmentNo,startDate,endDate,loginNo);
		return ResponseEntity.ok(map);
	}
	
	@GetMapping(value = "/collect/{lodgmentNo}/{loginNo}")
	@Operation(summary = "숙소 보관함",description ="숙소번호, 회원번호로 보관함에 저장") 
	public ResponseEntity<Integer> insertCollect(
			@PathVariable int lodgmentNo, @PathVariable int loginNo){
		//System.out.println("lodgmnetNo"+lodgmentNo+"   "+loginNo);
		int result = lodgmentService.insertCollect(lodgmentNo, loginNo);
		return ResponseEntity.ok(result);
	}

	@GetMapping(value = "/unCollect/{lodgmentNo}/{loginNo}")
	@Operation(summary = "숙소 보관함 취소",description ="숙소번호, 회원번호로 보관함에 저장 취소") 
	public ResponseEntity<Integer> deledtCollect(
			@PathVariable int lodgmentNo, @PathVariable int loginNo){
		//System.out.println("lodgmnetNo"+lodgmentNo+"   "+loginNo);
		int result = lodgmentService.deleteCollect(lodgmentNo, loginNo);
		return ResponseEntity.ok(result);
	}

}
