package kr.co.iei.board.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "boardAccompany")
public class BoardAccompanyDTO {
	private int accompanyNo;
	private String accompanyDate;        // 동행 스케줄 표
	private String accompanyArea;	     // 상세 지역
	private String accompanyContent;	 // 각각의 스케줄에 들어갈 설명
}
