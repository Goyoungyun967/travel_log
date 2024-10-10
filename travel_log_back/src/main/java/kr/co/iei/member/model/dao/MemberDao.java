package kr.co.iei.member.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.member.model.dto.MemberDTO;

@Mapper
public interface MemberDao {

	int checkId(String memberId);

	int insertMember(MemberDTO member);

	MemberDTO selectLoginMember(String memberId);

	MemberDTO selectOneMember(int memberNo);

	int checkSellerId(String businessNo);

	int updateProfile(MemberDTO member);

	String getMemberId(String memberNo);

	MemberDTO selectOneUser(int memberNo);

	int updateMember(MemberDTO member);

	int changePw(MemberDTO member);


	List getMemberEnrollData();
	
	List getMemberData();

	int levelUpdate(int memberNo);

	String searchIdEmail(String memberEmail);


	int searchPw(MemberDTO member);

	int getAdminMemberListCount();

	List getAdminMemberList(Map<String, Object> m);

	int insertMemberReport(MemberDTO member);

	int updateMemberLevel(MemberDTO member);

	int checkNickname(String memberNickname);


}
