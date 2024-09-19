package kr.co.iei.inquiry.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="inquiryReply")
@Schema(description = "1대1문의 답변 객체")
public class InquiryReplyDTO {
	@Schema(description = "1대1 문의 답변 번호",type = "int")
	private int inquiryReplyNo;
	@Schema(description = "1대1 문의 번호",type = "int")
	private int inquiryNo;
	@Schema(description = "1대1 문의 답변 내용",type = "String")
	private String inquiryReplyContent;
	@Schema(description = "1대1 문의 답변 작성일",type = "String")
	private String regDate;
}
