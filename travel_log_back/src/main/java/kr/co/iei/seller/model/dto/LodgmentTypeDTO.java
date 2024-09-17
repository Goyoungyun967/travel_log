package kr.co.iei.seller.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="lodgmentType")
@Schema(description="숙소 타입 객체")
public class LodgmentTypeDTO {
	@Schema(description = "숙소 타입 번호",type="int")
	private int lodgmentTpyeNo;
	@Schema(description = "숙소 타입 이름",type="String")
	private String lodgmentTypeName;
}
