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
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.seller.model.dao.SellerDao;
import kr.co.iei.seller.model.dto.SellerDTO;
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
	@Autowired
	private MemberDao memberDao;

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
		int totalCount = sellerDao.getTotalCount(sellerApp);
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		m.put("start", pi.getStart());
		m.put("end", pi.getEnd());
		m.put("sellerApp", sellerApp);
		List list = sellerDao.selectSellerList(m);
		map.put("pi", pi);
		map.put("list", list);
		return map;
	}

	@Transactional
	public int updateSellerApp(int[] sellerNo) {
		int result = sellerDao.updateSellerApp(sellerNo);
		return result;
	}

	public List getMemberEnrollData() {
		List list = memberDao.getMemberEnrollData();
		return list;
	}

	public List getMemberData() {
		List list = memberDao.getMemberData();
		return list;
	}

	public List getLodgmentResionData() {
		List list = inquiryDao.getLodgmentResionData();
		return list;
	}

	public List getLodgmentResionSearchMemberData(String region) {
		List list = inquiryDao.getLodgmentResionSearchMemberData(region);
		return list;
	}

	public List getLodgmentResionMemberData() {
		List list = inquiryDao.getLodgmentResionMemberData();
		return list;
	}


	public List getSellerList() {
		List list = inquiryDao.getSellerList();
		return list;
	}
	public List getSellerListSales(String type, String date) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("type", type);
		map.put("date", date);
		List list = inquiryDao.getSellerListSales(map);
		return list;
	}

	public List getSellerSales(int sellerNo) {
		List list = inquiryDao.getSellerSales(sellerNo);
		return list;
	}

	public List getSellerSalesGender(int sellerNo) {
		List list = inquiryDao.getSellerSalesGender(sellerNo);
		return list;
	}

	public List getSellerSalesAge(int sellerNo) {
		List list = inquiryDao.getSellerSalesAge(sellerNo);
		return list;
	}

	@Transactional
	public void insertSellerStm() {
		List<SellerDTO> list = inquiryDao.selectSellerSales();
		System.out.println(list);
		int result = 0;
		for (SellerDTO sellerDTO : list) {
			result = inquiryDao.insertSellerStm(sellerDTO);
		}
		System.out.println(result);
	}

	public Map getSellerStmList(int reqPage, int state) {
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> m = new HashMap<String, Object>();
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount = inquiryDao.getSellerStmCount(state);
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		m.put("start", pi.getStart());
		m.put("end", pi.getEnd());
		m.put("state", state);
		List list = inquiryDao.getSellerStmList(m);
		map.put("pi", pi);
		map.put("list", list);
		return map;
	}

	public int updateStm(int[] stmNum) {
		int result = inquiryDao.updateStm(stmNum);
		return result;
	}

	public Map getAdminLodgmentList(int reqPage,int lodgmentDelete) {
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> m = new HashMap<String, Object>();
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount = inquiryDao.getAdminLodgmentCount(lodgmentDelete);
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		m.put("start", pi.getStart());
		m.put("end", pi.getEnd());
		m.put("lodgmentDelete",lodgmentDelete);
		List list = inquiryDao.getAdminLodgmentList(m);
		map.put("pi", pi);
		map.put("list", list);
		return map;
	}

	@Transactional
	public int updateLodgmentDelete(int[] lodgmentNo) {
		int result = inquiryDao.updateLodgmentDelete(lodgmentNo);
		return result;
	}

	public Map getBoardReportList(int reqPage) {
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> m  = new HashMap<String, Object>();
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount = inquiryDao.getBoardReportCount();
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		m.put("start", pi.getStart());
		m.put("end", pi.getEnd());
		List list = inquiryDao.getBoardReportList(m);
		map.put("list", list);
		map.put("pi", pi);
		return map;
	}

}
