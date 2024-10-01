package kr.co.iei.booking.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "booking")
public class BookingDTO {
	private int bookNo;
	private String memberNo;
	private String memberId;
	private int sellerNo;
	private int roomNo;
	private String startDate;
	private String endDate;
	private String paymentDate;
	private int gusetCount;
	private String guestName;
	private String guestPhone;
	private String guestRequest;
	private int status;
	private String portoneimpuid;
}
