package kr.co.iei.member.model.dto;

import org.apache.ibatis.type.Alias;
import org.springframework.context.annotation.Description;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "member")
public class MemberDTO {
	private int memberNo;
	private String memberId;
	private String memberPw;
	private int memberAge;
	private String memberGender;
	private String memberPhone;
	private String memberAddr;
	private String memberEmail;
	private String enrollDate;
	private int memberLevel;
	private String memberNickname;
	private String memberImage;
	private int memberState;
	private int reportCount;
}
