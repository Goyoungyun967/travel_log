package kr.co.iei.board.model.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value = "board")
public class BoardDTO {
	private int boardNo;
	private String boardTitle;
	private String boardContent;
	private String boardArea;
	private String boardThumb;
	private int ReadCount; //조회 수
	private String regDate; //글쓴 날짜 
	private int boardType; // 1번 일반게시판 , 2번 동행 게시판
	private List<BoardFileDTO> fileList;
	private int[] delBoardFileNo;
	private int memberNo;
	//상세 페이지 dto
	private String memberImage;
	private String memberNickname;
	private int likeCount;
	private int keepCount;
	private int commentCount;
	
	
	
	

	
	
}
