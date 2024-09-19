package kr.co.iei.seller.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.seller.model.service.SellerService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/seller")
@Tag(name="Seller" , description = "Seller API")
public class SellerController {
	@Autowired
	private SellerService sellerService;
	
	// 등록한 호텔 조회 (메인)
	
	@GetMapping(value="/list/{sellerNo}")
	public ResponseEntity<List> lodgmentList(@PathVariable int sellerNo){
		List list = sellerService.selectLodgmentList(sellerNo);
		return ResponseEntity.ok(list);
	}
	
	// 기존 호텔 조회 <= 집 코드랑 합치기
	
	// 판매자 정보 조회
	// public ResponseEntity<판매자DTO> selectOneSeller(@RequestHeader("Authorization") String token){ => 토큰 사용해서 조회
	@GetMapping
	public ResponseEntity<MemberDTO> selectOneSeller(@RequestBody int sellerNo){
		MemberDTO member = sellerService.selectOneSeller(sellerNo);
		return ResponseEntity.ok(member); // 판매자 DTO가 없으므로 일단 멤버로 대체
	}
	
	
}
