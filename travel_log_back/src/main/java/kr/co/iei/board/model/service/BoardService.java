package kr.co.iei.board.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.board.model.dao.BoardDao;
import kr.co.iei.board.model.dto.BoardDTO;
import kr.co.iei.board.model.dto.BoardFileDTO;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageUtil;


@Service
public class BoardService {
	@Autowired
	private BoardDao boardDao;
	@Autowired
	private PageUtil pageUtil;

	public Map selectBoardList(int reqPage, int type) {
		int numPerPage = 10;
		int pageNaviSize = 5;
		int boardCount = boardDao.totalCount(type);// 게시물 수
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, boardCount);
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("start", pi.getStart());
		m.put("end", pi.getEnd());
		m.put("type", type);
		List list = boardDao.selectBoardList(m);
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("list",list);
		map.put("pi", pi);
		return map;
	}

	public Map selectAccompanyList(int type, int reqPage) {
		int numPerPage = 10;
		int pageNaviSize = 5;
		int accompanyCount = boardDao.accompanyTotalCount(type);// 게시물 수
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, accompanyCount);
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("start", pi.getStart());
		m.put("end", pi.getEnd());
		m.put("type", type);
		List list = boardDao.selectAccompanyList(m);
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("list",list);
		map.put("pi", pi);
		return map;
	}
	//여행 게시판 등록
	@Transactional
	public int insertBoard(BoardDTO board, List<BoardFileDTO> boardFileList) {
		int result = boardDao.insertBoard(board);
		for(BoardFileDTO boardFile : boardFileList) {
			boardFile.setBoardNo(board.getBoardNo());
			result += boardDao.insertBoardFile(boardFile);
		}
		return result;
	}
	//상세게시판
	public BoardDTO selectOneBoard(int boardNo) {
		BoardDTO board = boardDao.selectOneBoard(boardNo);
		List<BoardFileDTO> fileList = boardDao.selectOneBoardFileList(boardNo);
		board.setFileList(fileList);
		return board;
	}
	//파일
	public BoardFileDTO getBoardFile(int boardFileNo) {
		BoardFileDTO boardFile = boardDao.getBoardFile(boardFileNo); 
		
		return boardFile;
	}
	//게시판삭제
	public List<BoardFileDTO> deleteBoard(int boardNo) {
		List<BoardFileDTO> fileList = boardDao.selectOneBoardFileList(boardNo);
		int result = boardDao.deleteBoard(boardNo);
		if(result>0) {
			return fileList;
		}
		return null;
	}
	@Transactional
	public List<BoardFileDTO> updateBoard(BoardDTO board, List<BoardFileDTO> boardFileList) {
		int result = boardDao.updateBoard(board);
		
		if(result>0) {
			List<BoardFileDTO> delFileList = new ArrayList<BoardFileDTO>();
			if(board.getDelBoardFileNo() != null) {
				delFileList = boardDao.selectBoardFile(board.getDelBoardFileNo());
				result += boardDao.deleteBoardFile(board.getDelBoardFileNo());
			}
			for(BoardFileDTO boardFile : boardFileList) {
				result += boardDao.insertBoardFile(boardFile);
			}
			int updateTotal = board.getDelBoardFileNo() == null 
									? 1+boardFileList.size() 
									: 1+ boardFileList.size() + board.getDelBoardFileNo().length;
			if(result == updateTotal) {
				return delFileList;
			}
		}
		return null;
	}
//	@Transactional
//	public int likeBoard(int boardNo, int memberNo) {
//		int result = boardDao.insertLikeBoard(boardNo,memberNo);
//		if(result>0) {
//			int likeCount = boardDao.selectLikeBoard(boardNo);
//			return likeCount;
//		}
//		return 0;
//	}
//	@Transactional
//	public int unlikeBoard(int boardNo, int memberNo) {
//		int result = boardDao.deleteUnlikeBoard(boardNo,memberNo);
//		if(result>0) {
//			int unLikeCount = boardDao.selectUnlikeBoard(boardNo);
//			return unLikeCount;
//		}
//		return 0;
//	}
}
