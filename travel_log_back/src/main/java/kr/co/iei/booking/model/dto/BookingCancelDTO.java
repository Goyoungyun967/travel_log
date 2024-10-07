package kr.co.iei.booking.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "bookingCancle")
@Schema(description = "예약취소 ")
public class BookingCancelDTO {
	@Schema(description = "예약 번호", type = "int")
	private int bookNo;
	@Schema(description = "포트원 환불 번호", type = "String")
	private String portoneimpuid;
	@Schema(description = "결제 가격", type="int")
	private int roomPrice;
	@Schema(description = "취소 사유 선택 번호 ", type = "int")
	private int cancelReason;
	@Schema(description = "기타 사유 이유", type = "String")
	private String cancelReasonText;
}


