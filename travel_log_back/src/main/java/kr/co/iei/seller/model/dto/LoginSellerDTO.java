package kr.co.iei.seller.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class LoginSellerDTO {
	private String accessToken;
	private String refreshToken;
	private int sellerNo;
	private String businessName;
	private int sellerApp;
}
