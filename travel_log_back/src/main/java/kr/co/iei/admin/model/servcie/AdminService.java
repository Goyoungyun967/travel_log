package kr.co.iei.admin.model.servcie;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.faq.model.dao.FaqDao;
import kr.co.iei.faq.model.dto.FaqDTO;
import kr.co.iei.inquiry.model.dao.InquiryDao;
import kr.co.iei.seller.model.dao.SellerDao;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageUtil;


@Service
public class AdminService {
	@Autowired
	private InquiryDao inquiryDao;
	@Autowired
	private FaqDao faqDao;
	@Autowired
	private PageUtil pageUtil;
	@Autowired
	private SellerDao sellerDao;

	public Map selectInquiryList(int reqPage, String type,int state) {
		Map<String,Object> map = new HashMap<String, Object>();
		Map<String,Object> m = new HashMap<String, Object>();
		m.put("type", type);
		m.put("state", state);
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount = inquiryDao.getTotalCount(m);
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		m.put("start", pi.getStart());
		m.put("end", pi.getEnd());
		List list = inquiryDao.selectInquiryList(m);
		map.put("pi", pi);
		map.put("list",list);
		return map;
	}

	public FaqDTO selectAdminFaq(int faqNo) {
		FaqDTO faq = faqDao.selectAdminFaq(faqNo);
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

	public Map selectSellerList(int reqPage, int sellerApp) {
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> m = new HashMap<String, Object>();
		int numPerPage = 10;
		int pageNaviSize = 5;
		//int totalCount = sellerDao.getTotalCount(sellerApp);
		int totalCount = 20;
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		m.put("start", pi.getStart());
		m.put("end", pi.getEnd());
		m.put("sellerApp", sellerApp);
		//List list = sellerDao.selectSellerList(m);
		map.put("pi", pi);
		return map;
	}

	@Transactional
	public int updateSellerApp(int[] sellerNo) {
		//int result = sellerDao.updateSellerApp(sellerNo);
		return 0;
	}

}
