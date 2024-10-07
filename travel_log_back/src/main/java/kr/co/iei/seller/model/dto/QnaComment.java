package kr.co.iei.seller.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="qnaComment")
@Schema(description="문의 답변")
public class QnaComment {
	@Schema(description = "답변 번호 ",type="int")
	private int key;
	@Schema(description = "문의 번호",type="int")
	private int roomQnaNo;
	@Schema(description = "답변 글",type="String")
	private String comContent;
}
