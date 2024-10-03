package kr.co.iei.lodgment.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "lodgmentReviewFile")
@Schema(description = "숙소 리뷰 사진 경로")
public class LodgmentReviewFileDTO {
	@Schema(description = "리뷰사진 번호",type="int")
	private int reviewFileNo;
	@Schema(description = "리뷰 번호",type="int")
	private int ReviewNo;
	@Schema(description = "리뷰 사진 경로",type="Stirng")
	private String reviewImgPath;
}
