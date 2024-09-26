package kr.co.iei.lodgment.controller;

import java.sql.Date;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
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

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.websocket.server.PathParam;
import kr.co.iei.lodgment.model.dto.LodgmentDTO;
import kr.co.iei.lodgment.model.dto.RoomSearchDTO;
import kr.co.iei.lodgment.model.dto.SearchLodgmentDTO;
import kr.co.iei.lodgment.model.service.LodgmentService;
import lombok.Getter;


@CrossOrigin("*")
@RestController
@RequestMapping(value="/lodgment")
@Tag(name="Lodgment" , description = "Lodgment API")
public class LodgmentController {

	@Autowired
	private LodgmentService lodgmentService;
	
	//서비스 태그 가져오기
	@GetMapping(value = "/service")
	public ResponseEntity<List> serviceList(){
		List list = lodgmentService.serviceList();
		return ResponseEntity.ok(list);
	}
	
	//검색창 : 여행지/호텔 관련 검색어 
	@GetMapping(value = "/search/{value}")
	public ResponseEntity<Map> search(@PathVariable String value){
		Map map = lodgmentService.search(value);
		return ResponseEntity.ok(map);
	}
	
	//검색 할 경우 원하는 숙박 정보 
	@GetMapping(value = "/searchLodgment")  //RequestParam 과 PathVariable 차이점 찾아보기 
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
			System.out.println(selectedServiceTagsArry[i]);
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
	
	@GetMapping(value = "/roomInfo/{lodgmentNo}/{startDate}/{endDate}")
	public ResponseEntity<Map> roomInfo(
			@PathVariable int lodgmentNo,
			@PathVariable String startDate,
			@PathVariable String endDate			
			){
		System.out.println(lodgmentNo);
		Map map = lodgmentService.getRoomInfo(lodgmentNo,startDate,endDate);
		return ResponseEntity.ok(map);
	}


}
