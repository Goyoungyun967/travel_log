package kr.co.iei.lodgment.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "lodgmentMemberInquire")
@Schema(description="멤버 숙소 문의")
public class LodgmentMemberInquireDTO {
	@Schema(description = "문의 번호",type="int")
	private int roomQnaNo;
	@Schema(description = "숙소 번호",type="int")
	private int lodgmentNo;
	@Schema(description = "로그인 멤버 번호",type="int")
	private int memberNo;
	@Schema(description = "비밀글 여부",type="int")
	private int scQnaStatus;
	@Schema(description = "숙소 문의 내용",type="String")
	private String qnaContent;
	@Schema(description = "문의 날짜",type="String")
	private String qnaDate;
	@Schema(description = "댓글 단 멤버 아이디",type="String")
	private String memberId;
}
