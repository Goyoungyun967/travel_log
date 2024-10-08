package kr.co.iei.board.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "accompanyTag")
public class AccompanyTag {
	private int accompanyTagNo;
	private int boardNo;
	

}
