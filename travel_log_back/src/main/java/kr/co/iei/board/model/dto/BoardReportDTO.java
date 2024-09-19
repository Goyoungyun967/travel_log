package kr.co.iei.board.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "boardReport")
@Schema(description = "게시판 신고 객체")
public class BoardReportDTO {
	private int reportNo;
	private int reportType;
	private String reportContent;
	
}
