package kr.co.iei.board.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "boardComment")
@Schema(description = "게시판 댓글 객체")
public class BoardCommentDTO {
	@Schema(description = "댓글 번호", type = "int")
	private int commnetNo;
	@Schema(description = "댓글 작성자", type = "String")
	private String commentWriter;
	@Schema(description = "댓글 내용", type = "String")
	private String commentContent;
	@Schema(description = "댓글 대댓", type = "int")
	private int commentRef; // 대댓 숫자
	@Schema(description = "댓글 작성일", type = "String")
	private String commnetDate;
}
