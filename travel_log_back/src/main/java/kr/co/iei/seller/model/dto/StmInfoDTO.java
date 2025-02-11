package kr.co.iei.seller.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="stmInfo")
@Schema(description="정산 객체")
public class StmInfoDTO {
	@Schema(description = "정산 완료 번호",type="int")
	private int stmNum;
	@Schema(description = "판매자 번호",type="int")
	private int sellerNo;
	@Schema(description = "정산 금액",type="int")
	private String stmPrice;
	@Schema(description = "정산 날짜",type="String")
	private String stmDate;
	@Schema(description = "정산 상태",type="int")
	private int stmState;
	@Schema(description = "사업자이름", type="String")
	private String businessName;
	
	
	// --- 검색 시
	private String startDate; // 시작 날짜
	private String endDate; // 끝 날짜
}
