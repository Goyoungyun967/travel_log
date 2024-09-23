package kr.co.iei.board.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.board.model.dao.BoardDao;
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
			List list = boardDao.selectBoardList(pi,type);
			Map<String, Object> map = new HashMap<String,Object>();
			map.put("list",list);
			map.put("pi", pi);
			return map;
	}
}
