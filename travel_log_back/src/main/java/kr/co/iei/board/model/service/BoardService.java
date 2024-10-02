package kr.co.iei.board.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import kr.co.iei.board.model.dao.BoardDao;
import kr.co.iei.board.model.dto.AccompanyTag;
import kr.co.iei.board.model.dto.BoardAccompanyDTO;
import kr.co.iei.board.model.dto.BoardCommentDTO;
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
	@Transactional
	public int likeBoard(int boardNo, int memberNo) {
		int likeCount = boardDao.selectLikeBoard(boardNo,memberNo);
		if(likeCount==0) {
			int result = boardDao.insertLikeBoard(memberNo,boardNo);
			if(result>0) {
				return likeCount;
			}else {
				return 0;
			}
			
		}
		return 0;
	}
	@Transactional
	public int unlikeBoard(int boardNo, int memberNo) {
		int unLikeCount = boardDao.selectUnlikeBoard(boardNo,memberNo);
		
		if(unLikeCount == 1) {
			int result = boardDao.deleteUnlikeBoard(memberNo,boardNo);
			if(result>0) {
				return unLikeCount;
			
			}else {
				return 0;
			}
		}
		return 0;
	}
	
	// 댓글 목록 조회
	public List<BoardCommentDTO> getCommentList(int boardNo ) {
	    List<BoardCommentDTO> comments = boardDao.selectCommentList(boardNo);
	    return comments; // 댓글 목록 반환
	}

	// 댓글 추가
	public boolean addComment(int boardNo, String memberNickname, BoardCommentDTO comment) {
	    int result = boardDao.insertComment( boardNo,memberNickname,comment);
	    return result > 0; // 성공 여부 반환
	}

	
//	// 댓글 수정
//	public boolean editComment(int commentId, String newContent) {
//	    int result = boardDao.updateComment(commentId, newContent);
//	    return result == 1; // 성공 여부 반환
//	}
//
//	// 댓글 삭제
//	public boolean deleteComment(int commentId) {
//	    int result = boardDao.deleteComment(commentId);
//	    return result == 1; // 성공 여부 반환
//	}
	
	//동행게시판 
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
	@Transactional
	public int insertAcoompanyBoard(BoardAccompanyDTO boardAccompany, List<BoardFileDTO> boardFileList) {
	    int result = boardDao.insertBoardAccompany(boardAccompany);
	    	if(result>0) {
	    		for(BoardFileDTO boardFile : boardFileList) {
	    			boardFile.setBoardNo(boardAccompany.getBoardNo());
	    			System.out.println(1);
	    			result += boardDao.insertBoardFile(boardFile);
	    		}
	    		for(int AccompanyTagNo : boardAccompany.getAccompanyTagNo()) {
	    			AccompanyTag at = new AccompanyTag();
	    			at.setBoardNo(boardAccompany.getBoardNo());
	    			at.setAccompanyTagNo(AccompanyTagNo);
	    			result += boardDao.insertAccompanyType(boardAccompany);
	    			System.out.println(2);
	    		}
	    		for(int i=0; i<boardAccompany.getAccompanyDate();i++) {
	    			BoardAccompanyDTO bad = new BoardAccompanyDTO();
	    			System.out.println(3);
	    			result += boardDao.insertAccompany(boardAccompany);
	    			
	    		}
	    		

	    	}
	    
	    	
	    return result; // 초기 삽입 실패 시 0 반환
	}
}

