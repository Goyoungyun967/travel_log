package kr.co.iei.lodgment.model.service;

import java.util.List;

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
}
