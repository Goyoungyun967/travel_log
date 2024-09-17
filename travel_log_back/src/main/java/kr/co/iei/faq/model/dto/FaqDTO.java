package kr.co.iei.faq.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="faq")
@Schema(description = "FAQ 객체")
public class FaqDTO {
	@Schema(description = "FAQ 번호", type = "int")
	private int faqNo;
	@Schema(description = "FAQ 타입", type = "String")
	private String faqType;
	@Schema(description = "FAQ 제목", type = "String")
	private String faqTitle;
	@Schema(description = "FAQ 내용", type = "String")
	private String faqContent;
}
