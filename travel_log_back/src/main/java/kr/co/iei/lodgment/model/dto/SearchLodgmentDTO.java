package kr.co.iei.lodgment.model.dto;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "searchLodgment")
@Schema(description="숙소 검색")
public class SearchLodgmentDTO {
	@Schema(description = "숙소 번호",type="int")
	private int lodgmentNo;
	@Schema(description = "숙소 이름",type="string")
	private String lodgmentName;
	@Schema(description = "주소",type="String")
	private String lodgmentAddr;
	@Schema(description = "성급",type="int")
	private int lodgmentStarGrade;
	@Schema(description = "숙소 타입 번호",type="int")
	private int lodgmentTypeNo;
	@Schema(description = "이미지 경로",type="String")
	private String lodgmentImgPath;
	@Schema(description = "공지사항",type="String")
	private String lodgmentNotice;
	@Schema(description = "체크인 시간",type="String")
	private String lodgmentCheckIn;
	@Schema(description = "체크아웃 시간",type="String")
	private String lodgmentCheckOut;
	@Schema(description = "최저 가격",type="int")
	private int roomPrice;
	@Schema(description = "총 별점 ",type="int")
	private int rating;
	
}
