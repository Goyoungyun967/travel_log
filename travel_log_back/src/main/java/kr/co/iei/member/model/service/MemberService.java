package kr.co.iei.member.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.board.model.dao.BoardDao;
import kr.co.iei.booking.model.dao.BookingDao;
import kr.co.iei.faq.model.dao.FaqDao;
import kr.co.iei.inquiry.model.dao.InquiryDao;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.util.JwtUtils;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageUtil;

@Service
public class MemberService {
	
	@Autowired
	private MemberDao memberDao;
	
	@Autowired
	private BookingDao bookingDao;
	
	@Autowired
	private BoardDao boardDao;
	
	@Autowired
	private InquiryDao inquiryDao;
	
	@Autowired
	private JwtUtils jwtUtil;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	@Autowired
	private PageUtil pageUtil;

	public int checkId(String memberId) {
		int result = memberDao.checkId(memberId);
		return result;
	}
	
	@Transactional
	public int insertMember(MemberDTO member) {
		String encPw = encoder.encode(member.getMemberPw());
		member.setMemberPw(encPw);
		int result = memberDao.insertMember(member);
		return result;
	}

	public LoginMemberDTO login(MemberDTO member) {
		MemberDTO m =memberDao.selectLoginMember(member.getMemberId());
		if(m!=null && encoder.matches(member.getMemberPw(),m.getMemberPw())) {
			String accessToken = jwtUtil.createAccessToken(m.getMemberNo(),m.getMemberLevel());
			String refreshToken = jwtUtil.createRefreshToken(m.getMemberNo(), m.getMemberLevel());
			LoginMemberDTO loginMember = new LoginMemberDTO(accessToken, refreshToken, m.getMemberNo(),m.getMemberLevel(),m.getMemberNickname());
			return loginMember;
		}
		return null;
	}

	public LoginMemberDTO refresh(String token) {
		try {
			LoginMemberDTO loginMember = jwtUtil.checkToken(token);
			String accessToken
			= jwtUtil.createAccessToken(loginMember.getMemberNo(), loginMember.getMemberLevel());
			String refreshToken
			= jwtUtil.createRefreshToken(loginMember.getMemberNo(), loginMember.getMemberLevel());
			loginMember.setAccessToken(accessToken);
			loginMember.setRefreshToken(refreshToken);
			MemberDTO m = memberDao.selectOneMember(loginMember.getMemberNo());
			loginMember.setMemberNickname(m.getMemberNickname());
			return loginMember;
		}catch(Exception e) {
			
	}
	return null;
}

	public int checkSellerId(String businessNo) {
		int result = memberDao.checkSellerId(businessNo);
		return result;
	}
	
	@Transactional
	public boolean updateProfile(MemberDTO member) {
		int result = memberDao.updateProfile(member);
		
		return result == 1;
	}
	
	public MemberDTO selectOneUser(int memberNo) {
		MemberDTO member = memberDao.selectOneUser(memberNo);
		return member;
	}
	
	@Transactional
	public int updateMember(MemberDTO member) {
		int result = memberDao.updateMember(member);
		return result;
	}
	
	public int checkPw(MemberDTO member) {
		MemberDTO m =memberDao.selectOneMember(member.getMemberNo());
		if(m!=null && encoder.matches(member.getMemberPw(),m.getMemberPw())) {
			return 1;
		}
		return 0;
	}
	@Transactional
	public int changePw(MemberDTO member) {
		String encPw = encoder.encode(member.getMemberPw());
		member.setMemberPw(encPw);
		int result = memberDao.changePw(member);
		return result;
	}

	public Map selectBookingList(int memberNo, int reqPage) {
		int numPerPage = 8;		//한 페이지당 게시물 수
		int pageNaviSize = 5;		//페이지네비 길이 
		int totalCount = bookingDao.myBookingTotalCount(memberNo);
		
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		Map<String, Object> bookingMap = new HashMap<String, Object>();
		bookingMap.put("memberNo", memberNo);
		bookingMap.put("start", pi.getStart());
		bookingMap.put("end", pi.getEnd());
		List list = bookingDao.selectBookingList(bookingMap);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list",list);
		map.put("pi", pi);
		
		return map;
		
	}


	public Map myBoardList(int memberNo, int reqPage) {
		int numPerPage = 8;		//한 페이지당 게시물 수
		int pageNaviSize = 5;		//페이지네비 길이 
		int totalCount = boardDao.myBoardTotalCount(memberNo);
		System.out.println(reqPage);
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		System.out.println(pi);
		Map<String, Object> myBoardMap = new HashMap<String, Object>();
		myBoardMap.put("memberNo", memberNo);
		myBoardMap.put("start", pi.getStart());
		myBoardMap.put("end", pi.getEnd());
		List list = boardDao.myBoardList(myBoardMap);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list",list);
		map.put("pi", pi);
		
		return map;
	}
	
	@Transactional
	public int levelUpdate(int memberNo) {
		int result = memberDao.levelUpdate(memberNo);
		return result;
	}

	public Map myInqList(int memberNo, int reqPage) {
		int numPerPage = 8;		//한 페이지당 게시물 수
		int pageNaviSize = 5;		//페이지네비 길이 
		int totalCount = inquiryDao.myInqTotalCout(memberNo);
		
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		
		Map<String, Object> myInqMap = new HashMap<String, Object>();
		myInqMap.put("memberNo", memberNo);
		myInqMap.put("start", pi.getStart());
		myInqMap.put("end", pi.getEnd());
		List list = inquiryDao.myInqList(myInqMap);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list",list);
		map.put("pi", pi);
		
		return map;
	}

	public String searchIdEmail(String memberEmail) {
		String userId = memberDao.searchIdEmail(memberEmail);
		return userId;
	}
	
	@Transactional
	public int searchPw(MemberDTO member) {
		String encPw = encoder.encode(member.getMemberPw());
		System.out.println(encPw);
		member.setMemberPw(encPw);
		int result = memberDao.searchPw(member);
		return result;
	}

	public int checkNickname(String memberNickname) {
		int result = memberDao.checkNickname(memberNickname);
		return result;
	}
}