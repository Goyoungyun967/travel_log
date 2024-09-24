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
import kr.co.iei.lodgment.model.dto.SearchLodgmentDTO;
import kr.co.iei.lodgment.model.service.LodgmentService;


@CrossOrigin("*")
@RestController
@RequestMapping(value="/lodgment")
@Tag(name="Lodgment" , description = "Lodgment API")
public class LodgmentController {

	@Autowired
	private LodgmentService lodgmentService;
	
	@GetMapping(value = "/service")
	public ResponseEntity<List> serviceList(){
		List list = lodgmentService.serviceList();
		return ResponseEntity.ok(list);
	}
	
	@GetMapping(value = "/search/{value}")
	public ResponseEntity<Map> search(@PathVariable String value){
		Map map = lodgmentService.search(value);
		return ResponseEntity.ok(map);
	}
	@GetMapping(value = "/searchLodgment")
	public ResponseEntity<List<SearchLodgmentDTO>> searchLodgment(
			@RequestParam int reqPage,
            @RequestParam String lodgment,
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam int guest,
            @RequestParam(required = false) int minPrice,
            @RequestParam(required = false) int maxPrice,
            @RequestParam(required = false) List<String> selectedServiceTags,
            @RequestParam(required = false) int starValue,
            @RequestParam(required = false) String order){
		System.out.println(reqPage);
		System.out.println(lodgment);
		System.out.println(startDate);
		System.out.println(endDate);
		System.out.println(minPrice);
		System.out.println(maxPrice);
		System.out.println(selectedServiceTags);
		System.out.println(starValue);
		System.out.println(order);
		List<SearchLodgmentDTO> list = lodgmentService.getLodgmentList(reqPage,lodgment,startDate,endDate,guest);
		return ResponseEntity.ok(list);
	}
	

}
