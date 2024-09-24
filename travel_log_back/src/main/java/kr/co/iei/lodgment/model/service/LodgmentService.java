package kr.co.iei.lodgment.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.lodgment.model.dao.LodgmentDao;
import kr.co.iei.lodgment.model.dto.LodgmentDTO;

@Service
public class LodgmentService {

	@Autowired
	private LodgmentDao lodgmentDao;

	public List serviceList() {
		List list = lodgmentDao.serviceList();
		return list;
	}

	public Map search(String value) {
		List list = lodgmentDao.search(value);
		List name = lodgmentDao.searchLodgment(value);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("name", name);
		return map;
	}

	public List<LodgmentDTO>  getLodgmentList(int reqPage, String lodgment, String startDate, String endDate, int guest) {
		 int limit = 10;
	     int offset = (reqPage - 1) * limit; // 페이지 계산
	     List<LodgmentDTO> list = lodgmentDao.getLodgmentList(offset, limit, lodgment, startDate, endDate, guest);
	     return list;
	}
}
