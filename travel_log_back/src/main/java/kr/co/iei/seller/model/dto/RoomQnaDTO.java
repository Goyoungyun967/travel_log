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
@Alias(value="roomQna")
@Schema(description="숙소 문의 객체")
public class RoomQnaDTO {
	@Schema(description = "숙소 문의 번호",type="int")
	private int roomQnaNo;
	@Schema(description = "숙소 번호",type="int")
	private int lodgmentNo;
	@Schema(description = "회원 번호",type="int")
	private int memberNo;
	@Schema(description = "문의 상태",type="int")
	private int scQnaStatus; // 0: 비공, 1: 공개
	@Schema(description = "문의 글",type="String")
	private String qnaContent;
	@Schema(description = "문의 작성 날짜",type="String")
	private String qnaDate;
	
	@Schema(description = "답변 리스트",type="List<QnaComment>")
	private List<QnaComment> commentList;

}
