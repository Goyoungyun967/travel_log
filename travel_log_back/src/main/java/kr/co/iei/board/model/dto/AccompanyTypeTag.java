package kr.co.iei.board.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "accompanyTypeTag")
public class AccompanyTypeTag {
	private int accompanyTagNo;
	private String accompanyType;
	

}
//INSERT INTO accompany_type_tag
//VALUES (1, '부분 동행');
//
//INSERT INTO accompany_type_tag 
//VALUES (2, '숙박 공유');
//
//INSERT INTO accompany_type_tag 
//VALUES (3, '전체 동행');
//
//INSERT INTO accompany_type_tag 
//VALUES (4, '투어 동행');
//
//INSERT INTO accompany_type_tag 
//VALUES (5, '식사 동행');
//
//INSERT INTO accompany_type_tag 
//VALUES (6, '공동 구매');




