package kr.co.iei.etc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.iei.util.EmailSender;

@Controller
@RequestMapping(value="/api")
public class EmailController {
	@Autowired
	private EmailSender emailSender;
	
	@GetMapping(value="/email")
	public String email() {
		return "etc/email";
	}
	
	@GetMapping(value="/sendEmail/{memberEmail}")
	public String sendEamil(@PathVariable String memberEmail) {
		System.out.println(memberEmail);
		return "";
	}
	
}
