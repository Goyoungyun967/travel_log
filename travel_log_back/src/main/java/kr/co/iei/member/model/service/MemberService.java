package kr.co.iei.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.util.JwtUtils;

@Service
public class MemberService {
	
	@Autowired
	private MemberDao memberDao;
	
	@Autowired
	private JwtUtils jwtUtil;
	
	@Autowired
	private BCryptPasswordEncoder encoder;

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
}