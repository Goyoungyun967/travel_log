package kr.co.iei.inquiry.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="inquiry")
@Schema(description = "1대1문의 객체")
public class InquiryDTO {
	@Schema(description = "1대1 문의 번호",type = "int")
	private int inquiryNo;
	@Schema(description = "1대1 문의 제목",type = "String")
	private String inquiryTitle;
	@Schema(description = "1대1 문의 내용",type = "String")
	private String inquiryContent;
	@Schema(description = "1대1 문의한 판매자번호",type = "int")
	private int sellerNo;
	@Schema(description = "1대1 문의한 판매자이름",type = "String")
	private String representativeName;
	@Schema(description = "1대1 문의한 회원번호",type = "int")
	private int memberNo;
	@Schema(description = "1대1 문의한 회원아이디",type = "String")
	private String memberId;
	@Schema(description = "1대1 문의 작성일",type = "String")
	private String regDate;
	@Schema(description = "1대1 문의 작성일",type = "int")
	private int inquiryState;
	@Schema(description = "1대1 문의 파일리스트",type = "List")
	private List inquiryFileList;
	@Schema(description = "1대1 문의 답변",type = "InquiryReplyDTO")
	private InquiryReplyDTO inquiryReply;
}
