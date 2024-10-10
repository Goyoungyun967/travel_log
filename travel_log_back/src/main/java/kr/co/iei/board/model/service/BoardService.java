package kr.co.iei.board.model.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.board.model.dao.BoardDao;
import kr.co.iei.board.model.dto.AccompanyTag;
import kr.co.iei.board.model.dto.AccompanyTypeTag;
import kr.co.iei.board.model.dto.BoardAccompanyDTO;
import kr.co.iei.board.model.dto.BoardCommentDTO;
import kr.co.iei.board.model.dto.BoardDTO;
import kr.co.iei.board.model.dto.BoardFileDTO;
import kr.co.iei.board.model.dto.BoardReportDTO;
import kr.co.iei.board.model.dto.CommentReportDTO;
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
	//수정
	@Transactional
	public List<BoardFileDTO> updateBoard(BoardDTO board, List<BoardFileDTO> boardFileList) {
		int result = boardDao.updateBoard(board);
		System.out.println(1);
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
//	좋아요 
	@Transactional
	public int likeBoard(int boardNo, int memberNo) {
		int isLike = boardDao.selectLikeBoard(boardNo,memberNo);
		if(isLike == 0) {
			int result =  boardDao.insertLikeBoard(memberNo,boardNo);
			if(result>0) {
				return isLike;
			}else {
				return 0;
			}
		}
			return 0;
	}
//	좋아요 삭제
	@Transactional
	public int unlikeBoard(int boardNo, int memberNo) {
		int isLike = boardDao.selectLikeBoard(boardNo,memberNo);
		if(isLike ==1){
			int result = boardDao.deleteUnlikeBoard(memberNo,boardNo);
			if(result>0) {
				return isLike;
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
	@Transactional
	public boolean addComment(BoardCommentDTO comment) {
	    int result = boardDao.insertComment(comment);
	    return result > 0; // 성공 여부 반환
	}

	
	// 댓글 수정
	@Transactional
	public boolean editComment(int commentId, String commentContent) {
	    int result = boardDao.updateComment(commentId, commentContent);
	    return result == 1; // 성공 여부 반환
	}

	// 댓글 삭제
	@Transactional
	public boolean deleteComment(int commentNo) {
	    int result = boardDao.deleteComment(commentNo);
	    return result == 1; // 성공 여부 반환
	}
	//댓글 좋아요 
	public int likeComment(int memberNo,int commentNo) {
		int likeCount = boardDao.selectLikeComment(memberNo,commentNo);
		if(likeCount ==0) {
			int result = boardDao.insertLikeComment(memberNo,commentNo);
			if(result>0) {
				return likeCount;
			}else {
				return 0;
			}
			
		}
		return 0;
	}
	//삭제
	public int unlikeComment(int memberNo,int commentNo) {
		int unLikeCount = boardDao.selectUnlikeComment(memberNo,commentNo);
		
		if(unLikeCount == 1) {
			int result = boardDao.deleteUnlikeComment(memberNo,commentNo);
			if(result>0) {
				return unLikeCount;
			
			}else {
				return 0;
			}
		}
		return 0;
	}
// 게시판 신고
	@Transactional
		public int insertReport(BoardReportDTO report) {
			int result = boardDao.insertReport(report);
			if(result>0) {
				return result;
			}
			return 0;
		}
	//댓글 신고
	@Transactional
	public int insertReport(CommentReportDTO commentReport) {
		int result = boardDao.insertCommentReport(commentReport);
		if(result>0) {
			return result;
		}
		return 0;
	}
	
	
	//동행게시판 
	public Map<String, Object> selectAccompanyList(int type, int reqPage) {
	    int numPerPage = 10;
	    int pageNaviSize = 5;
	    int accompanyCount = boardDao.accompanyTotalCount(type); // 게시물 수
	    PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, accompanyCount);
	    
	    Map<String, Object> m = new HashMap<>();
	    m.put("start", pi.getStart());
	    m.put("end", pi.getEnd());
	    m.put("type", type);
	    
	    List<BoardAccompanyDTO> list = boardDao.selectAccompanyList(m);
	    Map<String, Object> map = new HashMap<>();
	    map.put("list", list);
	    map.put("pi", pi);
	    
	    return map;
	}


//	등록
	@Transactional
	public int insertAcoompanyBoard(BoardAccompanyDTO boardAccompany, List<BoardFileDTO> boardFileList) {
	    int result = boardDao.insertBoardAccompany(boardAccompany);

	    if (result > 0) {
	        // 파일 삽입
	        for (BoardFileDTO boardFile : boardFileList) {
	            boardFile.setBoardNo(boardAccompany.getBoardNo());
	            result += boardDao.insertBoardFile(boardFile);
	        }

	        // 동행 태그 삽입
	        for (int accompanyTagNo : boardAccompany.getAccompanyTagNo()) {
	            AccompanyTag at = new AccompanyTag();
	            at.setBoardNo(boardAccompany.getBoardNo());
	            at.setAccompanyTagNo(accompanyTagNo);
	            result += boardDao.insertAccompanyType(at);
	        }

	        // 동행 일정 삽입
	        result += boardDao.insertAccompany(boardAccompany);
	    }

	    return result; // 초기 삽입 실패 시 0 반환
	}


	//동행 게시판 조회수
	@Transactional
	public int updateReadCount(int boardNo) {
		int result = boardDao.updateReadCount(boardNo);
		if(result>0) {
			return result;
		}
		return 0;
	}

	//동행 상세
	public BoardAccompanyDTO selectOneBoardAccompany(int boardNo) {
		BoardAccompanyDTO accompany = boardDao.selectBoardAccompany(boardNo);
//		List<AccompanyTypeTag> accompanyTypeTags = boardDao.selectAccompanyTypeTags(boardNo);
		List<BoardFileDTO> fileList = boardDao.selectOneAccompanyList(boardNo);
		accompany.setFileList(fileList);
		
		return accompany;
	}

//	동행수정
	@Transactional
	public List<BoardFileDTO> updateBoardAccompany(BoardAccompanyDTO boardAccompany, List<BoardFileDTO> boardFileList) {
					System.out.println(boardAccompany);
					int result = boardDao.updateBoardAccompany(boardAccompany);
					System.out.println(boardAccompany);
					if(result>0) {
						List<BoardFileDTO> delFileList = new ArrayList<BoardFileDTO>();
						if(boardAccompany.getDelBoardFileNo() != null) {
							delFileList = boardDao.selectBoardFile(boardAccompany.getDelBoardFileNo());
							System.out.println(2);
							result += boardDao.deleteBoardFile(boardAccompany.getDelBoardFileNo());
							System.out.println(3);
						}
						for(BoardFileDTO boardFile : boardFileList) {
							result += boardDao.insertBoardFile(boardFile);
						}
						int updateTotal = boardAccompany.getDelBoardFileNo() == null 
								? 1+boardFileList.size() 
								: 1+ boardFileList.size() + boardAccompany.getDelBoardFileNo().length;
								if(result == updateTotal) {
									return delFileList;
								}
								
					}
					if(result>0) {
						result = boardDao.updateAccompany(boardAccompany);
						if(result>0) {
							result = boardDao.delTypeTag(boardAccompany);
							if(result>0) {
								 for (int accompanyTagNo : boardAccompany.getAccompanyTagNo()) {
							            AccompanyTag at = new AccompanyTag();
							            at.setBoardNo(boardAccompany.getBoardNo());
							            at.setAccompanyTagNo(accompanyTagNo);
							            result += boardDao.insertAccompanyType(at);
							        }
							}
						}
					}
		
		return null;
	}



	
}

