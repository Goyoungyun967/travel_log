package kr.co.iei.faq.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="faq")
public class FaqDTO {
	private int faq_no;
	private String faqType;
	private String faqTitle;
	private String faqContent;
}
