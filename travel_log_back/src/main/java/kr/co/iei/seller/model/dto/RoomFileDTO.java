package kr.co.iei.seller.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="roomFile")
@Schema(description="객실 이미지 객체")
public class RoomFileDTO {
	@Schema(description = "객실 사진 번호",type="int")
	private int roomFileNo;
	@Schema(description = "객실 번호",type="int")
	private int roomNo;
	@Schema(description = "객실 사진",type="String")
	private String roomImg;
}
