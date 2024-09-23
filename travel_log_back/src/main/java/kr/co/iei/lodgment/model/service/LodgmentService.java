package kr.co.iei.lodgment.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.lodgment.model.dao.LodgmentDao;

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
}
