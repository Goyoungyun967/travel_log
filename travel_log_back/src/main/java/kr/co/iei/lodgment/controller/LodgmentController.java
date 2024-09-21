package kr.co.iei.lodgment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import io.swagger.v3.oas.annotations.tags.Tag;
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
}
