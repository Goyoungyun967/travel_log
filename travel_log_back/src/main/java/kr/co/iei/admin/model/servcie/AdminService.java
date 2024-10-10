package kr.co.iei.admin.model.servcie;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.board.model.dao.BoardDao;
import kr.co.iei.faq.model.dao.FaqDao;
import kr.co.iei.faq.model.dto.FaqDTO;
import kr.co.iei.inquiry.model.dao.InquiryDao;
import kr.co.iei.lodgment.model.dao.LodgmentDao;
import kr.co.iei.lodgment.model.dto.LodgmentReviewReportDTO;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.seller.model.dao.SellerDao;
import kr.co.iei.seller.model.dao.SellerLodgmentDao;
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
	@Autowired
	private SellerLodgmentDao sellerLodgmentDao;
	@Autowired
	private LodgmentDao lodgmentDao;
	@Autowired
	private BoardDao boardDao;

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
		List list = memberDao.getLodgmentResionData();
		return list;
	}

	public List getLodgmentResionSearchMemberData(String region) {
		List list = memberDao.getLodgmentResionSearchMemberData(region);
		return list;
	}

	public List getLodgmentResionMemberData() {
		List list = memberDao.getLodgmentResionMemberData();
		return list;
	}


	public List getSellerList() {
		List list = sellerDao.getSellerList();
		return list;
	}
	public List getSellerListSales(String type, String date) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("type", type);
		map.put("date", date);
		List list = sellerDao.getSellerListSales(map);
		return list;
	}

	public List getSellerSales(int sellerNo) {
		List list = sellerDao.getSellerSales(sellerNo);
		return list;
	}

	public List getSellerSalesGender(int sellerNo) {
		List list = sellerDao.getSellerSalesGender(sellerNo);
		return list;
	}

	public List getSellerSalesAge(int sellerNo) {
		List list = sellerDao.getSellerSalesAge(sellerNo);
		return list;
	}

	@Transactional
	public void insertSellerStm() {
		List<SellerDTO> list = sellerDao.selectSellerSales();
		System.out.println(list);
		int result = 0;
		for (SellerDTO sellerDTO : list) {
			result += sellerDao.insertSellerStm(sellerDTO);
		}
		System.out.println(result);
	}

	public Map getSellerStmList(int reqPage, int state) {
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> m = new HashMap<String, Object>();
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount = sellerDao.getSellerStmCount(state);
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		m.put("start", pi.getStart());
		m.put("end", pi.getEnd());
		m.put("state", state);
		List list = sellerDao.getSellerStmList(m);
		map.put("pi", pi);
		map.put("list", list);
		return map;
	}

	public int updateStm(int[] stmNum) {
		int result = sellerDao.updateStm(stmNum);
		return result;
	}

	public Map getAdminLodgmentList(int reqPage,int lodgmentDelete) {
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> m = new HashMap<String, Object>();
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount = sellerLodgmentDao.getAdminLodgmentCount(lodgmentDelete);
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		m.put("start", pi.getStart());
		m.put("end", pi.getEnd());
		m.put("lodgmentDelete",lodgmentDelete);
		List list = sellerLodgmentDao.getAdminLodgmentList(m);
		map.put("pi", pi);
		map.put("list", list);
		return map;
	}

	@Transactional
	public int updateLodgmentDelete(int[] lodgmentNo) {
		int result = sellerLodgmentDao.updateLodgmentDelete(lodgmentNo);
		return result;
	}

	public Map getBoardReportList(int reqPage) {
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> m  = new HashMap<String, Object>();
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount = boardDao.getBoardReportListCount();
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		m.put("start", pi.getStart());
		m.put("end", pi.getEnd());
		List list = boardDao.getBoardReportList(m);
		map.put("list", list);
		map.put("pi", pi);
		return map;
	}

	public List getBoardReport(int boardNo) {
		List list = boardDao.getBoardReport(boardNo);
		return list;
	}

	@Transactional
	public int deleteBoardReport(int reportNo) {
		int result = boardDao.deleteBoardReport(reportNo);
		return result;
	}

	public Map getCommentReportList(int reqPage) {
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> m  = new HashMap<String, Object>();
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount = boardDao.getCommentReportListCount();
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		m.put("start", pi.getStart());
		m.put("end", pi.getEnd());
		List list = boardDao.getCommentReportList(m);
		map.put("list", list);
		map.put("pi", pi);
		return map;
	}

	public List getCommentReport(int commentNo) {
		List list = boardDao.getCommentReport(commentNo);
		return list;
	}

	@Transactional
	public int deleteCommentReport(int reportNo) {
		int result = boardDao.deleteCommentReport(reportNo);
		return result;
	}

	public Map getReviewReportList(int reqPage) {
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> m  = new HashMap<String, Object>();
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount = lodgmentDao.getReviewReportListCount();
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		m.put("start", pi.getStart());
		m.put("end", pi.getEnd());
		List<LodgmentReviewReportDTO> list = lodgmentDao.getReviewReportList(m);
		for (LodgmentReviewReportDTO lodgmentReviewReportDTO : list) {
			List fileList = lodgmentDao.getReviewFile(lodgmentReviewReportDTO.getReviewNo());
			lodgmentReviewReportDTO.setFileList(fileList);
		}
		map.put("list", list);
		map.put("pi", pi);
		return map;
	}
	@Transactional
	public int deleteReviewReport(int reviewNo) {
		int result = lodgmentDao.deleteReviewReport(reviewNo);
		return result;
	}

	public Map getAdminMemberList(int reqPage, int type) {
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> m  = new HashMap<String, Object>();
		int numPerPage = 20;
		int pageNaviSize = 5;
		int totalCount = memberDao.getAdminMemberListCount();
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		m.put("start", pi.getStart());
		m.put("end", pi.getEnd());
		m.put("type",type);
		List list = memberDao.getAdminMemberList(m);
		map.put("list", list);
		map.put("pi", pi);
		return map;
	}

	@Transactional
	public int updateMemberLevel(MemberDTO member) {
		int result = memberDao.updateMemberLevel(member);
		return result;
	}
	
	@Transactional
	public int insertMemberReport(MemberDTO member) {
		int result = memberDao.insertMemberReport(member);
		return result;
	}
}
