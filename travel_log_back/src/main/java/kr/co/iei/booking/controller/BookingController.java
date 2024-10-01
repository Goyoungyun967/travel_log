package kr.co.iei.booking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.iei.booking.model.dto.BookingDTO;
import kr.co.iei.booking.model.service.BookingService;

@RestController
@CrossOrigin("*")
@RequestMapping(value="/booking")
@Tag(name = "BOOKING", description = "BOOKING API")
public class BookingController {

	@Autowired
	private BookingService bookingService;
	
	@PostMapping  //requestBody 는 한개의 객체만 가능 여러개 사용 못함 
	public ResponseEntity<String> insertBooking(@RequestBody BookingDTO bookingInfo){
		System.out.println(bookingInfo);
		return ResponseEntity.ok("안녕");
	}
}
