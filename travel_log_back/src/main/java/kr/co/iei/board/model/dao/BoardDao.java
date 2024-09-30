package kr.co.iei.board.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.board.model.dto.BoardCommentDTO;
import kr.co.iei.board.model.dto.BoardDTO;
import kr.co.iei.board.model.dto.BoardFileDTO;


@Mapper
public interface BoardDao {

	int totalCount(int Type);

	List selectBoardList(Map<String, Object> m);

	int accompanyTotalCount(int type);

	List selectAccompanyList(Map<String, Object> m);

	int insertBoard(BoardDTO board);

	int insertBoardFile(BoardFileDTO boardFile);

	BoardDTO selectOneBoard(int boardNo);

	BoardFileDTO getBoardFile(int boardFileNo);

	List<BoardFileDTO> selectOneBoardFileList(int boardNo);

	int deleteBoard(int boardNo);

	int updateBoard(BoardDTO board);

	List<BoardFileDTO> selectBoardFile(int[] delBoardFileNo);

	int deleteBoardFile(int[] delBoardFileNo);

	int insertLikeBoard(int memberNo, int boardNo );

	int selectLikeBoard(int boardNo);

	int deleteUnlikeBoard(int memberNo, int boardNo );
	
	int selectUnlikeBoard(int boardNo);
	

//	List<BoardCommentDTO> selectCommentList(int boardNo);
//
//	int insertComment(BoardCommentDTO comment, String commentWriter);
//
//	int updateComment(int commentId, String newContent);
//
//	int deleteComment(int commentId);
	
//	<!-- 댓글 목록 조회 -->
//    <select id="selectCommentList" resultType="boardComment">
//        SELECT * FROM board_comment WHERE board_no = #{boardNo}
//    </select>
//
//    <!-- 댓글 추가 -->
//   <insert id="insertComment">
//    INSERT INTO board_comment VALUES (board_comment_seq.nextval, #{commentWriter}, #{commentDate}, #{commentRef}, #{commentContent}, #{boardNo})
//	</insert>
//
//    <!-- 댓글 수정 -->
//    <update id="updateComment">
//        UPDATE board_comment
//        SET content = #{newContent}
//        WHERE comment_id = #{commentId}
//    </update>
//
//    <!-- 댓글 삭제 -->
//    <delete id="deleteComment">
//        DELETE FROM board_comment WHERE comment_id = #{commentId}
//    </delete>
// 
	
	

}
