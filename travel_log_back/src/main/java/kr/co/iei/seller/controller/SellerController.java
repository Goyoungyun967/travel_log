package kr.co.iei.seller.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.iei.seller.model.service.SellerService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/seller")
@Tag(name="Seller" , description = "Seller API")
public class SellerController {
	@Autowired
	private SellerService sellerService;
	
	@GetMapping(value="/list/{sellerNo}")
	public ResponseEntity<List> lodgmentList(@PathVariable int sellerNo){
		List list = sellerService.selectLodgmentList(sellerNo);
		return ResponseEntity.ok(list);
	}
	
}
