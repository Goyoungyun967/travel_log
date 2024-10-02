package kr.co.iei.member.model.dao;

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
}
