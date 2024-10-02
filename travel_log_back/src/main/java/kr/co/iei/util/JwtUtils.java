package kr.co.iei.util;

import java.util.Calendar;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.seller.model.dto.LoginSellerDTO;

@Component
public class JwtUtils {
	
	@Value("${jwt.secret-key}")
	public String secretKey;
	@Value("${jwt.expire-hour}")
	public int expireHour;
	@Value("${jwt.expire-hour-refresh}")
	public int expireHourRefresh;
	
	//1시간짜리 토큰생성
	public String createAccessToken(int memberNo, int memberLevel) {
		//1. 작성해둔 키값을 이용해서 암호화 코드 생성
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		//2. 토큰 생성시간 및 만료시간 설정 
		Calendar c = Calendar.getInstance();
		Date startTime = c.getTime();
		c.add(Calendar.HOUR, expireHour);
		//c.add(Calendar.SECOND,30);
		Date expireTime = c.getTime();
		
		String token = 	Jwts.builder()				//Jwt생성 시작
						.issuedAt(startTime)		//토큰 발생 시작시간	
						.expiration(expireTime)		//토큰만료 시간
						.signWith(key)				//암호화 서명
						.claim("memberNo",memberNo)	//토큰에 포함할 회원정보 세팅 (key=value)
						.claim("memberType", memberLevel)//토큰에 포함할 회원정보 세팅 (key=value)
					    .compact();					//생성
			return token;
	}
	
	//8760짜리(1년) accessToken
	public String createRefreshToken(int memberNo, int memberLevel) {
		//1. 작성해둔 키값을 이용해서 암호화 코드 생성
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		//2. 토큰 생성시간 및 만료시간 설정 
		Calendar c = Calendar.getInstance();
		Date startTime = c.getTime();
		c.add(Calendar.HOUR, expireHourRefresh);
		Date expireTime = c.getTime();
		
		String token = 	Jwts.builder()				//Jwt생성 시작
						.issuedAt(startTime)		//토큰 발생 시작시간	
						.expiration(expireTime)		//토큰만료 시간
						.signWith(key)				//암호화 서명
						.claim("memberNo",memberNo)	//토큰에 포함할 회원정보 세팅 (key=value)
						.claim("memberLevel", memberLevel)//토큰에 포함할 회원정보 세팅 (key=value)
					    .compact();					//생성
			return token;
	}
	
	//토큰을 받아서 확인
	public LoginMemberDTO checkToken(String token) {
		//1. 토큰 해석을 위한 암호화 키 세팅 
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		Claims claims = (Claims) Jwts.parser()				//토큰해석 시작
										.verifyWith(key)	//암호화키
										.build()	
										.parse(token)
										.getPayload();		
		int memberNo = (int)claims.get("memberNo");
		int memberLevel = (int)claims.get("memberLevel");
		LoginMemberDTO loginMember = new LoginMemberDTO();
		loginMember.setMemberNo(memberNo);
		loginMember.setMemberLevel(memberLevel);
		return loginMember;
	}	
	
	
	// 판매자 토큰
	public LoginSellerDTO sellerCheckToken(String token) {
		//1. 토큰 해석을 위한 암호화 키 세팅 
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		// 토큰 해석할 수 있는거 만들고, 매개변수로 받은 토큰 전달받아서 그의 값을 들고 옴
		Claims claims = (Claims) Jwts.parser()				//토큰해석 시작
										.verifyWith(key)	//암호화키
										.build()	
										.parse(token) 		// 매개변수로 받은 토큰 전달
										.getPayload();		// 매개변수로 받은 토큰 의 값 들고옴
		int sellerNo = (int)claims.get("sellerNo");
		
		// LoginMemberDTO에 member정보 넣어서 리턴하기
		LoginSellerDTO loginSeller = new LoginSellerDTO();
		loginSeller.setSellerNo(sellerNo);
		return loginSeller;
	}
}

