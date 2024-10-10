
package kr.co.iei.booking.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "booking")
@Schema(description = "예약")
public class BookingDTO {
	@Schema(description = "예약 번호", type = "int")
	private int bookNo;
	@Schema(description = "예약한 회원 번호", type = "int")
	private String memberNo;
	@Schema(description = "예약 회원 아이디", type = "String")
	private String memberId;
	@Schema(description = "판매자 번호", type = "int")
	private int sellerNo;
	@Schema(description = "판매 방 번호", type = "int")
	private int roomNo;
	@Schema(description = "체크인 날짜", type = "String")
	private String startDate;
	@Schema(description = "체크아웃 날짜", type = "String")
	private String endDate;
	@Schema(description = "결제날짜/시간", type = "String")
	private String paymentDate;
	@Schema(description = "예약 인원", type = "int")
	private int guestCount;
	@Schema(description = "투수객 이름", type = "String")
	private String guestName;
	@Schema(description = "투수객 핸드폰번호", type = "String")
	private String guestPhone;
	@Schema(description = "투수객 요청사항", type = "String")
	private String guestRequest;
	@Schema(description = "이용현황", type = "int")
	private int status;
	@Schema(description = "포트원 환불 번호", type = "String")
	private String portoneimpuid;
	@Schema(description = "방 삭제 여부", type = "int")
	private int roomDelete;
	@Schema(description = "판매 방 이름", type="string")
	private String roomName;
	@Schema(description = "호텔 작성자", type="string")

	private String businessName;
	@Schema(description = "호텔 주소", type="string")
	private String lodgmentAddr;
	@Schema(description = "호텔 이름", type="string")
	private String lodgmentName;
	@Schema(description = "결제 가격", type="int")
	private int roomPrice;
	@Schema(description = "호텔 이미지", type="string")
	private String lodgmentImg;
	@Schema(description = "리뷰 여부", type="int")
	private int reviewCount;
	@Schema(description = "호텔 번호", type="int")
	private int lodgmentNo;
}

