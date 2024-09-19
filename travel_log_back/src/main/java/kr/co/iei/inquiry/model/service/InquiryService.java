package kr.co.iei.inquiry.model.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.inquiry.model.dao.InquiryDao;
import kr.co.iei.inquiry.model.dto.InquiryDTO;
import kr.co.iei.inquiry.model.dto.InquiryFileDTO;
import kr.co.iei.inquiry.model.dto.InquiryReplyDTO;

@Service
public class InquiryService {
	@Autowired
	private InquiryDao inquiryDao;

	@Transactional
	public int insertInquiry(InquiryDTO inquiry, List<InquiryFileDTO> fileList) {
		int result = inquiryDao.insertInquiry(inquiry);
		for (InquiryFileDTO inquiryFile : fileList) {
			inquiryFile.setInquiryNo(inquiry.getInquiryNo());
			result += inquiryDao.insertInquiryFile(inquiryFile);
		}
		return result;
	}

	@Transactional
	public List<InquiryFileDTO> deleteInquiry(int inquiryNo) {
		List<InquiryFileDTO> delFileList = inquiryDao.selectInquiryFileList(inquiryNo);
		int result = inquiryDao.deleteInquiry(inquiryNo);
		if(result > 0) {
			return delFileList;
		}else {
			return null;
		}
	}

	public InquiryDTO selectOneInquiry(int inquiryNo) {
		InquiryDTO inquiry = inquiryDao.selectOneInquiry(inquiryNo);
		if(inquiry != null) {
			List<InquiryFileDTO> fileList = inquiryDao.selectInquiryFileList(inquiryNo);
			InquiryReplyDTO inquiryReply = inquiryDao.selectInquiryReply(inquiryNo);
			inquiry.setInquiryFileList(fileList);
			inquiry.setInquiryReply(inquiryReply);
		}
		return inquiry;
	}

	
}
