package kr.co.iei.member.contorller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;

import kr.co.iei.member.model.service.MemberService;
import kr.co.iei.seller.model.dto.SellerDTO;
import kr.co.iei.util.EmailSender;
import kr.co.iei.util.FileUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/member")
@Tag(name="member",description = "MEMBER API")
public class MemberContorller {
	
	@Autowired
	private MemberService memberService;
	@Autowired
	private EmailSender emailSender;
	
	@Autowired
	private FileUtils fileUtil;
	
	@Value("${file.root}")
	public String root;
	
	@GetMapping(value="/memberId/{memberId}/check-id")
	public ResponseEntity<Integer> checkId(@PathVariable String memberId){
		int result = memberService.checkId(memberId);
		
		return ResponseEntity.ok(result);
	}
	
	@PostMapping
	public ResponseEntity<Integer> join(@RequestBody MemberDTO member){
		int result = memberService.insertMember(member);
		if(result > 0 ) {
			return ResponseEntity.ok(result);
		}else {
			return ResponseEntity.status(500).build();
		}
	}
	@GetMapping(value="/email")
	public String email() {
		return "etc/email";
	}
	@GetMapping(value="/oneMember/{memberNo}")
	public ResponseEntity<MemberDTO> selectOneUser(@PathVariable int memberNo){
		MemberDTO member = memberService.selectOneUser(memberNo);
		return ResponseEntity.ok(member);
	}
	
	@GetMapping(value="/sendEmail/{memberEmail}")
	public ResponseEntity<String> sendEamil(@PathVariable String memberEmail) {
		//인증메일 인증코드 생성
		Random r = new Random();
		StringBuffer sb = new StringBuffer();
		for(int i=0;i<6;i++) {
			//0 ~ 9 : r.nextInt(10); 
			//A ~ Z : r.nextInt(26) +65 ;
			//a ~ z : r.nextInt(26) +97 ;
			
			int flag = r.nextInt(3); //0,1,2 -> 숫자쓸지, 대문자쓸지, 소문자쓸지 결정
			if(flag == 0) {
				int randomCode = r.nextInt(10);
				sb.append(randomCode);
			}else if(flag == 1) {
				char randomCode = (char)(r.nextInt(26)+65);
				sb.append(randomCode);
			}else if(flag == 2 ) {
				char randomCode = (char)(r.nextInt(26)+97);
				sb.append(randomCode);
			}
		}
		String emailContent = "<h1>안녕하세요 .트레블로그입니다. </h1>"
							  +"<h3>인증번호는 [<span style='color:red;'>"
							  + sb.toString()
							  +"</span>]입니다.</h3>";
		
		try {
	        emailSender.sendMail("트레블로그 이메일 인증번호", memberEmail, emailContent);
	        System.out.println("Generated verification code: " + sb.toString());
	        return ResponseEntity.ok(sb.toString()); // 이메일 발송 성공
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("이메일 발송 실패: " + e.getMessage());
	    }
	}
	@PostMapping(value="/login")
	public ResponseEntity<LoginMemberDTO> login(@RequestBody MemberDTO member){
		LoginMemberDTO loginMember = memberService.login(member);
		if(loginMember != null) {
			return ResponseEntity.ok(loginMember);
		}else {
			return ResponseEntity.status(404).build();
		}
	}
	@PostMapping(value="/refresh")
	public ResponseEntity<LoginMemberDTO> refresh(@RequestHeader("Authorization") String token){
		LoginMemberDTO loginMember = memberService.refresh(token);
		if(loginMember != null) {
			return ResponseEntity.ok(loginMember);
		}else {
			return ResponseEntity.status(404).build();
		}
	}
	
	@GetMapping(value="/businessNo/{businessNo}/check-id")
	public ResponseEntity<Integer> checkSellerId(@PathVariable String businessNo){
		int result = memberService.checkSellerId(businessNo);
		
		return ResponseEntity.ok(result);
	}
	
	@PostMapping(value="/profile")
	public ResponseEntity<Boolean> updateProfile(@ModelAttribute MemberDTO member,
												 @ModelAttribute MultipartFile file){
		if(file != null) {
			String savepath = root+"/member/profile/";
			String filepath = fileUtil.upload(savepath, file);
			member.setMemberImage(filepath);
			boolean result = memberService.updateProfile(member);
			
			return ResponseEntity.ok(result);
		}
		return ResponseEntity.ok(false);
	}
	
	@PatchMapping
	public ResponseEntity<Integer> updateMember(@RequestBody MemberDTO member){
		int result = memberService.updateMember(member);
		return ResponseEntity.ok(result);
	}
	
	@PostMapping(value="pw")
	public ResponseEntity<Integer> checkPw(@RequestBody MemberDTO member){
		int result = memberService.checkPw(member);
		return ResponseEntity.ok(result);
	}
	
	@PatchMapping(value="pw")
	public ResponseEntity<Integer> changePw(@RequestBody MemberDTO member){
		int result = memberService.changePw(member);
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value="/booking/list/{memberNo}/{reqPage}")
	public ResponseEntity<Map> bookingList (@PathVariable int memberNo, @PathVariable int reqPage){
		
		Map map = memberService.selectBookingList(memberNo,reqPage);
		return ResponseEntity.ok(map);
	}
	
	@GetMapping(value="/board/list/{memberNo}/{reqPage}")
	public ResponseEntity<Map> myBoardList (@PathVariable int memberNo ,@PathVariable int reqPage){
		Map map = memberService.myBoardList(memberNo,reqPage);
		
		return ResponseEntity.ok(map);
	}
	@PatchMapping(value="/LevelUpdate/{memberNo}")
	public ResponseEntity<Integer> levelUpdate (@PathVariable int memberNo){
	int result = memberService.levelUpdate(memberNo);
	
	return ResponseEntity.ok(result);
	}
	
	@GetMapping(value="/myInq/list/{memberNo}/{reqPage}")
	public ResponseEntity<Map> myInqList (@PathVariable int memberNo, @PathVariable int reqPage){
		Map map = memberService.myInqList(memberNo, reqPage);
		
		return ResponseEntity.ok(map);
	} 
	
	
	@GetMapping(value="/sendIdEmail/{memberEmail}")
	public ResponseEntity<String> searchIdEmail(@PathVariable String memberEmail) {
		
		String userId = memberService.searchIdEmail(memberEmail);
		
		String emailContent = "<h1>안녕하세요 .트레블로그입니다. </h1>" 
			      +"<h3>"+memberEmail+" 로 등록된 "+"</h3>"
				  +"<h3>아이디는 [<span style='color:red;'>"
				  + userId
				  +"</span>]입니다.</h3>";
		 try {
		        emailSender.sendMail("아이디 찾기", memberEmail, emailContent);
		        return ResponseEntity.ok("아이디가 이메일로 전송되었습니다.");
		    } catch (Exception e) {
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
		                             .body("이메일 발송 중 문제가 발생했습니다: " + e.getMessage());
		    }
	}
	
	@PatchMapping(value="searchPw")
	public ResponseEntity<Integer> searchPw(@RequestBody MemberDTO member){
		System.out.println(member);
		int result = memberService.searchPw(member);
		return ResponseEntity.ok(result);
	}
	
}
	
	
	

