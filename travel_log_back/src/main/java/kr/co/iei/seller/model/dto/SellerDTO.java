package kr.co.iei.seller.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "seller")
public class SellerDTO {
	private int sellerNo;
	private String businessNo;
	private String representativeName;
	private String sellerPhone;
	private String bankName;
	private String accountNumber;
	private String enrollDate;
	private int sellerApp;
	private String sellerPw;
	private String businessName;
	
	

}
