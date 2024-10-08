package kr.co.iei.board.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="boardReportList")
public class BoardReportListDTO {
	@Schema(description = "게시글 번호",type = "int")
	private int boardNo;
	@Schema(description = "욕설 신고 횟수",type = "int")
	private int abuseCount;
	@Schema(description = "불편함 신고 횟수",type = "int")
	private int uncomfortableCount;
	@Schema(description = "광고성 신고 횟수",type = "int")
	private int adCount;
	@Schema(description = "기타 신고 횟수",type = "int")
	private int etcCount;
	@Schema(description = "게시글 제목",type = "String")
	private String boardTitle;
	@Schema(description = "게시글 작성자 닉네임",type = "String")
	private String memberNickname;
	@Schema(description = "신고 번호",type = "int")
	private int reportNo;
}
