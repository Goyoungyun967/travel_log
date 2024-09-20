package kr.co.iei.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;

@Service
public class MemberService {
	
	@Autowired
	private MemberDao memberDao;

	public int checkId(String memberId) {
		int result = memberDao.checkId(memberId);
		return result;
	}

	public int insertMember(MemberDTO member) {
		
		return 0;
	}
}
