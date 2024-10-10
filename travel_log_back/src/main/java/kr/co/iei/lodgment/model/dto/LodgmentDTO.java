package kr.co.iei.lodgment.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "lodgmentDetail")
@Schema(description="숙소")
public class LodgmentDTO {
	@Schema(description = "숙소 번호",type="int")
	private int lodgmentNo;
	@Schema(description = "판매자 번호",type="int")
	private int sellerNo;
	@Schema(description = "숙소 타입 번호",type="int")
	private int lodgmentTypeNo;
	@Schema(description = "숙박업체명",type="String")
	private String lodgmentName;
	@Schema(description = "주소",type="String")
	private String lodgmentAddr;
	@Schema(description = "이미지 경로",type="String")
	private String lodgmentImgPath;
	@Schema(description = "성급",type="int")
	private int lodgmentStarGrade;
	@Schema(description = "공지사항",type="String")
	private String lodgmentNotice;
	@Schema(description = "체크인 시간",type="String")
	private String lodgmentCheckIn;
	@Schema(description = "체크아웃 시간",type="String")
	private String lodgmentCheckOut;
	@Schema(description = "서비스태그",type="String")
	private String serviceTagNo;
	@Schema(description = "태그번호",type="int")
	private String serviceTagType;
	@Schema(description = "룸정보",type="RoomSearchDTO")
	private List<RoomSearchDTO> RoomSearchList;	
	@Schema(description = "평균점수",type="RoomSearchDTO")
	private int avgRating;	
}
