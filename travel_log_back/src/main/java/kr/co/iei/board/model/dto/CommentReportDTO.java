package kr.co.iei.board.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "commentReport")
public class CommentReportDTO {
	private int commentReportNo;
	private int commmentReportType;
	private String commentReportContent;
	private int memberNo;
	private int commentNo;
	private int boardNo;
	private String commentContent;
	private String memberNickname;
	private String commentWriter;
}
