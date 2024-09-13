package kr.co.iei.inquiry.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.inquiry.model.dao.InquiryDao;

@Service
public class InquiryService {
	@Autowired
	private InquiryDao inquiryDao;
}
