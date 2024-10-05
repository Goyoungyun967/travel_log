package kr.co.iei.board.model.dto;

import java.util.List;

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
	private int accompanyDate;        // 동행 스케줄 표
	private String accompanyArea;	     // 상세 지역
	private String accompanyContent;	 // 각각의 스케줄에 들어갈 설명
	private String startDay;
	private String endDay;
	//일반게시판
	private int boardNo;
	private String boardTitle;
	private String boardContent;
	private String boardArea;
	private String boardThumb;
	private int readCount; //조회 수
	private String regDate; //글쓴 날짜 
	private int boardType; // 1번 일반게시판 , 2번 동행 게시판
	//파일 삭제
	private List<BoardFileDTO> fileList;
	private int[] delBoardFileNo;
	private int memberNo;
	//상세 페이지 dto(member 관련)
	private String memberImage;
	private String memberNickname;
	private int memberAge;
	private String memberGender;
	
	private String accompanyType;
	private List<Integer> accompanyTagNo;
	private List<AccompanyTypeTag> accompanyTypeTags;
	private String accompanyTypes;
	private List<String> accompanyTypeList;
	
	
    
}
