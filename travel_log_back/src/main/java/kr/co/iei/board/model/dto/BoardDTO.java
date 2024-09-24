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
@Schema(description = "게시판 객체")
public class BoardDTO {
	@Schema(description = "게시판 번호", type = "int")
	private int boardNo;
	@Schema(description = "게시판 제목", type = "String")
	private String boardTitle;
	@Schema(description = "게시판 내용", type = "String")
	private String boardContent;
	@Schema(description = "게시판 큰 범위 지역", type = "String")
	private String boardArea;
	@Schema(description = "게시판 썸내일", type = "String")
	private String boardThumb;
	@Schema(description = "게시판 조회수", type = "int")
	private int ReadCount; //조회 수
	@Schema(description = "게시판 입력 날짜", type = "String")
	private String regDate; //글쓴 날짜 
	@Schema(description = "게시판 타입", type = "int")
	private int boardType; // 1번 일반게시판 , 2번 동행 게시판
	private List<BoardFileDTO> fileList;
	
	//상세 페이지 dto
	private String memberImage;
	private String memberNickName;
	private int likeCount;
	private int keepCount;
	private int commentCount;

	
	
}
