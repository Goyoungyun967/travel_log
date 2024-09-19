package kr.co.iei.board.model.dto;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Schema(description = "게시판 저장 객체")
public class BoardKeepDTO {
	private int memberNo;
	private int boardNo;

}
