package kr.co.iei.seller.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="lodgmentStorage")
@Schema(description="숙소 객체")
public class LodgmentStorageDTO {
	@Schema(description = "숙소 번호",type="int")
	private int lodgmentNo;
	@Schema(description = "판매자 번호",type="int")
	private int sellerNo;
	@Schema(description = "숙소 타입 번호",type="int")
	private int lodgmentTypeNo;
	@Schema(description = "숙소 이름",type="String")
	private String lodgmentName;
	@Schema(description = "숙소 이름",type="String")
	private String lodgmentAddr;
	@Schema(description = "숙소 이미지 경로",type="String")
	private String lodgmentImgPath;
	@Schema(description = "숙소 성급",type="int")
	private int lodgmentStarGrade;
	@Schema(description = "숙소 공지사항",type="String")
	private String lodgmentNotice;
	@Schema(description = "숙소 체크인",type="String")
	private String lodgmentCheckIn;
	@Schema(description = "숙소 체크아웃",type="String")
	private String lodgmentCheckOut;
	@Schema(description = "숙소 삭제 여부",type="Number")
	private int lodgmentDelte;
}