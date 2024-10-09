package kr.co.iei.lodgment.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="lodgmentReviewReport")
public class LodgmentReviewReportDTO {
	@Schema(description = "리뷰 번호",type = "int")
	private int reviewNo;
	@Schema(description = "욕설 신고 횟수",type = "int")
	private int abuseCount;
	@Schema(description = "불편함 신고 횟수",type = "int")
	private int uncomfortableCount;
	@Schema(description = "광고성 신고 횟수",type = "int")
	private int adCount;
	@Schema(description = "기타 신고 횟수",type = "int")
	private int etcCount;
	@Schema(description = "누적 신고 합계",type = "int")
	private int totalCount;
	@Schema(description = "리뷰 내용",type = "String")
	private String reviewContent;
	@Schema(description = "리뷰 작성자 닉네임",type = "String")
	private String memberNickname;
	@Schema(description = "숙소 번호",type = "int")
	private int lodgmentNo;
	@Schema(description = "별점",type = "int")
	private int rating;
	@Schema(description = "리뷰 파일 리스트",type = "list")
	private List fileList;
}
