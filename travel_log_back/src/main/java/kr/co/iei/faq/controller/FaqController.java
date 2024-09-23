package kr.co.iei.faq.controller;

import java.util.List;
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
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.iei.faq.model.dto.FaqDTO;
import kr.co.iei.faq.model.service.FaqService;

@RestController
@CrossOrigin("*")
@RequestMapping(value="/faq")
@Tag(name = "FAQ", description = "FAQ API")
public class FaqController {
	@Autowired
	private FaqService faqService;
	
	@GetMapping(value="/faqType")
	public ResponseEntity<Map> getFaqType(){
		Map map = faqService.selectFaqTypeList();
		return ResponseEntity.ok(map);
	}
	
	@GetMapping(value="/faqList/{faqType}")
	@Operation(summary = "faq리스트 조회",description = "타입을 받아서 faq리스트 조회")
	public ResponseEntity<List> getFaqList(@PathVariable String faqType){
		List list = faqService.selectFaqList(faqType);
		return ResponseEntity.ok(list);
	}
	
	@GetMapping(value="/{faqNo}")
	@Operation(summary = "faq 조회",description = "faq번호를 받아서 faq내용 조회")
	public ResponseEntity<FaqDTO> getFaq(@PathVariable int faqNo){
		FaqDTO faq = faqService.selectFaq(faqNo);
		return ResponseEntity.ok(faq);
	}
}
