package kr.co.iei.board.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

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

	int insertLikeBoard(int boardNo, int memberNo);

	int selectLikeBoard(int boardNo);

	int deleteUnlikeBoard(int boardNo, int memberNo);
	
	int selectUnlikeBoard(int boardNo);

	
	

}
