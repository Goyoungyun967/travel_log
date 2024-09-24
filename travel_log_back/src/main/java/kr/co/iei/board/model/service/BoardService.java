package kr.co.iei.board.model.service;

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
	public BoardFileDTO getBoardFile(int boardFileNo) {
		BoardFileDTO boardFile = boardDao.getBoardFile(boardFileNo); 
		
		return boardFile;
	}
}
