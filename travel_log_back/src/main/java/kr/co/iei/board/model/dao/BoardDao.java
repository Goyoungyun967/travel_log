package kr.co.iei.board.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import kr.co.iei.board.model.dto.AccompanyTag;
import kr.co.iei.board.model.dto.AccompanyTypeTag;
import kr.co.iei.board.model.dto.BoardAccompanyDTO;
import kr.co.iei.board.model.dto.BoardCommentDTO;
import kr.co.iei.board.model.dto.BoardDTO;
import kr.co.iei.board.model.dto.BoardFileDTO;
import kr.co.iei.board.model.dto.BoardReportDTO;
import kr.co.iei.board.model.dto.CommentReportDTO;


@Mapper
public interface BoardDao {

	int totalCount(int Type);

	List selectBoardList(Map<String, Object> m);

	
	int insertBoard(BoardDTO board);

	int insertBoardFile(BoardFileDTO boardFile);

	BoardDTO selectOneBoard(int boardNo,int memberNo);

	BoardFileDTO getBoardFile(int boardFileNo);

	List<BoardFileDTO> selectOneBoardFileList(int boardNo);

	int deleteBoard(int boardNo);
	//수정
	int updateBoard(BoardDTO board);
	List<BoardFileDTO> selectBoardFile(int[] delBoardFileNo);
	int deleteBoardFile(int[] delBoardFileNo);
	//조하요
	int selectLikeBoard(int boardNo, int memberNo);
	
	int insertLikeBoard(int memberNo, int boardNo );

	int selectUnlikeBoard(int boardNo, int memberNo);

	int deleteUnlikeBoard(int memberNo, int boardNo );
// 댓글
	List<BoardCommentDTO> selectCommentList(int boardNo);

	int insertComment(BoardCommentDTO comment);

	int updateComment(int commentNo, String commentContent);

	int deleteComment(int commentNo);
	//좋아요 
	//입력
	int insertLikeComment(int memberNo, int commentNo);
	int selectLikeComment(int memberNo, int commentNo);

	//삭제 
	int deleteUnlikeComment(int memberNo, int commentNo);
	int selectUnlikeComment(int memberNo, int commentNo);
	
	//신고
	int insertReport(BoardReportDTO report);
	//댓글
	int insertCommentReport(CommentReportDTO commentReport);
	//동행게시판 리스트
	int accompanyTotalCount(int type);
	List<BoardAccompanyDTO> selectAccompanyList(Map<String, Object> m);

	//동행 게시판 등록
	int insertBoardAccompany(BoardAccompanyDTO boardAccompany);
	//동행 게시판 등록 동행일정 부분
	int insertAccompany(BoardAccompanyDTO boardAccompany);

	int insertAccompanyType(AccompanyTag at);
	//게시판 조회수 
	int updateReadCount(int boardNo);
	//게시판 상세
	BoardAccompanyDTO selectBoardAccompany(int boardNo);
//	List<AccompanyTypeTag> selectAccompanyTypeTags(int boardNo);
	List<BoardFileDTO> selectOneAccompanyList(int boardNo);
	
	
	//수정
	int updateBoardAccompany(BoardAccompanyDTO boardAccompany);
	int updateAccompany(BoardAccompanyDTO boardAccompany);
	int delTypeTag(BoardAccompanyDTO boardAccompany);


	
	

	//형묵 나의 게시판 총 갯수
	int myBoardTotalCount(int memberNo);
	
	//형묵 마이페이지 게시글띄우기
	List myBoardList(Map<String, Object> myBoardMap);

	



	




	
	
	
	
	
	
	
	
	
	
//	<!-- AccompanyTypeTag 리스트 조회 추가 
//	-->
//	<select id="selectAccompanyTypeTags" resultType="AccompanyTypeTag">
//	  SELECT 
//		    LISTAGG(att.accompany_type, ',') WITHIN GROUP (ORDER BY att.accompany_type) AS accompany_types
//		FROM 
//		    accompany_type_tag att
//		INNER JOIN 
//		    accompany_tag at ON att.accompany_tag_no = at.accompany_tag_no
//		WHERE 
//		    at.board_no = #{boardNo}
//	</select>
//
//
//	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
