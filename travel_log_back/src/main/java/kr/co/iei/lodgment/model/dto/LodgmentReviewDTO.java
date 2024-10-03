package kr.co.iei.lodgment.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "lodgmentReview")
@Schema(description = "숙소 리뷰")
public class LodgmentReviewDTO {
	@Schema(description = "리뷰 번호",type="int")
	private int reviewNo;
	@Schema(description = "회원 번호",type="int")
	private int memberNo;
	@Schema(description = "숙소 번호",type="int")
	private int lodgmentNo;
	@Schema(description = "리뷰 내용",type="String")
	private String reviewContent;
	@Schema(description = "숙소별점",type="int")
	private int rating;
}
