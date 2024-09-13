package kr.co.iei.faq.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.faq.model.dao.FaqDao;

@Service
public class FaqService {
	@Autowired
	private FaqDao faqDao;
}
