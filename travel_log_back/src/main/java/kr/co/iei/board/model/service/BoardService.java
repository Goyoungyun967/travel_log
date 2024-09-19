package kr.co.iei.board.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.board.model.dao.BoardDao;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.pageUtil;

@Service
public class BoardService {
	@Autowired
	private BoardDao boardDao;
	@Autowired
	private pageUtil pageUtil;

	public Map selectBoardList(int reqPage, int boardType) {
		int numPerPage = 10;
		int pageNaviSize = 5;
			int boardCount = boardDao.totalCount(boardType);// 게시물 수
			PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, boardCount);
			List list = boardDao.selectBoardList(pi);
			
			
		
		return null;
	}
}
