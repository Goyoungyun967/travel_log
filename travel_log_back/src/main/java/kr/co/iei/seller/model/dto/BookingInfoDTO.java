package kr.co.iei.seller.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="bookingInfo")
@Schema(description="예약 객체")
public class BookingInfoDTO {
	@Schema(description = "예약번호",type="int")
	private int bookingNo;
	@Schema(description = "회원아이디",type="String")
	private String memberId;
	@Schema(description = "판매자번호",type="int")
	private int sellerNo;
	@Schema(description = "객실번호",type="int")
	private int roomNo;
	@Schema(description = "시작일",type="String")
	private String startDate;
	@Schema(description = "종료일",type="String")
	private String endDate;
	@Schema(description = "결제일",type="String")
	private String paymentDate;
	@Schema(description = "투숙객 인원수",type="int")
	private int guestCount;
	@Schema(description = "투숙객 이름",type="String")
	private String guestName;
	@Schema(description = "투숙객  전화번호",type="String")
	private String guestPhone;
	@Schema(description = "고객요청사항",type="String")
	private String guestRequest;
	@Schema(description = "예약현황",type="int")
	private int status;
	
	
	private String lodgmentName;	// 호텔 이름
	private String roomName;		// 객실 이름
}
