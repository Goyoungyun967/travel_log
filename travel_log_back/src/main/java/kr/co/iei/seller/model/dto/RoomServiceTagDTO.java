package kr.co.iei.seller.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="roomServiceTag")
@Schema(description="서비스 태그 객체")
public class RoomServiceTagDTO {
	@Schema(description = "숙소 번호",type="int")
	private int roomNo;
	@Schema(description = "서비스 태그 번호",type="int")
	private int serviceTagNo;
	@Schema(description = "서비스 태그 타입",type="String")
	private String serviceTagType;
}
