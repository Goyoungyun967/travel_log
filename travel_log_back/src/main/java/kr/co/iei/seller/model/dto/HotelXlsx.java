package kr.co.iei.seller.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="hotelXlsx")
@Schema(description="기존 호텔 객체") // 엑셀에 저장되어 있던 호텔임 - 기존 호텔
public class HotelXlsx {
	@Schema(description = "호텔 번호",type="int")
	private int xLodgmentNo; // <- 시퀀스 lodgment_seq랑 같이 씀 insert 시 번호 중복 방지하기 위함
	@Schema(description = "호텔 이름",type="String")
	private String xLodgmentName;
	@Schema(description = "호텔 주소",type="String")
	private String xLodgmentAddr;
	@Schema(description = "호텔 등급",type="int")
	private int xLodgmentStarGrade;
}