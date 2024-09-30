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
	private int businessNo;
	private int businessName;
}
