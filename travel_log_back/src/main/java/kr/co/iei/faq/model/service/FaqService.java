package kr.co.iei.faq.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.faq.model.dao.FaqDao;
import kr.co.iei.faq.model.dto.FaqDTO;

@Service
public class FaqService {
	@Autowired
	private FaqDao faqDao;

	public List selectFaqList(String faqType) {
		List list = faqDao.selectFaqList(faqType);
		return list;
	}

	public FaqDTO selectFaq(int faqNo) {
		FaqDTO faq = faqDao.selectFaq(faqNo);
		return faq;
	}

	@Transactional
	public int insertFaq(FaqDTO faq) {
		int result = faqDao.insertFaq(faq);
		return result;
	}

	@Transactional
	public int updateFaq(FaqDTO faq) {
		int result = faqDao.updateFaq(faq);
		return result;
	}
	
	@Transactional
	public int deleteFaq(int faqNo) {
		int result = faqDao.deleteFaq(faqNo);
		return result;
	}

	public Map selectFaqTypeList() {
		Map<String, Object> map = new HashMap<String, Object>();
		String[] category = faqDao.selectFaqCategory();
		List list = faqDao.selectFaqTypeList();
		map.put("category", category);
		map.put("list", list);
		
		return map;
	}
}
