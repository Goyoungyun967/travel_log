package kr.co.iei.faq.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import kr.co.iei.faq.model.service.FaqService;

@RestController
@CrossOrigin("*")
@RequestMapping(value="/faq")
@Tag(name = "FAQ", description = "FAQ API")
public class FaqController {
	@Autowired
	private FaqService faqService;
}
