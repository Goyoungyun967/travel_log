package kr.co.iei.board.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="commentReportList")
public class CommentReportListDTO {
	@Schema(description = "댓글 번호",type = "int")
	private int commentNo;
	@Schema(description = "욕설 신고 횟수",type = "int")
	private int abuseCount;
	@Schema(description = "불편함 신고 횟수",type = "int")
	private int uncomfortableCount;
	@Schema(description = "광고성 신고 횟수",type = "int")
	private int adCount;
	@Schema(description = "기타 신고 횟수",type = "int")
	private int etcCount;
	@Schema(description = "누적 신고 합계",type = "int")
	private int totalCount;
	@Schema(description = "댓글 내용",type = "String")
	private String commentContent;
	@Schema(description = "댓글 작성자 닉네임",type = "String")
	private String memberNickname;
	@Schema(description = "게시글 번호", type="int")
	private int boardNo;
	@Schema(description = "게시글 유형",type = "int")
	private int boardType;
}
