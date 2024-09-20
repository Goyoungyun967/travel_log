package kr.co.iei.faq.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="faqType")
@Schema(description = "FAQ타입 객체")
public class FaqTypeDTO {
	@Schema(description = "FAQ타입",type = "string")
	private String faqType;
	@Schema(description = "FAQ타입 이름",type = "string")
	private String faqTypeName;
	@Schema(description = "FAQ타입 분류",type = "string")
	private String faqCategory;
}
