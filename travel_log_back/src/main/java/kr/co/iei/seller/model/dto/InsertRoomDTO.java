package kr.co.iei.seller.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="ir")
@Schema(description="객체")
public class InsertRoomDTO {
	private int roomNo; // 객실 번호
	private int lodgmentNo; // 숙소 번호
	private String roomName; // 객실 이름
	private int roomQua; // 객실 수
	private int maxCapacity; // 최대 인원
    private int roomPrice; // 객실 가격
    private String boardContent; // 객실 공지사항
    
    private List<String> serviceTag; // 서비스태그(해시태그) 배열 형태
    
    private MultipartFile[] roomFile; // 첨부파일 배열형태
}
