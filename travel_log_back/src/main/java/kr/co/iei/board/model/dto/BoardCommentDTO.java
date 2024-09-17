package kr.co.iei.board.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "boardComment")
public class BoardCommentDTO {
	private int commnetNo;
	private String commentWriter;
	private String commentContent;
	private int commentRef; // 대댓 숫자
	private String commnetDate;
}
