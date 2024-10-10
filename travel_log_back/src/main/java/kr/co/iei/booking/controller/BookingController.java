package kr.co.iei.booking.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.iei.booking.model.dto.BookingCancelDTO;
import kr.co.iei.booking.model.dto.BookingDTO;
import kr.co.iei.booking.model.service.BookingService;

@RestController
@CrossOrigin("*")
@RequestMapping(value="/booking")
@Tag(name = "BOOKING", description = "BOOKING API")
public class BookingController {
	//수정이 필요한 부분, 방의 갯수가 동시 접속으로 인해 없을 경우도 있기에 로직 경우의 수 두고 수정 필요
	
	@Autowired
	private BookingService bookingService;
	
	@Operation(summary="숙소 예약", description = "숙소 결제 정보 저장")
	@PostMapping (value = "/comfirm") //requestBody 는 한개의 객체만 가능 여러개 사용 못함 
	public ResponseEntity<Integer> bookingComfirm(@RequestBody BookingDTO bookingInfo){
		//System.out.println(updatedBookingInfo);
		int result = bookingService.bookingComfirm(bookingInfo);
			return ResponseEntity.ok(result);			
	
	}
	
	@Operation(summary="숙소 예약", description = "숙소 결제 정보 저장")
	@PostMapping  //requestBody 는 한개의 객체만 가능 여러개 사용 못함 
	public ResponseEntity<Integer> insertBooking(@RequestBody BookingDTO updatedBookingInfo){
		//System.out.println(updatedBookingInfo);
		int bookNo = bookingService.insertBooking(updatedBookingInfo);
		if(bookNo != 0) {
			return ResponseEntity.ok(bookNo);			
		}
		return ResponseEntity.status(500).build();
	}
	
	@Operation(summary="예약 성공 페이지", description = "예약 성공 이후 보여주는 페이지 예약 번호로 조회")
	@GetMapping(value = "/{bookNo}")
	public ResponseEntity<BookingDTO> getBookingInfo(@PathVariable int bookNo){
		BookingDTO bookingInfo = bookingService.getBookingInfo(bookNo);
		return ResponseEntity.ok(bookingInfo);
	}
	
	@Operation(summary="숙소 예약 취소", description = "예약번호, 가격, 취소사유 (+기타사유)로 취소로 수정 ")
	@PatchMapping
	public ResponseEntity<Boolean> getPortoneimpuid(@RequestBody BookingCancelDTO cancelData){
		int result = bookingService.bookingCancelUpdate(cancelData);
		if(result == 2) {
			String portoneimpuid = bookingService.getPortoneimpuid(cancelData);
			String accessToken = "";
			try {
				 accessToken = bookingService.getAccessToken();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			try {
				bookingService.refundRequest(portoneimpuid, accessToken);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return ResponseEntity.ok(2 == result);			
	}
	
}
