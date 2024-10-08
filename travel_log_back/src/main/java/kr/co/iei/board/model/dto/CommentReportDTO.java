package kr.co.iei.board.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import kr.co.iei.lodgment.model.dto.LodgmentReviewReportDTO;
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
	private String memberNickname;
}
