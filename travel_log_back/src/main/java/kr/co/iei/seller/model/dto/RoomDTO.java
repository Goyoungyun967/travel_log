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
@Alias(value="room")
@Schema(description="객실 정보")
public class RoomDTO {
	@Schema(description = "객실 번호",type="int")
	private int roomNo;
	@Schema(description = "숙소 번호",type="int")
	private int lodgmentNo;
	@Schema(description = "객실 이름",type="String")
	private String roomName;
	@Schema(description = "객실 인원",type="int")
	private int roomQua;
	@Schema(description = "객실 최대 인원",type="int")
	private int roomMaxCapacity;
	@Schema(description = "객실 1박 가격",type="int")
	private int roomPrice;
	@Schema(description = "객실 정보",type="String")
	private String roomInfo;
	@Schema(description = "객실 삭제 여부",type="int")
	private int roomDelete;
	
	@Schema(description = "객실 사진 리스트",type="List<RoomFileDTO>")
	private List<RoomFileDTO> fileList;
	
	@Schema(description = "객실 삭제 리스트",type="int[]")
	private int[] delRoomFileNo;
	
	@Schema(description = "객실 서비스 타입 리스트", type="List<RoomServiceTag>")
	private List<ServiceTagDTO> serviceTagList;
	
    private List<Integer> serviceTag; // 서비스태그(해시태그) 배열 형태
	
}
