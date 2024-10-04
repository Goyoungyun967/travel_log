package kr.co.iei.lodgment.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "reviewStatus")
@Schema(description = "리뷰 가능 여부")
public class ReviewStatus {
	@Schema(description = "리뷰 가능 여부",type="int")
	private int usedReviewsCount;
	@Schema(description = "숙소 예약 완료 된 여부",type="int")
	private int availableReviewsCount;
}
