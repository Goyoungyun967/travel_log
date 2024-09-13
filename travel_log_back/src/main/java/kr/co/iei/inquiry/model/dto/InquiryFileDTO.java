package kr.co.iei.inquiry.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="inquiryFile")
@Schema(description = "1대1문의 파일 객체")
public class InquiryFileDTO {
	@Schema(description = "파일 번호",type = "int")
	private int fileNo;
	@Schema(description = "1대1문의 번호",type = "int")
	private int inquiryNo;
	@Schema(description = "파일 이름",type = "String")
	private String fileName;
	@Schema(description = "파일 경로",type = "String")
	private String filepath;
}
